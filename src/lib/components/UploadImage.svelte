<script lang="ts">
	import { onDestroy } from 'svelte';

	import { getDownloadURL, type StorageReference } from 'firebase/storage';

	import { checkIfFileExists } from '$lib/services/fileService';

	import { MAX_IMAGE_SIZE } from '$lib/utils/constants';

	import { Button } from '$lib/components/ui/button';

	interface Props {
		imageUrl?: string | null | undefined;
		onNewFileSelected: (file: File) => void;
		onExistingFileSelected: (fileRef: StorageReference) => void;
	}

	let { imageUrl, onNewFileSelected, onExistingFileSelected }: Props = $props();

	const authorizedExtensions = '.jpg, .jpeg, .png, .webp';

	let selectedImage: File | null = null;
	let moduleWidth = 'w-[400px]';
	let imageMessage: string = $state('');

	// Separate display URL from binding URL to prevent parent override
	let displayUrl: string = $state(imageUrl || '');

	const handleImageChange = async (event: Event) => {
		// all the component does is to return the File object and display the selected image
		event.preventDefault();
		imageMessage = '';
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files || files.length === 0) {
			imageMessage = 'No file selected';
			return;
		}
		selectedImage = files[0];

		// Verify if image already exists
		const currentImageRef = await checkIfFileExists(selectedImage.name);
		if (currentImageRef) {
			imageMessage = 'This image already exists.';
			displayUrl = await getDownloadURL(currentImageRef); // Use for display
			onExistingFileSelected(currentImageRef);
			return;
		}

		// Verify file size
		if (selectedImage.size > MAX_IMAGE_SIZE) {
			imageMessage = 'The image is too big.';
			return;
		}

		imageMessage = '';

		displayUrl = URL.createObjectURL(selectedImage); // Use for display
		selectedImage && onNewFileSelected(selectedImage);
	};

	const resetInput = () => {
		selectedImage = null;
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
			<input type="file" id="uploadFile" accept={authorizedExtensions} class="hidden" onchange={handleImageChange} />
		</label>
		<div class="mt-3 text-center text-sm">
			(jpeg, jpg, png, webp, max {MAX_IMAGE_SIZE / 1000}KB)
		</div>
		{#if imageMessage}
			<p class="mt-3 text-center text-base text-red-700">{@html imageMessage}</p>
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
