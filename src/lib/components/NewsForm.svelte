<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	import { uploadImage } from '$lib/services/fileService';
	import type { News } from '$lib/stores/ObjectStore';
	import { initialNews } from '$lib/stores/ObjectStore';

	import { Input, Textarea, Button } from 'flowbite-svelte';

	import { authStore } from '$lib/stores/AuthStore';
	import { EditModeStore, EditMode } from '$lib/stores/ObjectStore';

	import SlugText from './SlugText.svelte';
	import UploadPDF from '$lib/components/UploadPDF.svelte';
	import UploadImage from './UploadImage.svelte';
	import Label from './Label.svelte';
	import Editor from './Editor.svelte';

	const author = $authStore.name;

	export let thisItem: News = initialNews;
	const dispatch = createEventDispatcher<{
		new: News;
		update: News;
	}>();

	let newItem: News = { ...thisItem };
	newItem.author = author;
	let docRef;
	let selectedImage: File;

	const hasImage = writable(false);

	const cleanUpForm = () => {
		newItem = initialNews;
	};

	const handleSlugChange = (e: CustomEvent) => {
		newItem.slug = e.detail;
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		if (!newItem.publishdate) {
			const now = new Date();
			const dateStr = now.toISOString().split('T')[0];
			const timeStr = now.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			});
			newItem.publishdate = dateStr;
			newItem.publishtime = timeStr;
		}
		!newItem.publishtime && (newItem.publishtime = '09:00');
		if (selectedImage) {
			newItem.image = await uploadImage(selectedImage);
		}
		dispatch($EditModeStore === EditMode.Update ? EditMode.Update : EditMode.New, newItem);
		newItem = initialNews;
		EditModeStore.set('');
		goto('/admin/newsadmin');
	};

	const handleReset = () => {
		cleanUpForm();
		EditModeStore.set('');
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
	<h1 class="">{$EditModeStore === EditMode.Update ? 'Edit news item' : 'Create news item'}</h1>

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
			<Label child="author" disabled={true}>Author</Label>
			<Input type="text" id="author" bind:value={newItem.author} disabled />
		</div>

		<!-- News text -->
		<div>
			<div class="flex flex-row justify-between">
				<Label child="news-text">News text *</Label>
				<p class="explanation self-end text-right">
					<strong>{newItem.text.length}</strong> characters.
				</p>
			</div>
			<Editor bind:content={newItem.text} />
		</div>
		<div>
			<SlugText text={newItem.text} slugText={newItem.slug} on:slugChange={handleSlugChange} />
		</div>
		<!-- Publish date  -->
		<div>
			<Label child="publishdate">Publish Date *</Label>
			<Input type="date" id="publishdate" bind:value={newItem.publishdate} />
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
			<Label child="image">Image</Label>
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
					<Label child="imageAlt" disabled={!$hasImage}>Image Alt text *</Label>
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
					<Label child="imageCaption" disabled={!$hasImage}>Image caption</Label>
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
			<Label child="pdfFile">PDF Document</Label>
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
				disabled={newItem.title.length === 0}
				>{$EditModeStore === EditMode.Update ? 'Update' : 'Save'} news</Button
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
