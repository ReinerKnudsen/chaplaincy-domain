<script lang="ts">
	import { onMount } from 'svelte';
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

	import { Button } from '$lib/components/ui/button';
	import Editor from './Editor.svelte';
	import Icon from '@iconify/svelte';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import SlugText from './SlugText.svelte';
	import StateLabel from './StateLabel.svelte';
	import ToastContainer from './ToastContainer.svelte';
	import UploadImage from './UploadImage.svelte';
	import UploadPDF from './UploadPDF.svelte';
	import { getDownloadURL, getMetadata, type StorageReference } from 'firebase/storage';

	const author = $authStore.name;

	interface Props {
		thisNews?: News;
		onSaveDraft?: (event: News, image: File | null, pdf: File | null) => Promise<void>;
		onCreateNew?: (event: News, image: File | null, pdf: File | null) => Promise<void>;
		onUpdate?: (event: News, image: File | null, pdf: File | null) => Promise<void>;
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
	let newImage: File | null = $state(null);
	let newPDF: File | null = $state(null);
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

	const isValidNews = $derived(!!thisNews.title && !!thisNews.text && !!thisNews.slug);

	/* # form functions */
	const cleanUpForm = () => {
		thisNews = { ...initialNews };
	};

	const handleExistingFileSelected = async (imageRef: StorageReference) => {
		newImage = null;
		const altText = await getMetadata(imageRef).then((metadata) => metadata.customMetadata?.imageAlt);
		const captionText = await getMetadata(imageRef).then((metadata) => metadata.customMetadata?.imageCaption);
		const imagePath = await getDownloadURL(imageRef);
		thisNews = { ...thisNews, image: imagePath, imageAlt: altText || '', imageCaption: captionText || '' };
		checkForChanges();
	};

	const handleNewFileSelected = (image: File) => {
		newImage = image;
		thisNews = { ...thisNews, image: image.name, imageAlt: '', imageCaption: '' };
		checkForChanges();
	};

	const handleExistingPDFSelected = async (pdfRef: StorageReference) => {
		newPDF = null;
		const pdfUrl = await getDownloadURL(pdfRef);
		thisNews = { ...thisNews, pdfFile: pdfUrl, pdfName: pdfRef.name };
		checkForChanges();
	};

	const handleNewPDFSelected = (pdf: File) => {
		newPDF = pdf;
		thisNews = { ...thisNews, pdfFile: pdf.name, pdfName: pdf.name };
		checkForChanges();
	};

	const handleReset = () => {
		cleanUpForm();
	};

	const handleSaveDraft = () => {
		if (onSaveDraft) {
			onSaveDraft(thisNews, newImage, newPDF);
		}
	};

	const handleSlugChange = (slugText: string) => {
		thisNews = { ...thisNews, slug: slugText.trim() };
		checkForChanges();
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		if ($EditModeStore === EditMode.New && onCreateNew) {
			await onCreateNew(thisNews, newImage, newPDF);
		} else if ($EditModeStore === EditMode.Update && onUpdate) {
			await onUpdate(thisNews, newImage, newPDF);
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
		<div class="text-md mb-10 bg-slate-100 p-2">All fields marked with * are required</div>

		<form id="form-container" enctype="multipart/form-data" onsubmit={handleSubmit} onreset={handleReset}>
			<!-- Titel -->
			<fieldset>
				<Label for="title">News Headline *</Label>
				<Input
					type="text"
					id="title"
					placeholder="News Title"
					bind:value={thisNews.title}
					required
					onblur={() => {
						thisNews = { ...thisNews, title: thisNews.title?.trim() || '' };
						checkForChanges();
					}}
				/>
			</fieldset>

			<fieldset>
				<Label for="subtitle">Sub Title</Label>
				<Input
					type="text"
					id="subtitle"
					placeholder="Sub Title"
					onblur={() => {
						thisNews = { ...thisNews, subtitle: thisNews.subtitle?.trim() || null };
						checkForChanges();
					}}
					bind:value={thisNews.subtitle}
				/>
			</fieldset>

			<!-- Author -->
			<fieldset>
				<Label for="author">Author</Label>
				<Input type="text" id="author" bind:value={thisNews.author} />
			</fieldset>

			<!-- News text -->
			<fieldset>
				<div class="flex flex-row justify-between">
					<Label for="news-text">News text *</Label>
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
			</fieldset>

			<!-- SlugText -->
			<fieldset>
				<SlugText slugText={thisNews.slug} required={true} onBlur={handleSlugChange} />
			</fieldset>

			<!-- Publish date  -->
			<fieldset>
				<Label for="publishdate">Publish Date *</Label>
				<Input type="date" id="publishdate" bind:value={thisNews.publishdate} onblur={checkForChanges} />
				<p class="explanation">If you don't select a publish date, it will be set to today.</p>
			</fieldset>

			<!-- Publish time  -->
			<fieldset disabled={!thisNews.publishdate}>
				<Label for="publishtime">Publish Time</Label>
				<Input type="time" id="publishtime" bind:value={thisNews.publishtime} onblur={checkForChanges} />
				<p class="explanation">If you don't select a publish time, it will be set to 09:00 of the selected day.</p>
			</fieldset>

			<!-- Image -->
			<div id="image" class="imageMeta">
				<fieldset>
					<Label for="image">Image</Label>
					<div class="flex flex-col items-center justify-center">
						<UploadImage
							imageUrl={thisNews.image}
							onExistingFileSelected={handleExistingFileSelected}
							onNewFileSelected={handleNewFileSelected}
						/>
					</div>
				</fieldset>

				<!-- Image Alt Text-->
				<div id="image-alt" class="imageMeta">
					<div class="imageAlt">
						<fieldset disabled={!hasImage}>
							<Label for="imageAlt">Image Alt text *</Label>
							<Input
								type="text"
								id="imageAlt"
								bind:value={thisNews.imageAlt}
								required={hasImage}
								disabled={!hasImage}
								placeholder={hasImage ? 'Image Alt text' : 'Please select an image first'}
								onblur={checkForChanges}
							/>
							<p class="explanation {!hasImage ? 'opacity-30' : 'opacity-100'}">
								This text helps interpreting the image for visually impaired users.
							</p>
						</fieldset>
					</div>

					<!-- Image Caption -->
					<div class="imageCaption mt-10">
						<fieldset disabled={!hasImage}>
							<Label for="imageCaption">Image caption</Label>
							<Input
								type="text"
								id="imageCaption"
								bind:value={thisNews.imageCaption}
								placeholder={hasImage ? 'Image by ...' : 'Please select an image first'}
								disabled={!hasImage}
								onblur={checkForChanges}
							/>
							<p class="explanation {!hasImage ? 'opacity-30' : 'opacity-100'}">
								This text will be displayed below the image.
							</p>
						</fieldset>
					</div>
				</div>

				<!-- PDF Upload -->
				<div id="pdf">
					<fieldset>
						<Label for="pdfFile">PDF Document</Label>
						<div class="flex flex-col items-center justify-center">
							<UploadPDF
								pdftype="documents"
								existingPdf={thisNews.pdfName}
								onExistingFileSelected={handleExistingPDFSelected}
								onNewFileSelected={handleNewPDFSelected}
							/>
							{#if !hasPDF}
								<p class="explanation opacity-30">
									Upload a PDF document that will be attached to this news item (max 5MB).
								</p>
							{/if}
						</div>
					</fieldset>

					<!-- PDF Description -->
					<fieldset disabled={!hasPDF}>
						<Label for="pdfText">PDF Description *</Label>
						<Input
							type="text"
							id="pdfText"
							bind:value={thisNews.pdfText}
							required={hasPDF}
							disabled={!hasPDF}
							placeholder={hasPDF ? 'PDF Description' : 'Please select a PDF file first'}
							onblur={checkForChanges}
						/>
						<p class="explanation {!hasPDF ? 'opacity-30' : 'opacity-100'}">
							This text is the visible text for the PDF download link on the news page..
						</p>
					</fieldset>
				</div>

				<!-- Buttons -->
				<div class="form fixed right-0 bottom-10 left-0 z-50 mx-auto w-1/2 gap-4 bg-slate-100 p-10 shadow-2xl">
					<div class="buttons col-span-2">
						<Button variant="outline" type="reset" color="light" onclick={onCancel}>Cancel</Button>
						<Button variant="outline" type="reset" disabled={docRef}>Empty form</Button>
						{#if thisNews.state === ItemState.DRAFT}
							<Button variant="primary" type="button" disabled={!hasUnsavedChanges} onclick={handleSaveDraft}
								>Save draft</Button
							>
						{/if}
						<Button variant="primary" type="submit" disabled={!isValidNews || !hasUnsavedChanges}
							>{$EditModeStore === EditMode.Update ? 'Update' : 'Save'} news</Button
						>
					</div>
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
		display: flex;
		flex-direction: row;
		gap: 50px;
		padding: 0 50px;
		justify-content: space-between;
		width: 100%;
		padding: 0 50px;
	}
</style>
