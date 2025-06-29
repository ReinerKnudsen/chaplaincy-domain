<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { ref, uploadBytes, getDownloadURL, getMetadata } from 'firebase/storage';
	import { getDoc, addDoc, doc } from 'firebase/firestore';

	import {
		storage,
		documentsColRef,
		pdfStorageRef,
		pdfColRef,
		weeklysheetStorageRef,
		newsletterStorageRef,
	} from '$lib/firebase/firebaseConfig';

	interface Props {
		fileUrl?: string | null;
		target?: 'pdf' | 'weeklysheet' | 'newsletter';
		onUpload: ({ url, docRef }: { url: string; docRef: any }) => void;
	}

	let { fileUrl = $bindable(''), target = 'pdf', onUpload }: Props = $props();

	const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5MB max size for PDFs
	const authorizedExtensions = '.pdf';

	let selectedFile: File;
	let moduleWidth = 'w-[400px]';
	let fileError: string = $state('');
	let fileName: string = $state('');
	let uploadProgress = $state(false);

	onMount(async () => {
		if (fileUrl) {
			try {
				// Get the file name from the URL
				const fileRef = ref(storage, fileUrl);
				const metadata = await getMetadata(fileRef);
				fileName = metadata.name || 'PDF Document';
			} catch (error) {
				console.error('Error getting PDF metadata:', error);
				fileName = 'PDF Document';
			}
		}
	});

	const targetRefs = {
		pdf: { storage: pdfStorageRef, collection: pdfColRef },
		weeklysheet: { storage: weeklysheetStorageRef, collection: documentsColRef },
		newsletter: { storage: newsletterStorageRef, collection: documentsColRef },
	};
	const { storage: targetStorageRef, collection: targetCollectionRef } = targetRefs[target];

	/** Verify in Firestore Collection if a PDF of this name is already present*/
	const checkIfFileExists = async (thisFile: string) => {
		const docRef = doc(targetCollectionRef, thisFile);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return true; // File exists in Firestore
		} else {
			return false; // File doesn't exist in Firestore
		}
	};

	const handleFileChange = async (event: any) => {
		event.preventDefault();
		fileError = '';
		if (event.target.files) {
			selectedFile = event.target.files[0];
			let fileExists = await checkIfFileExists(selectedFile.name);
			if (fileExists) {
				const userConfirmed = confirm('A file with this name already exists. Do you want to overwrite it?');
				fileError = `<em>${selectedFile.name}</em> already exists. <p>Please choose another file.`;
				resetInput();
			} else {
				if (selectedFile.size > MAX_PDF_SIZE) {
					fileError = 'The PDF file is too big (max 5MB).';
					selectedFile = new File([], '');
				} else if (!selectedFile.type.includes('pdf')) {
					fileError = 'Only PDF files are allowed.';
					selectedFile = new File([], '');
				} else {
					fileError = '';
					uploadProgress = true;

					try {
						// Create a reference to the file location in Firebase Storage
						const fileRef = ref(targetStorageRef, selectedFile.name);

						// Upload the file to Firebase Storage
						const uploadResult = await uploadBytes(fileRef, selectedFile);

						// Get the download URL
						const downloadURL = await getDownloadURL(fileRef);

						// Add metadata to Firestore
						const docRef = await addDoc(targetCollectionRef, {
							name: selectedFile.name,
							path: downloadURL,
							size: selectedFile.size,
							type: target,
							uploadDate: new Date().toISOString(),
						});

						fileUrl = downloadURL;
						fileName = selectedFile.name;
						onUpload({ url: downloadURL, docRef: docRef });
					} catch (error) {
						console.error('Error uploading file:', error);
						fileError = 'Error uploading file. Please try again.';
					} finally {
						uploadProgress = false;
					}
				}
			}
		}
	};

	const resetInput = () => {
		selectedFile = new File([], '');
		if (fileUrl) URL.revokeObjectURL(fileUrl);
		fileUrl = '';
		fileName = '';
	};

	onDestroy(() => {
		resetInput();
	});
</script>

{#if !fileUrl}
	<form class={moduleWidth}>
		<label class={moduleWidth + 'group flex h-[200px] flex-col rounded-lg border bg-slate-100 p-10 text-center '}>
			<div class="flex h-full w-full flex-col items-center justify-center text-center">
				<p class="pointer-none font-semibold text-gray-600">
					<span class="text-sm">Click here to select a PDF file</span>
				</p>
			</div>
			<input type="file" id="uploadFile" accept={authorizedExtensions} class="hidden" onchange={handleFileChange} />
		</label>
		<div class="mt-3 text-center text-sm">(PDF files only, max 5MB)</div>
		{#if fileError}
			<p class="mt-3 text-center text-base text-red-700">{@html fileError}</p>
		{/if}
		{#if uploadProgress}
			<p class="mt-3 text-center text-base text-blue-600">Uploading file...</p>
		{/if}
	</form>
{:else}
	<div class="pdf-container">
		<div class="flex items-center justify-center rounded-lg bg-slate-100 p-4">
			<svg class="h-8 w-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
				<path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
				<path
					d="M3 8a2 2 0 012-2h2.93a.25.25 0 01.174.073l2.6 2.6a.25.25 0 00.174.073H13a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
				/>
			</svg>
			<span class="ml-2 text-sm font-medium text-gray-900">{fileName}</span>
			<a href={fileUrl} target="_blank" rel="noopener noreferrer" class="ml-2 text-sm text-blue-600 hover:text-blue-800"
				>View PDF</a
			>
		</div>
		<div class="col-span-2 text-center">
			<button class="btn btn-primary w-1/2" onclick={resetInput}>Change</button>
		</div>
	</div>
{/if}

<style>
	.pdf-container {
		width: 100%;
		max-width: 400px;
	}
</style>
