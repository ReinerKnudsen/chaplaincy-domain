<script lang="ts">
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	import { authStore } from '$lib/stores/AuthStore';
	import { EditModeStore, EditMode, initialNews, type News } from '$lib/stores/ObjectStore';

	import { selectedImage } from '$lib/stores/ImageSelectionStore';

	import Editor from './Editor.svelte';
	import Label from './Label.svelte';
	import SlugText from './SlugText.svelte';
	import ToastContainer from './ToastContainer.svelte';
	import UploadImage from './UploadImage.svelte';
	import UploadPDF from './UploadPDF.svelte';

	const author = $authStore.name;

	interface Props {
		thisNews?: News;
		onCreateNew?: (event: News) => Promise<void>;
		onUpdate?: (event: News) => Promise<void>;
	}

	let { thisNews = initialNews, onUpdate, onCreateNew }: Props = $props();

	let newNews: News = $state({ ...thisNews, author: author });
	let docRef;
	let hasPDF = writable(!!thisNews.pdfFile);
	let hasImage = writable(!!thisNews.image);

	const cleanUpForm = () => {
		newNews = { ...initialNews };
		hasImage.set(false);
		hasPDF.set(false);
	};

	const handleSlugChange = (slugText: string) => {
		newNews.slug = slugText;
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		if ($EditModeStore === EditMode.New && onCreateNew) {
			await onCreateNew(newNews);
		} else if ($EditModeStore === EditMode.Update && onUpdate) {
			await onUpdate(newNews);
		}
		goto('/admin/newsadmin');
	};

	const handleReset = () => {
		cleanUpForm();
	};

	const handleImageChange = () => {
		hasImage.set(!!$selectedImage);
	};

	const assignPDF = (pdfDocument: { url: string; docRef: any }) => {
		newNews.pdfFile = pdfDocument.url;
		hasPDF.set(!!pdfDocument);
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
				bind:value={newNews.title}
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
				bind:value={newNews.author}
				disabled
			/>
		</div>

		<!-- News text -->
		<div>
			<div class="flex flex-row justify-between">
				<Label child="news-text">News text *</Label>
				<p class="explanation self-end text-right">
					<strong>{newNews.text.length}</strong> characters.
				</p>
			</div>
			<Editor bind:content={newNews.text} />
		</div>
		<div>
			<SlugText text={newNews.text} slugText={newNews.slug} onSlugChange={handleSlugChange} />
		</div>
		<!-- Publish date  -->
		<div>
			<Label child="publishdate">Publish Date *</Label>
			<input
				type="date"
				id="publishdate"
				class="input input-bordered w-full"
				bind:value={newNews.publishdate}
			/>
			<p class="explanation">If you don't select a publish date, it will be set to today.</p>
		</div>

		<!-- Publish time  -->
		<div>
			<Label child="publishtime" disabled={!newNews.publishdate}>Publish Time</Label>
			<input
				type="time"
				id="publishtime"
				class="input input-bordered w-full"
				disabled={!newNews.publishdate}
				bind:value={newNews.publishtime}
			/>
			<p class="explanation">
				If you don't select a publish time, it will be set to 09:00 of the selected day.
			</p>
		</div>

		<!-- Image -->
		<div>
			<Label child="image">Image</Label>
			<div class="flex flex-col items-center justify-center">
				{#if newNews.image}
					<UploadImage imageUrl={newNews.image} onImageChange={handleImageChange} />
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
						bind:value={newNews.imageAlt}
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
						bind:value={newNews.imageCaption}
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
				<UploadPDF fileUrl={newNews.pdfFile} onUpload={assignPDF} />
				{#if !$hasPDF}
					<p class="explanation opacity-30">
						Upload a PDF document that will be attached to this news item (max 5MB).
					</p>
				{/if}
			</div>
			<div>
				<Label child="pdfText" disabled={!$hasPDF}>PDF Description</Label>
				<input
					type="text"
					id="pdfText"
					class="input input-bordered w-full"
					bind:value={newNews.pdfText}
					required={$hasPDF}
					disabled={!$hasPDF}
					placeholder={$hasPDF ? 'PDF Description' : 'Please select a PDF file first'}
				/>
				<p class="explanation {!$hasPDF ? 'opacity-30' : 'opacity-100'}">
					This text is the visible text for the PDF download link on the news page..
				</p>
			</div>
		</div>

		<!-- Buttons -->
		<div
			class="form fixed right-0 bottom-10 left-0 z-50 mx-auto w-2/3 gap-4 bg-slate-100 p-10 shadow-2xl"
		>
			<div class="buttons col-span-2 w-2/3">
				<button class="btn" type="reset" onclick={() => goto('/admin/newsadmin')}>Cancel</button>
				<button class="btn btn-neutral" type="reset" disabled={docRef}>Empty form</button>
				<button class="btn btn-primary" type="submit" disabled={newNews.title.length === 0}
					>{$EditModeStore === EditMode.Update ? 'Update' : 'Save'} news</button
				>
			</div>
		</div>
	</form>
</div>

<ToastContainer />

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
