<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	import { uploadImage } from '$lib/services/fileService';
	import type { News } from '$lib/stores/ObjectStore';
	import { initialNews } from '$lib/stores/ObjectStore';

	import { authStore } from '$lib/stores/AuthStore';
	import { EditModeStore, EditMode } from '$lib/stores/ObjectStore';

	import SlugText from './SlugText.svelte';
	import MarkdownHelp from './MarkdownHelp.svelte';
	import UploadPDF from '$lib/components/UploadPDF.svelte';
	import UploadImage from './UploadImage.svelte';

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
		console.log('Called handleSubmit');
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

<div class="form border-0 bg-white-primary">
	<h1 class="mx-10">
		{$EditModeStore === EditMode.Update ? 'Edit news item' : 'Create news item'}
	</h1>
</div>

<form enctype="multipart/form-data" on:submit={handleSubmit} on:reset={handleReset}>
	<!-- Titel -->
	<div class="form my-4 bg-white-primary px-10 py-4">
		<div class="component-wrapper">
			<label class="form-label" for="title">News Headline *</label>
			<input
				class="form-input"
				type="text"
				id="title"
				placeholder="News Title"
				bind:value={newItem.title}
				required
			/>
		</div>

		<!-- Author -->
		<div class="component-wrapper">
			<label class="form-label disabled" for="author">Author</label>
			<input class="form-input" type="text" id="author" bind:value={newItem.author} disabled />
		</div>

		<!-- News text -->
		<div class="component-wrapper mb-1">
			<label class="form-label items-start pt-4" for="news-text">News text *</label>
			<textarea
				class="form-input"
				id="news-text"
				placeholder="News text"
				rows="8"
				name="news-text"
				bind:value={newItem.text}
				wrap="hard"
			/>
		</div>
		<p class="form-explanation self-end text-right">
			<strong>{newItem.text.length}</strong> characters.
		</p>

		<MarkdownHelp text={newItem.text} />
		<SlugText text={newItem.text} slugText={newItem.slug} on:slugChange={handleSlugChange} />

		<!-- Publish date  -->
		<div class="component-wrapper mb-1">
			<label class="form-label" for="publishdate">Publish Date *</label>
			<input class="form-input" type="date" id="publishdate" bind:value={newItem.publishdate} />
		</div>
		<p class="form-explanation">If you don't select a publish date, it will be set to today.</p>

		<!-- Publish time  -->
		<div class="component-wrapper mb-1">
			<label class="form-label {!newItem.publishdate ? 'disabled' : ''}" for="publishtime"
				>Publish Time</label
			>
			<input
				class="form-input"
				type="time"
				id="publishtime"
				disabled={!newItem.publishdate}
				bind:value={newItem.publishtime}
			/>
		</div>
		<p class="form-explanation">
			If you don't select a publish time, it will be set to 09:00 of the selected day.
		</p>

		<hr class="my-8" />
		<!-- Image -->
		<div>
			<label class="form-label" for="image">Image</label>
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
				<div class="component-wrapper mb-1">
					<label class="form-label {!hasImage ? 'disabled' : ''}" for="imageAlt"
						>Image Alt text *</label
					>
					<input
						class="form-input"
						type="text"
						id="imageAlt"
						bind:value={newItem.imageAlt}
						required={$hasImage}
						disabled={!$hasImage}
						placeholder={$hasImage ? 'Image Alt text' : 'Please select an image first'}
					/>
				</div>
				<p class="form-explanation {!$hasImage ? 'opacity-30' : 'opacity-100'}">
					This text helps interpreting the image for visually impaired users.
				</p>
			</div>
			<div class="imageCaption mb-10">
				<div class="component-wrapper mb-1">
					<label class="form-label {!hasImage ? 'disabled' : ''}" for="imageCaption"
						>Image caption</label
					>
					<input
						class="form-input"
						type="text"
						id="imageCaption"
						bind:value={newItem.imageCaption}
						placeholder={$hasImage ? 'Image by ...' : 'Please select an image first'}
						disabled={!$hasImage}
					/>
				</div>
				<p class="form-explanation {!$hasImage ? 'opacity-30' : 'opacity-100'}">
					This text will be displayed below the image.
				</p>
			</div>
		</div>

		<!-- PDF Upload -->
		<div>
			<label class="form-label" for="pdfFile">PDF Document</label>
			<div class="flex flex-col items-center justify-center">
				<UploadPDF fileUrl={newItem.pdfFile} on:upload={assignPDF} />
				<p class="form-explanation">
					Upload a PDF document that will be attached to this news item (max 5MB).
				</p>
			</div>
		</div>
	</div>

	<!-- Buttons -->
	<div class="form bg-white-primary p-10">
		<!-- Buttons -->
		<div class="buttons col-span-2">
			<button class="button button-secondary" type="reset" color="light">Cancel</button>
			<button class="button btn-secondary" type="reset" color="light" disabled={docRef}
				>Empty form</button
			>
			<button class="button btn-primary" type="submit" disabled={newItem.title.length === 0}
				>{$EditModeStore === EditMode.Update ? 'Update' : 'Save'} news</button
			>
		</div>
	</div>
</form>

<div>&NonBreakingSpace;</div>

<style>
	.form {
		margin: 40px auto;
		max-width: 90%;
		border: 1px solid #eaeaea;
		border-radius: 20px;
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
