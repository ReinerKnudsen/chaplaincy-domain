<script>
	import { createEventDispatcher, onDestroy } from 'svelte';

	import { Button } from 'flowbite-svelte';

	import { getDoc, doc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';

	import { MAX_IMAGE_SIZE } from '$lib/utils/constants';

	export let imageUrl;

	const dispatch = createEventDispatcher();
	const authorizedExtensions = '.jpg, .jpeg, .png, .webp';

	let selectedFile;
	let moduleWidth = 'w-[400px]';
	let imageError;
	let imageNote;

	/** Verify in Firestore Collection if an image of this name is already present*/
	const checkIfFileExists = async (imageFile) => {
		if (!imageFile) {
			return null;
		}
		const docRef = doc(database, 'images', imageFile);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap; // File exists in Firestore
		} else {
			return null; // File doesn't exist in Firestore
		}
	};

	const handleFileChange = async (event) => {
		event.preventDefault();
		imageError = '';
		if (event.target) {
			selectedFile = event.target.files[0];
			let existingFile = await checkIfFileExists(selectedFile.name);
			if (existingFile) {
				imageError = '';
				imageNote = 'This image already exists.';
				imageUrl = existingFile.data().url;
				dispatch('imageChange', selectedFile);
			} else {
				if (selectedFile.size > MAX_IMAGE_SIZE) {
					imageError = 'The image is too big.';
					selectedFile = new File([], '');
				} else {
					imageError = '';
					imageUrl = URL.createObjectURL(selectedFile);
					dispatch('imageChange', selectedFile);
				}
			}
		}
	};

	const resetInput = () => {
		selectedFile = new File([], '');
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
				'border-1 group flex h-[300px] flex-col rounded-lg bg-slate-100 p-10 text-center '}
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
		<div class="col-span-2 text-center">
			<Button class="mt-5 w-6/12" on:click={resetInput}>Change</Button>
		</div>
	</div>
{/if}

<style>
	.image-container {
		width: 400px;
	}
</style>
