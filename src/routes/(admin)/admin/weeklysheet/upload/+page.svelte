<script lang="ts">
	import { goto } from '$app/navigation';

	import { addDoc, collection, Timestamp, updateDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';

	import { uploadPDF, type ReturnType } from '$lib/services/fileService';

	import { notificationStore, Messages } from '$lib/stores/notifications';

	import UploadPDF from '$lib/components/UploadPDF.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	type WeeklySheet = {
		date: string;
		path: string;
		name: string;
		size: number;
		type: string;
		uploadDate: Timestamp;
	};

	let newItem: WeeklySheet = $state({
		date: '',
		docUrl: '',
		path: '',
		name: '',
		size: 0,
		type: 'weeklysheet',
		uploadDate: Timestamp.now(),
	});

	let selectedPDF: File | null = $state(null);

	const saveDocRef = async (selectedFile: File) => {
		selectedPDF = selectedFile;
		newItem = { ...newItem, path: URL.createObjectURL(selectedPDF) };
	};

	const handleSubmit = async () => {
		if (!newItem.date) {
			alert('Please enter a date');
			return;
		}
		if (!newItem.path) {
			alert('Please upload a document');
			return;
		}

		try {
			if (selectedPDF) {
				const result: ReturnType | null = await uploadPDF(selectedPDF, 'weeklysheet');
				if (result) newItem.path = result.url;
			}
			newItem.name = selectedPDF?.name || '';
			newItem.size = selectedPDF?.size || 0;
		} catch (error) {
			console.error('Error uploading document:', error);
		}

		try {
			const saveResult = await addDoc(collection(database, 'documents'), newItem);
			notificationStore.addToast('success', Messages.SAVESUCCESS);
			goto('/admin/weeklysheet');
		} catch (error) {
			notificationStore.addToast('error', Messages.SAVERROR);
			console.error('Error updating document:', error);
		}
	};
</script>

<div class="form bg-white-primary mx-auto">
	<h1 class="mx-10">Upload weekly sheet</h1>
	<form class="mx-10 flex flex-col items-center" enctype="multipart/form-data" onsubmit={handleSubmit}>
		<!-- Date -->
		<div class="w-1/2">
			<Label>Date *</Label>
			<Input type="date" class="w-[400px]" id="date" bind:value={newItem.date} required />
		</div>

		<div class="mt-4 w-1/2">
			<Label>PDF Document</Label>
			<div class="flex flex-col">
				<UploadPDF pdftype="weeklysheet" onNewFileSelected={saveDocRef} />
			</div>
		</div>
		<!-- Buttons -->
		<div class="mt-10 mb-20 flex w-1/2 flex-row justify-start gap-32">
			<Button variant="outline" type="reset" color="light" onclick={() => goto('/admin/weeklysheet')}>Cancel</Button>
			<Button variant="primary" type="submit">Complete</Button>
		</div>
	</form>
</div>

<ToastContainer />

<style>
	.form {
		max-width: 90%;
		border: 1px solid #eaeaea;
		border-radius: 20px;
	}
</style>
