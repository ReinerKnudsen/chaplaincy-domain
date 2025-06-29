<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { marked } from 'marked';

	import { authStore } from '$lib/stores/AuthStore';
	import {
		EditModeStore,
		EditMode,
		initialNews,
		type News,
		createHashableString,
		ItemState,
	} from '$lib/stores/ObjectStore';
	import { selectedImage } from '$lib/stores/ImageSelectionStore';

	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import { cleanText } from '$lib/utils/HTMLfunctions';

	import Editor from './Editor.svelte';
	import Icon from '@iconify/svelte';
	import Label from './Label.svelte';
	import SlugText from './SlugText.svelte';
	import StateLabel from './StateLabel.svelte';
	import ToastContainer from './ToastContainer.svelte';
	import UploadImage from './UploadImage.svelte';
	import UploadPDF from './UploadPDF.svelte';

	const author = $authStore.name;

	interface Props {
		thisNews?: News;
		onSaveDraft?: (event: News) => Promise<void>;
		onCreateNew?: (event: News) => Promise<void>;
		onUpdate?: (event: News) => Promise<void>;
		onCancel?: () => void;
		onUnsavedChangesUpdate?: (hasUnsavedChanges: boolean) => void;
	}

	let {
		thisNews: propNews = initialNews,
		onUnsavedChangesUpdate,
		onSaveDraft,
		onCancel,
		onUpdate,
		onCreateNew,
	}: Props = $props();

	let thisNews = $state(propNews);
	let docRef;
	let hasPDF = $derived(!!thisNews.pdfFile);
	let hasImage = $derived(!!thisNews.image);
	let originalHash = $state('');
	let currentHash = $state('');
	let hasUnsavedChanges = $state(false);
	let loading = $state(true);

	onMount(() => {
		if ($EditModeStore === EditMode.Update) {
			const cloneNews = JSON.parse(JSON.stringify(thisNews));
			originalHash = createHashableString(cloneNews);
		} else {
			thisNews = { ...initialNews };
			originalHash = createHashableString(initialNews);
		}
		thisNews = { ...thisNews, author: author };
		loading = false;
	});

	const checkForChanges = () => {
		currentHash = createHashableString(thisNews);
		if (currentHash !== originalHash) {
			hasUnsavedChanges = true;
		} else {
			hasUnsavedChanges = false;
		}
		onUnsavedChangesUpdate?.(hasUnsavedChanges);
	};

	const isValidNews = $derived(!!thisNews.title && !!thisNews.text && !!thisNews.slug && !!thisNews.publishdate);

	/* # form functions */
	const cleanUpForm = () => {
		thisNews = { ...initialNews };
	};

	const assignPDF = (pdfDocument: { url: string; docRef: any }) => {
		thisNews = { ...thisNews, pdfFile: pdfDocument.url };
		checkForChanges();
	};

	const handleImageChange = () => {
		thisNews = { ...thisNews, image: $selectedImage?.url };
		checkForChanges();
	};

	const handleReset = () => {
		cleanUpForm();
	};

	const handleSaveDraft = () => {
		if (onSaveDraft) {
			onSaveDraft(thisNews);
		}
	};

	const handleSlugChange = (slugText: string) => {
		thisNews = { ...thisNews, slug: slugText.trim() };
		checkForChanges();
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		if ($EditModeStore === EditMode.New && onCreateNew) {
			await onCreateNew(thisNews);
		} else if ($EditModeStore === EditMode.Update && onUpdate) {
			await onUpdate(thisNews);
		}
	};

	const prepareSlugText = async () => {
		if (!thisNews.text) {
			thisNews = { ...thisNews, slug: '' };
			return;
		}
		const parsedText = await marked.parse(thisNews.text);
		const slugText = cleanText(parsedText).slice(0, MAX_SLUG_TEXT);
		thisNews = { ...thisNews, slug: slugText };
		checkForChanges();
	};
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	<div class="form bg-white-primary">
		<div id="headline" class="flex flex-row items-center justify-between">
			<h1 class="">{$EditModeStore === EditMode.Update ? 'Edit news item' : 'Create news item'}</h1>
			<div class=" flex h-full flex-row items-end justify-center gap-4">
				<StateLabel state={thisNews.state} class="mx-10 h-10 w-30" />
				{#if hasUnsavedChanges}
					<Icon icon="fa6-regular:pen-to-square" class="mr-10 h-6 w-6 self-center" />
				{/if}
			</div>
		</div>

		<form id="form-container" enctype="multipart/form-data" onsubmit={handleSubmit} onreset={handleReset}>
			<!-- Titel -->
			<div>
				<Label child="title">News Headline *</Label>
				<input
					type="text"
					id="title"
					class="input input-bordered w-full"
					placeholder="News Title"
					bind:value={thisNews.title}
					required
					onblur={() => {
						thisNews = { ...thisNews, title: thisNews.title?.trim() || '' };
						checkForChanges();
					}}
				/>
			</div>

			<!-- Author -->
			<div>
				<Label child="author" disabled={true}>Author</Label>
				<input type="text" id="author" class="input input-bordered w-full" bind:value={thisNews.author} disabled />
			</div>

			<!-- News text -->
			<div>
				<div class="flex flex-row justify-between">
					<Label child="news-text">News text *</Label>
					<p class="explanation self-end text-right">
						<strong>{thisNews.text ? thisNews.text.length : 0}</strong> characters.
					</p>
				</div>
				<Editor
					bind:content={thisNews.text}
					onBlur={() => {
						thisNews = { ...thisNews, text: thisNews.text?.trim() || '' };
						prepareSlugText();
					}}
				/>
			</div>

			<!-- SlugText -->
			<div>
				<SlugText slugText={thisNews.slug} required={true} onBlur={handleSlugChange} />
			</div>

			<!-- Publish date  -->
			<div>
				<Label child="publishdate">Publish Date *</Label>
				<input
					type="date"
					id="publishdate"
					class="input input-bordered w-full"
					bind:value={thisNews.publishdate}
					onblur={checkForChanges}
				/>
				<p class="explanation">If you don't select a publish date, it will be set to today.</p>
			</div>

			<!-- Publish time  -->
			<div>
				<Label child="publishtime" disabled={!thisNews.publishdate}>Publish Time</Label>
				<input
					type="time"
					id="publishtime"
					class="input input-bordered w-full"
					disabled={!thisNews.publishdate}
					bind:value={thisNews.publishtime}
					onblur={checkForChanges}
				/>
				<p class="explanation">If you don't select a publish time, it will be set to 09:00 of the selected day.</p>
			</div>

			<!-- Image -->
			<div>
				<Label child="image">Image</Label>
				<div class="flex flex-col items-center justify-center">
					{#if thisNews.image}
						<UploadImage imageUrl={thisNews.image} onImageChange={handleImageChange} />
					{:else}
						<UploadImage imageUrl="" onImageChange={handleImageChange} />
					{/if}
				</div>
			</div>

			<!-- Image Alt Text-->
			<div class="imageMeta">
				<div class="imageAlt">
					<div>
						<Label child="imageAlt" disabled={!hasImage}>Image Alt text *</Label>
						<input
							type="text"
							id="imageAlt"
							class="input input-bordered w-full"
							bind:value={thisNews.imageAlt}
							required={hasImage}
							disabled={!hasImage}
							placeholder={hasImage ? 'Image Alt text' : 'Please select an image first'}
							onblur={checkForChanges}
						/>
						<p class="explanation {!hasImage ? 'opacity-30' : 'opacity-100'}">
							This text helps interpreting the image for visually impaired users.
						</p>
					</div>
				</div>

				<!-- Image Caption -->
				<div class="imageCaption mt-10">
					<div>
						<Label child="imageCaption" disabled={!hasImage}>Image caption</Label>
						<input
							type="text"
							id="imageCaption"
							class="input input-bordered w-full"
							bind:value={thisNews.imageCaption}
							placeholder={hasImage ? 'Image by ...' : 'Please select an image first'}
							disabled={!hasImage}
							onblur={checkForChanges}
						/>
						<p class="explanation {!hasImage ? 'opacity-30' : 'opacity-100'}">
							This text will be displayed below the image.
						</p>
					</div>
				</div>
			</div>

			<!-- PDF Upload -->
			<div>
				<Label child="pdfFile">PDF Document</Label>
				<div class="flex flex-col items-center justify-center">
					<UploadPDF fileUrl={thisNews.pdfFile} onUpload={assignPDF} />
					{#if !hasPDF}
						<p class="explanation opacity-30">
							Upload a PDF document that will be attached to this news item (max 5MB).
						</p>
					{/if}
				</div>

				<!-- PDF Description -->
				<div>
					<Label child="pdfText" disabled={!hasPDF}>PDF Description</Label>
					<input
						type="text"
						id="pdfText"
						class="input input-bordered w-full"
						bind:value={thisNews.pdfText}
						required={hasPDF}
						disabled={!hasPDF}
						placeholder={hasPDF ? 'PDF Description' : 'Please select a PDF file first'}
						onblur={checkForChanges}
					/>
					<p class="explanation {!hasPDF ? 'opacity-30' : 'opacity-100'}">
						This text is the visible text for the PDF download link on the news page..
					</p>
				</div>
			</div>

			<!-- Buttons -->
			<div class="form fixed right-0 bottom-10 left-0 z-50 mx-auto w-3/4 gap-4 bg-slate-100 p-10 shadow-2xl">
				<div class="buttons col-span-2">
					<button class="btn" type="reset" color="light" onclick={onCancel}>Cancel</button>
					<button class="btn btn-soft" type="reset" disabled={docRef}>Empty form</button>
					{#if thisNews.state === ItemState.DRAFT}
						<button class="btn btn-soft" type="button" disabled={!hasUnsavedChanges} onclick={handleSaveDraft}
							>Save draft</button
						>
					{/if}
					<button class="btn btn-primary" type="submit" disabled={!isValidNews || !hasUnsavedChanges}
						>{$EditModeStore === EditMode.Update ? 'Update' : 'Save'} news</button
					>
				</div>
			</div>
		</form>
	</div>
{/if}

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
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 50px;
		padding: 0 50px;
		justify-content: space-between;
		width: 100%;
		padding: 0 50px;
	}
</style>
