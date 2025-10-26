<script lang="ts">
	import type { WeeklySheet } from '$lib/stores/ObjectStore';
	import { updateDoc, type DocumentData, type DocumentReference } from 'firebase/firestore';

	import WeeklySheetForm from '$lib/components/WeeklySheetForm.svelte';
	import { uploadNewPDF } from '$lib/services/EventFormService';
	import { Messages, notificationStore } from '$lib/stores/notifications';
	import { goto } from '$app/navigation';

	import ToastContainer from '$lib/components/ToastContainer.svelte';

	interface Props {
		data: {
			sheetItem: WeeklySheet;
			docRef: DocumentReference;
		};
	}

	let { data }: Props = $props();
	const thisSheet = data.sheetItem;

	const handleSaveItem = async (selectedPDF: File | null, newItem: WeeklySheet) => {
		try {
			console.log('Save called');

			// Handle PDF upload if a new file was selected
			if (selectedPDF) {
				const result = await uploadNewPDF(selectedPDF, 'weeklysheet');
				if (result) {
					newItem = {
						...newItem,
						pdfFile: result.url,
						pdfName: result.ref.name,
					};
				}
			}

			// Prepare the data for saving (remove the id field)
			const { id, ...dataToSave } = newItem;

			// Update the document in Firestore
			await updateDoc(data.docRef, dataToSave as DocumentData);

			// Show success notification and navigate back
			notificationStore.addToast('success', Messages.UPDATESUCCESS);
			goto('/admin/weeklysheet');
		} catch (error) {
			console.error('Error updating weekly sheet:', error);
			notificationStore.addToast('error', Messages.UPDATEERROR);
		}
	};

	const handleCancel = () => {
		goto('/admin/weeklysheet');
	};
</script>

<div>
	<WeeklySheetForm onSubmit={handleSaveItem} onCancel={handleCancel} item={thisSheet} />
</div>

<ToastContainer />
