<script>
	import { createEventDispatcher } from 'svelte';

	import { Button } from 'flowbite-svelte';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

	import { storage } from '$lib/firebase/firebaseConfig';
	import { MAX_IMAGE_SIZE, STORAGE_URL } from '$lib/utils/constants';

	const dispatch = createEventDispatcher();

	const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

	let imageUrl;
	let selectedFile;
	let downloadURL;
	let moduleWidth = 'w-[400px]';

	const handleFileChange = (event) => {
		selectedFile = event.target.files[0];
	};

	const resetInput = () => {
		selectedFile = null;
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const storageRef = ref(storage, 'images/' + selectedFile.name);
		await uploadBytes(storageRef, selectedFile);
		downloadURL = await getDownloadURL(storageRef);
		disptach;
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

{#if !selectedFile}
	<form class={moduleWidth}>
		<label
			class={moduleWidth +
				'group flex h-[210px] flex-col rounded-lg border-4 bg-slate-300 p-10 text-center'}
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
		{#if selectedFile}
			<div class="mt-5"><Button class="w-full" type="submit">Upload</Button></div>
		{/if}
	</form>
{:else}
	<div class={moduleWidth}>
		<img class="w-full" src={URL.createObjectURL(selectedFile)} alt="selectedFile" />
	</div>
	<div class={moduleWidth + ' mt-5 grid h-14 grid-cols-6 items-center rounded-md border-2'}>
		<div class="col-span-4 pl-2">{selectedFile.name}</div>
		<div class="col-span-2 text-center">
			<Button class="w-10/12" on:click={resetInput}>Change</Button>
		</div>
	</div>
{/if}
