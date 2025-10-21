<script lang="ts">
	import { goto } from '$app/navigation';

	import { addDoc, collection, Timestamp, updateDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';

	import { uploadPDF, type ReturnType } from '$lib/services/fileService';

	import { notificationStore, Messages } from '$lib/stores/notifications';

	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import WeeklySheetForm from '$lib/components/WeeklySheetForm.svelte';

	import { type WeeklySheet } from '$lib/stores/ObjectStore';
	import { makeTimestamp } from '$lib/utils/dateUtils';

	const handleSubmit = async (selectedPDF: File, newItem: WeeklySheet) => {
		if (!newItem.date) {
			alert('Please enter a date');
			return;
		}
		if (!newItem.pdfFile) {
			alert('Please upload a document');
			return;
		}

		try {
			if (selectedPDF) {
				const result = await uploadPDF(selectedPDF, 'weeklysheet');
				if (result) {
					newItem = { ...newItem, pdfFile: result.url, pdfName: result.ref.name };
				}
			}
		} catch (error) {
			console.error('Error uploading document:', error);
		}

		try {
			await addDoc(collection(database, 'documents'), newItem);
			notificationStore.addToast('success', Messages.SAVESUCCESS);
			goto('/admin/weeklysheet');
		} catch (error) {
			notificationStore.addToast('error', Messages.SAVERROR);
			console.error('Error updating document:', error);
		}
	};

	const handleCancel = async () => {
		goto('admin/weeklysheet');
	};
</script>

<WeeklySheetForm onSubmit={handleSubmit} onCancel={handleCancel} />

<ToastContainer />
