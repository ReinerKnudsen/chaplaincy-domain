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
	let downloadURL;
	let moduleWidth = 'w-[400px]';

	onMount(() => {
		console.log('Image URL: ', imageUrl);
		if (imageUrl) {
			downloadURL = imageUrl;
			console.log('Download URL: ', downloadURL);
		}
	});

	if (imageUrl) {
		downloadURL = imageUrl;
		console.log('Download URL: ', downloadURL);
	}

	const handleFileChange = async (event) => {
		selectedFile = event.target.files[0];
		event.preventDefault();
		const storageRef = ref(storage, 'images/' + selectedFile.name);
		await uploadBytes(storageRef, selectedFile);
		downloadURL = await getDownloadURL(storageRef);
		dispatch('upload', downloadURL);
	};

	const resetInput = () => {
		selectedFile = null;
		downloadURL = null;
	};

	// Sehr geil! Das geht. Allerdings kommt die DownloadURL zurück, die wir nicht brauchen können.
	// Daher müssen wir uns eine eigene zusammenbasteln.

	const checkFileSize = (e) => {
		e.preventDefault();
		if (e.target.files[0].size > MAX_IMAGE_SIZE) {
			alert('File is too big!');
			files = null;
		}
	};
</script>

{#if !downloadURL}
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
	</form>
{:else}
	<div class={moduleWidth}>
		<img class="w-full" src={downloadURL} alt="selectedFile" />
	</div>
	<div class={moduleWidth + ' mt-1 grid h-14 grid-cols-6 items-center'}>
		<div class="col-span-4 pl-2">{selectedFile ? selectedFile.name : ''}</div>
		<div class="col-span-2 text-center">
			<Button class="w-10/12" on:click={resetInput}>Change</Button>
		</div>
	</div>
{/if}
