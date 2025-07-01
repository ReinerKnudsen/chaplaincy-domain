<script lang="ts">
	import { onDestroy } from 'svelte';

	import type { QueryDocumentSnapshot } from 'firebase/firestore';

	import { selectedImage, imageExists, existingImageUrl } from '$lib/stores/ImageSelectionStore';
	import { FileType, checkIfFileExists } from '$lib/services/fileService';

	import { MAX_IMAGE_SIZE } from '$lib/utils/constants';

	import { Button } from '$lib/components/ui/button';

	interface Props {
		imageUrl?: string | null | undefined;
		onImageChange: (imageData?: { url: string; altText: string; caption: string }) => void;
	}

	let { imageUrl, onImageChange }: Props = $props();

	const authorizedExtensions = '.jpg, .jpeg, .png, .webp';

	let selectedFile: File | null = null;
	let moduleWidth = 'w-[400px]';
	let imageError: string = $state('');
	let imageMessage: string = $state('');

	// Separate display URL from binding URL to prevent parent override
	let displayUrl: string = $state(imageUrl || '');

	const handleFileChange = async (event: Event) => {
		event.preventDefault();
		imageError = '';
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files || files.length === 0) {
			imageError = 'No file selected';
			$selectedImage = null;
			return;
		}

		selectedImage.set(files[0]);

		// If there is no image than leave here
		if (!$selectedImage) return;

		// Verify if image exists already
		let existingFile: QueryDocumentSnapshot | null = null;
		if ($selectedImage) {
			existingFile = await checkIfFileExists($selectedImage.name, FileType.Image);
		}
		// If the file already exists
		if (!!existingFile) {
			// reset any error and define the message
			imageError = '';
			imageMessage = 'This image already exists.';
			imageExists.set(true);
			existingImageUrl.set(existingFile.data().url);
			displayUrl = existingFile.data().url; // Use for display
			
			// Cast DocumentData to ImageDocument and handle null values
			const imageData = existingFile.data() as { url: string; altText: string | null; caption?: string | null };
			onImageChange({
				url: imageData.url,
				altText: imageData.altText || '',
				caption: imageData.caption || ''
			});
		} else {
			if ($selectedImage.size > MAX_IMAGE_SIZE) {
				imageError = 'The image is too big.';
				selectedFile = null;
				return;
			} else {
				imageError = '';
				displayUrl = URL.createObjectURL($selectedImage); // Use for display
			}
			onImageChange && onImageChange();
		}
	};

	const resetInput = () => {
		selectedFile = null;
		if (imageUrl) URL.revokeObjectURL(imageUrl);
		imageUrl = '';
		displayUrl = '';
	};

	onDestroy(() => {
		resetInput();
	});
</script>

{#if !displayUrl}
	<form class={moduleWidth}>
		<label class={moduleWidth + 'group flex h-[300px] flex-col rounded-lg border bg-slate-100 p-10 text-center '}>
			<div class="flex h-full w-full flex-col items-center justify-center text-center">
				<p class="pointer-none font-semibold text-gray-600">
					<span class="text-sm">Click here to select an image</span>
				</p>
			</div>
			<input type="file" id="uploadFile" accept={authorizedExtensions} class="hidden" onchange={handleFileChange} />
		</label>
		<div class="mt-3 text-center text-sm">
			(jpeg, jpg, png, webp, max {MAX_IMAGE_SIZE / 1000}KB)
		</div>
		{#if imageError}
			<p class="mt-3 text-center text-base text-red-700">{@html imageError}</p>
		{/if}
	</form>
{:else}
	<div class="image-container">
		<img class="w-full" src={displayUrl} alt="selectedFile" />
		{#if imageMessage}
			<p class="mt-3 text-center text-base text-gray-700">Note: {@html imageMessage}</p>
		{/if}
		<div class="col-span-2 mt-8 text-center">
			<Button variant="primary" onclick={resetInput}>Change</Button>
		</div>
	</div>
{/if}

<style>
	.image-container {
		width: 400px;
	}
</style>
