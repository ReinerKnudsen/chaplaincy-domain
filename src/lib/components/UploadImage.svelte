<script lang="ts">
	import { onDestroy } from 'svelte';

	import { FileType, checkIfFileExists } from '$lib/services/fileService';
	import { selectedImage, imageExists, existingImageUrl } from '$lib/stores/ImageSelectionStore';

	import { MAX_IMAGE_SIZE } from '$lib/utils/constants';
	import type { QueryDocumentSnapshot } from 'firebase/firestore';

	interface Props {
		imageUrl?: string;
		onImageChange: () => void;
	}

	let { imageUrl = $bindable(), onImageChange }: Props = $props();

	const authorizedExtensions = '.jpg, .jpeg, .png, .webp';

	let selectedFile: File | null = null;
	let moduleWidth = 'w-[400px]';
	let imageError: string = $state('');
	let imageNote: string = $state('');

	const handleFileChange = async (event: Event) => {
		event.preventDefault();
		imageError = '';
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files || files.length === 0) {
			imageError = 'No file selected';
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
			imageError = '';
			imageNote = 'This image already exists.';
			imageExists.set(true);
			existingImageUrl.set(existingFile.data().url);
			imageUrl = existingFile.data().url;
		} else {
			if ($selectedImage.size > MAX_IMAGE_SIZE) {
				imageError = 'The image is too big.';
				selectedFile = null;
				return;
			} else {
				imageError = '';
				imageUrl = URL.createObjectURL($selectedImage);
			}
		}
		onImageChange();
	};

	const resetInput = () => {
		selectedFile = null;
		if (imageUrl) URL.revokeObjectURL(imageUrl);
		imageUrl = '';
	};

	onDestroy(() => {
		resetInput();
	});
</script>

{#if !imageUrl}
	<form class={moduleWidth}>
		<label
			class={moduleWidth +
				'group flex h-[300px] flex-col rounded-lg border bg-slate-100 p-10 text-center '}
		>
			<div class="flex h-full w-full flex-col items-center justify-center text-center">
				<p class="pointer-none font-semibold text-gray-600">
					<span class="text-sm">Click here to select an image</span>
				</p>
			</div>
			<input
				type="file"
				id="uploadFile"
				accept={authorizedExtensions}
				class="hidden"
				onchange={handleFileChange}
			/>
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
		<img class="w-full" src={imageUrl} alt="selectedFile" />
		{#if imageNote}
			<p class="mt-3 text-center text-base text-gray-700">Note: {@html imageNote}</p>
		{/if}
		<div class="col-span-2 mt-8 text-center">
			<button class="btn btn-primary w-1/2" onclick={resetInput}>Change</button>
		</div>
	</div>
{/if}

<style>
	.image-container {
		width: 400px;
	}
</style>
