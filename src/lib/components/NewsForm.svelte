<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	import { uploadImage } from '$lib/services/fileService';
	import type { News } from '$lib/types/News';

	import { Input, Textarea, Button } from 'flowbite-svelte';
	
	import { authStore } from '$lib/stores/AuthStore';
	import { EditMode, resetEditMode } from '$lib/stores/FormStore';
	
	import SlugText from './SlugText.svelte';
	import MarkdownHelp from './MarkdownHelp.svelte';
	import UploadPDF from '$lib/components/UploadPDF.svelte';
	import UploadImage from '$lib/components/UploadImage.svelte';
    import Label from './Label.svelte';

	const author = $authStore.name;
	let defaultItem = {
		title: '',
		author: author,
		text: '',
		slug: '',
		publishdate: '',
		publishtime: '',
		image: '',
		imageAlt: '',
		imageCaption: '',
		tags: '',
		pdfFile: '',
	};

	export let thisItem: News = defaultItem;
	const dispatch = createEventDispatcher();

	let newItem = defaultItem;
	let docRef;
	let selectedImage: File;

	const hasImage = writable(false);

	if ($EditMode === 'update') {
		newItem = thisItem;
	}

	const cleanUpForm = () => {
		newItem = {
			title: '',
			author: '',
			text: '',
			slug: '',
			publishdate: '',
			publishtime: '',
			image: '',
			imageAlt: '',
			imageCaption: '',
			tags: '',
			pdfFile: '',
		};
	};

	$: hasImage.set(!!newItem.image);

	const handleSlugChange = (e: CustomEvent) => {
		newItem.slug = e.detail;
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		if (!newItem.publishdate) {
			const now = new Date();
			newItem.publishdate = now.toISOString().split('T')[0];
			newItem.publishtime = now.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			});
		}
		!newItem.publishtime && (newItem.publishtime = '09:00');
		newItem.image = await uploadImage(selectedImage);
		dispatch($EditMode, newItem);
		newItem = defaultItem;
		resetEditMode();
		goto('/admin/newsadmin');
	};

	const handleReset = () => {
		cleanUpForm();
		resetEditMode();
		goto('/admin/newsadmin');
	};

	const handleImageChange = (e: CustomEvent) => {
		selectedImage = e.detail;
		hasImage.set(!!e.detail);
	};

	const assignPDF = (e: CustomEvent) => {
		newItem.pdfFile = e.detail.url;
	};
</script>

<div class="form bg-white-primary">
	<h1 class="">{$EditMode === 'update' ? 'Edit news item' : 'Create news item'}</h1>

	<form
		id="form-container"
		enctype="multipart/form-data"
		on:submit={handleSubmit}
		on:reset={handleReset}
	>
		<!-- Titel -->
		<div>
			<Label child="title">News Headline *</Label>
			<Input type="text" id="title" placeholder="News Title" bind:value={newItem.title} required />
		</div>

		<!-- Author -->
		<div>
			<Label child="author" disabled=true>Author</Label>
			<Input type="text" id="author" bind:value={newItem.author} disabled />
		</div>

		<!-- News text -->
		<div>
			<div class="flex flex-row justify-between">
				<Label child="news-text">News text *</Label
				>
				<p class="explanation self-end text-right">
					<strong>{newItem.text.length}</strong> characters.
				</p>
			</div>
			<Textarea
				id="news-text"
				placeholder="News text"
				rows="8"
				name="news-text"
				bind:value={newItem.text}
				wrap="hard"
			/>
		</div>

		<MarkdownHelp text={newItem.text} />
		<SlugText text={newItem.text} slugText={newItem.slug} on:slugChange={handleSlugChange} />

		<!-- Publish date  -->
		<div>
			<Label child="publishdate">Publish Date *</Label>
			<Input 
			type="date" 
			id="publishdate" 
			bind:value={newItem.publishdate} />
			<p class="explanation">If you don't select a publish date, it will be set to today.</p>
		</div>

		<!-- Publish time  -->
		<div>
			<Label child="publishtime" disabled={!newItem.publishdate}>Publish Time</Label>
			<Input
				type="time"
				id="publishtime"
				disabled={!newItem.publishdate}
				bind:value={newItem.publishtime}
			/>
			<p class="explanation">
				If you don't select a publish time, it will be set to 09:00 of the selected day.
			</p>
		</div>

		<!-- Image -->
		<div>
			<Label disabled=true>Image</Label>
			<div class="flex flex-col items-center justify-center">
				{#if newItem.image}
					<UploadImage imageUrl={newItem.image} on:imageChange={handleImageChange} />
				{:else}
					<UploadImage imageUrl="" on:imageChange={handleImageChange} />
				{/if}
			</div>
		</div>
		<div class="imageMeta">
			<div class="imageAlt">
				<div>
					<Label disabled=true>Image Alt text *</Label>
					<Input
						type="text"
						id="imageAlt"
						bind:value={newItem.imageAlt}
						required={$hasImage}
						disabled={!$hasImage}
						placeholder={$hasImage ? 'Image Alt text' : 'Please select an image first'}
					/>
					<p class="explanation {!$hasImage ? 'opacity-30' : 'opacity-100'}">
						This text helps interpreting the image for visually impaired users.
					</p>
				</div>
			</div>
			<div class="imageCaption mt-10">
				<div>
					<Label disabled=true>Image caption</Label>
					<Input
						type="text"
						id="imageCaption"
						bind:value={newItem.imageCaption}
						placeholder={$hasImage ? 'Image by ...' : 'Please select an image first'}
						disabled={!$hasImage}
					/>
					<p class="explanation {!$hasImage ? 'opacity-30' : 'opacity-100'}">
						This text will be displayed below the image.
					</p>
				</div>
			</div>
		</div>

		<!-- PDF Upload -->
		<div>
			<Label disabled=true>PDF Document</Label>
			<div class="flex flex-col items-center justify-center">
				<UploadPDF fileUrl={newItem.pdfFile} on:upload={assignPDF} />
				<p class="explanation">
					Upload a PDF document that will be attached to this news item (max 5MB).
				</p>
			</div>
		</div>

		<!-- Buttons -->
		<div class="buttons col-span-2 mb-20 mt-10">
			<Button class="font-semibold" type="reset" color="light">Cancel</Button>
			<Button class="bg-black-40 text-white-primary" type="reset" color="light" disabled={docRef}
				>Empty form</Button
			>
			<Button
				class="bg-primary-100  font-semibold text-white-primary"
				type="submit"
				disabled={newItem.length === 0}>{$EditMode === 'update' ? 'Update' : 'Save'} news</Button
			>
		</div>
	</form>
</div>

<div>&NonBreakingSpace;</div>

<style>
	.form {
		margin: 40px auto;
		padding: 20px 20px;
		max-width: 90%;
		border: 1px solid #eaeaea;
		border-radius: 20px;
	}

	.explanation {
		margin: 10px 4px;
		font-size: 0.8rem;
	}

	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 50px;
		padding: 0 50px;
		justify-content: space-between;
		width: 100%;
		padding: 0 50px;
	}
</style>
