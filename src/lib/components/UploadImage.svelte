<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';

	import { FileType, checkIfFileExists } from '$lib/services/fileService';

	import { MAX_IMAGE_SIZE } from '$lib/utils/constants';

	export let imageUrl: string;
	const dispatch = createEventDispatcher<{
		imageChange: File;
		error: string;
	}>();
	const authorizedExtensions = '.jpg, .jpeg, .png, .webp';

	let selectedFile: File | null = null;
	let moduleWidth = 'w-[400px]';
	let imageError: string = '';
	let imageNote: string = '';

	const handleFileChange = async (event: Event) => {
		event.preventDefault();
		imageError = '';
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files || files.length === 0) {
			imageError = 'No file selected';
			dispatch('error', imageError);
			return;
		}

		selectedFile = files[0];
		const existingFile = await checkIfFileExists(selectedFile.name, FileType.Image);

		if (existingFile) {
			imageError = '';
			imageNote = 'This image already exists.';
			imageUrl = existingFile.data().url;
			dispatch('imageChange', selectedFile);
		} else {
			if (selectedFile.size > MAX_IMAGE_SIZE) {
				imageError = 'The image is too big.';
				selectedFile = null;
				dispatch('error', imageError);
			} else {
				imageError = '';
				imageUrl = URL.createObjectURL(selectedFile);
				dispatch('imageChange', selectedFile);
			}
		}
	};

	const resetInput = () => {
		selectedFile = null;
		URL.revokeObjectURL(imageUrl);
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
				on:change={handleFileChange}
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
			<button class="btn btn-primary w-1/2" on:click={resetInput}>Change</button>
		</div>
	</div>
{/if}

<style>
	.image-container {
		width: 400px;
	}
</style>
