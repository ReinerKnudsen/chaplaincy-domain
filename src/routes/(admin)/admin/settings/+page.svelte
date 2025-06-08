<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { pathName } from '$lib/stores/NavigationStore';

	import { getFirestore, doc, setDoc } from 'firebase/firestore';
	import { ref, listAll } from 'firebase/storage';
	import { storage, imageColRef, database } from '$lib/firebase/firebaseConfig';

	onMount(() => {
		$pathName = $page.url.pathname;
	});

	const updateFilenames = async () => {
		// Create a reference to the folder in storage
		let folderPath = 'images';
		const folderRef = ref(storage, folderPath);
		try {
			// List all files in the folder
			const result = await listAll(folderRef);

			// Loop over each file and push the name to Firestore
			for (const itemRef of result.items) {
				const fileName = itemRef.name;

				// Add file name to Firestore (using the file name as the document ID)
				await setDoc(doc(database, 'images', fileName), {
					fileName: fileName,
					path: `${folderPath}/${fileName}`,
					createdAt: new Date(), // Optional: Store the timestamp of this operation
				});
			}
		} catch (error) {
			console.error('Error listing files or pushing data to Firestore:', error);
		}
	};
</script>

<div>
	<button type="button" class="border-black border" on:click={updateFilenames}
		>Update filenames</button
	>
</div>

<style>
</style>
