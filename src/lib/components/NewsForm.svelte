<script lang="ts">
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	import { uploadImage } from '$lib/services/fileService';
	import type { News } from '$lib/stores/ObjectStore';
	import { initialNews } from '$lib/stores/ObjectStore';

	// DaisyUI components are used via classes

	import { authStore } from '$lib/stores/AuthStore';
	import { EditModeStore, EditMode } from '$lib/stores/ObjectStore';

	import SlugText from './SlugText.svelte';
	import UploadPDF from '$lib/components/UploadPDF.svelte';
	import UploadImage from './UploadImage.svelte';
	import Label from './Label.svelte';
	import Editor from './Editor.svelte';

	const author = $authStore.name;

	interface Props {
		thisItem?: News;
		onCreateNew?: (event: News) => Promise<void>;
		onUpdate?: (event: News) => Promise<void>;
	}

	let { thisItem = initialNews, onUpdate, onCreateNew }: Props = $props();

	let newItem: News = $state({ ...thisItem, author: author });
	let docRef;
	let selectedImage: File;

	const hasImage = writable(false);

	const cleanUpForm = () => {
		newItem = initialNews;
	};

	const handleSlugChange = (slugText: string) => {
		newItem.slug = slugText;
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
		if ($EditModeStore === EditMode.New && onCreateNew) {
			await onCreateNew(newItem);
		} else if ($EditModeStore === EditMode.Update && onUpdate) {
			await onUpdate(newItem);
		}
		goto('/admin/newsadmin');
	};

	const handleReset = () => {
		cleanUpForm();
	};

	const handleImageChange = (imageFile: File) => {
		selectedImage = imageFile;
		hasImage.set(!!selectedImage);
	};

	const assignPDF = (pdfDocument: { url: string; docRef: any }) => {
		newItem.pdfFile = pdfDocument.url;
	};
</script>

<div class="form bg-white-primary">
	<h1 class="">{$EditModeStore === EditMode.Update ? 'Edit news item' : 'Create news item'}</h1>

	<form
		id="form-container"
		enctype="multipart/form-data"
		onsubmit={handleSubmit}
		onreset={handleReset}
	>
		<!-- Titel -->
		<div>
			<Label child="title">News Headline *</Label>
			<input
				type="text"
				id="title"
				class="input input-bordered w-full"
				placeholder="News Title"
				bind:value={newItem.title}
				required
			/>
		</div>

		<!-- Author -->
		<div>
			<Label child="author" disabled={true}>Author</Label>
			<input
				type="text"
				id="author"
				class="input input-bordered w-full"
				bind:value={newItem.author}
				disabled
			/>
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
			<SlugText text={newItem.text} slugText={newItem.slug} onSlugChange={handleSlugChange} />
		</div>
		<!-- Publish date  -->
		<div>
			<Label child="publishdate">Publish Date *</Label>
			<input
				type="date"
				id="publishdate"
				class="input input-bordered w-full"
				bind:value={newItem.publishdate}
			/>
			<p class="explanation">If you don't select a publish date, it will be set to today.</p>
		</div>

		<!-- Publish time  -->
		<div>
			<Label child="publishtime" disabled={!newItem.publishdate}>Publish Time</Label>
			<input
				type="time"
				id="publishtime"
				class="input input-bordered w-full"
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
					<UploadImage imageUrl={newItem.image} onImageChange={handleImageChange} />
				{:else}
					<UploadImage imageUrl="" onImageChange={handleImageChange} />
				{/if}
			</div>
		</div>
		<div class="imageMeta">
			<div class="imageAlt">
				<div>
					<Label child="imageAlt" disabled={!$hasImage}>Image Alt text *</Label>
					<input
						type="text"
						id="imageAlt"
						class="input input-bordered w-full"
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
					<input
						type="text"
						id="imageCaption"
						class="input input-bordered w-full"
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
				<UploadPDF fileUrl={newItem.pdfFile} onUpload={assignPDF} />
				<p class="explanation">
					Upload a PDF document that will be attached to this news item (max 5MB).
				</p>
			</div>
		</div>

		<!-- Buttons -->
		<div class="buttons col-span-2 mt-10 mb-20">
			<button class="btn" type="reset" onclick={() => goto('/admin/newsadmin')}>Cancel</button>
			<button class="btn btn-neutral" type="reset" disabled={docRef}>Empty form</button>
			<button class="btn btn-primary" type="submit" disabled={newItem.title.length === 0}
				>{$EditModeStore === EditMode.Update ? 'Update' : 'Save'} news</button
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
