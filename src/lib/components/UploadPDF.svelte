<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { type StorageReference } from 'firebase/storage';
	import { checkIfPDFExists } from '$lib/services/fileService';

	import { Button } from '$lib/components/ui/button';

	interface Props {
		existingPdf?: string | null;
		pdftype?: 'documents' | 'weeklysheet' | 'newsletter';
		onNewFileSelected?: (newDcoument: File) => void;
		onExistingFileSelected?: (docRef: StorageReference) => void;
	}

	let { existingPdf, pdftype = 'documents', onNewFileSelected, onExistingFileSelected }: Props = $props();

	const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5MB max size for PDFs
	const authorizedExtensions = '.pdf';

	let selectedFile: File | null = $state(null);
	let fileUrl: string = $state('');
	let moduleWidth = 'md:w-[400px]';
	let fileError: string = $state('');
	let fileName: string = $state('');
	let uploadProgress = $state(false);
	let loading = $state(true);

	$effect(() => {
		if (existingPdf) {
			fileUrl = existingPdf;
			fileName = existingPdf.split('/').pop() || '';
		}
		loading = false;
	});

	const handleFileChange = async (event: any) => {
		event.preventDefault();
		fileError = '';
		if (event.target.files) {
			selectedFile = event.target.files[0];
			if (!selectedFile) return;

			let existingFileRef: StorageReference | null = await checkIfPDFExists(selectedFile.name, pdftype);

			if (existingFileRef) {
				fileError = 'This PDF file already exists in the collection.';
				onExistingFileSelected && onExistingFileSelected(existingFileRef);
				return;
			}

			if (selectedFile.size > MAX_PDF_SIZE) {
				fileError = 'The PDF file is too big (max 5MB).';
				resetInput();
				return;
			}

			fileError = '';
			try {
				fileName = selectedFile.name;
				fileUrl = URL.createObjectURL(selectedFile);
				onNewFileSelected && onNewFileSelected(selectedFile);
			} catch (error) {
				console.error('Error creating file:', error);
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
	<form class={moduleWidth + 'box-border'}>
		<label
			class={moduleWidth +
				'group flex h-[200px] cursor-pointer flex-col rounded-lg border bg-slate-100 text-center transition-colors hover:bg-slate-200 md:p-10'}
		>
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
			<a href={fileUrl} type="_blank" rel="noopener noreferrer" class="ml-2 text-sm text-blue-600 hover:text-blue-800"
				>View PDF</a
			>
		</div>
		<div class="col-span-2 mt-6 text-center">
			<Button variant="primary" onclick={resetInput}>Change</Button>
		</div>
	</div>
{/if}

<style>
	.pdf-container {
		width: 100%;
		max-width: 400px;
	}
</style>
