<script>
	import { Label } from 'flowbite-svelte';
	import { storageRef } from '$lib/firebase/firebaseConfig';
	import { EventStore } from '$lib/stores/FormStore';
	import { ref } from 'firebase/storage';

	export let type = '';
	export let size = 0;

	let thisStorageRef;
	let files;

	if (type === '') {
		thisStorageRef = storageRef;
	} else {
		thisStorageRef = ref(storageRef, 'type');
	}

	const checkFileSize = (e) => {
		e.preventDefault();
		if (e.target.files[0].size > size) {
			alert('File is too big!');
			files = null;
		}
	};
</script>

<Label for="fileupload" class="mb-2">File Upload</Label>
<div class="flex h-full w-full items-center justify-center pb-16">
	<label
		for="dropzone-file"
		class="dark:hover:bg-bray-800 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
	>
		<div class="flex flex-col items-center justify-center pb-4 pt-4">
			<svg
				class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 16"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
				/>
			</svg>
			<p class="text-lg text-gray-500 dark:text-gray-400">
				Please upload a file to decorate your event with.
			</p>

			<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
				<span class="font-semibold">Click to upload</span> or drag and drop
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 800x400px)</p>
		</div>

		<input
			id="dropzone-file"
			type="file"
			class="hidden"
			accept=".png,.jpg"
			bind:value={$EventStore.url}
			on:change={checkFileSize}
		/>
	</label>
</div>
