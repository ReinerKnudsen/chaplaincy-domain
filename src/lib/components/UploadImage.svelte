<script>
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	import { Button } from 'flowbite-svelte';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

	import { storage } from '$lib/firebase/firebaseConfig';
	import { MAX_IMAGE_SIZE } from '$lib/utils/constants';

	export let imageUrl;

	const dispatch = createEventDispatcher();
	const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

	let selectedFile;
	let moduleWidth = 'w-[400px]';
	let imageError;

	const handleFileChange = async (event) => {
		imageError = '';
		let selectedFile = event.target.files[0];
		if (selectedFile.size > MAX_IMAGE_SIZE) {
			imageError = 'The image is too big.';
			selectedFile = '';
		} else {
			event.preventDefault();
			const storageRef = ref(storage, 'images/' + selectedFile.name);
			await uploadBytes(storageRef, selectedFile);
			imageUrl = await getDownloadURL(storageRef);
			dispatch('upload', imageUrl);
		}
	};

	const resetInput = () => {
		selectedFile = null;
		imageUrl = null;
	};
</script>

{#if !imageUrl}
	<form class={moduleWidth}>
		<label
			class={moduleWidth +
				'border-1 group flex h-[300px] flex-col rounded-lg bg-slate-100 p-10 text-center'}
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
			<p class="mt-3 text-center text-sm text-red-500">{imageError}</p>
		{/if}
	</form>
{:else}
	<div class={moduleWidth}>
		<img class="w-full" src={imageUrl} alt="selectedFile" />
	</div>
	<div class={moduleWidth + ' mt-1 grid h-14 grid-cols-6 items-center'}>
		<div class="col-span-4 pl-2"></div>
		<div class="col-span-2 text-center">
			<Button class="w-10/12" on:click={resetInput}>Change</Button>
		</div>
	</div>
{/if}
