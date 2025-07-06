<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';

	import { addDoc } from 'firebase/firestore';
	import { newsColRef } from '$lib/firebase/firebaseConfig';

	import { type News, EditModeStore, EditMode } from '$lib/stores/ObjectStore';
	import { newsFormService, uploadNewsImage } from '$lib/services/NewsFormService';
	import { Messages } from '$lib/utils/messages';

	import { uploadNewPDF } from '$lib/services/EventFormService';

	import NewsForm from '$lib/components/NewsForm.svelte';
	import { notificationStore } from '$lib/stores/notifications';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	let pageHasUnsavedChanges = $state(false);
	let showNavigateWarning = $state(false);

	const handleSaveDraft = async (thisNews: News, newImage: File | null, newPDF: File | null) => {
		if (!thisNews) return;
		try {
			let draftNews: News = thisNews;
			if (newImage) {
				draftNews = await uploadNewsImage(thisNews, newImage);
			}

			if (newPDF) {
				const result = await uploadNewPDF(newPDF, 'documents');
				if (result) draftNews = { ...thisNews, pdfFile: result.url, pdfName: result.ref.name };
			}

			await addDoc(newsColRef, thisNews);
			pageHasUnsavedChanges = false;
			notificationStore.addToast('success', Messages.DRAFTSUCCESS);
			goto('/admin/newsadmin');
			EditModeStore.set(EditMode.Empty);
		} catch (error) {
			notificationStore.addToast('error', Messages.DRAFTERROR);
			console.error('Error writing document:', error);
		}
	};

	const handleUnsavedChangesUpdate = (formHasUnsavedChanges: boolean): void => {
		pageHasUnsavedChanges = formHasUnsavedChanges;
	};

	beforeNavigate(({ cancel }) => {
		if (pageHasUnsavedChanges) {
			cancel();
			showNavigateWarning = true;
		}
	});

	const handleSaveNewItem = async (thisNews: News, newImage?: File | null, newPDF?: File | null) => {
		if (!thisNews) return;
		try {
			if (newImage) {
				thisNews = await uploadNewsImage(thisNews, newImage);
			}

			if (newPDF) {
				const result = await uploadNewPDF(newPDF, 'documents');
				if (result) thisNews = { ...thisNews, pdfFile: result.url, pdfName: result.ref.name };
			}

			const updatedNews: News = await newsFormService(thisNews);
			await addDoc(newsColRef, updatedNews);
			pageHasUnsavedChanges = false;
			notificationStore.addToast('success', Messages.SAVESUCCESS);
			goto('/admin/newsadmin');
			EditModeStore.set('');
		} catch (error) {
			notificationStore.addToast('error', Messages.SAVERROR);
			console.error('Error writing document:', error);
		}
	};

	const handleNavigateConfirm = () => {
		showNavigateWarning = false;
		pageHasUnsavedChanges = false;
		goto('/admin/newsadmin');
	};

	const handleCancel = () => {
		EditModeStore.set(EditMode.Empty);
		goto('/admin/newsadmin');
	};
</script>

<ConfirmDialog
	open={showNavigateWarning}
	title="Unsaved Changes"
	message="You have unsaved changes. \nAre you sure you want to leave this page?"
	confirmText="Leave Page"
	cancelText="Stay on Page"
	confirmVariant="destructive"
	onConfirm={handleNavigateConfirm}
	onCancel={() => {
		showNavigateWarning = false;
	}}
/>

<div>
	<NewsForm
		onCreateNew={handleSaveNewItem}
		onSaveDraft={handleSaveDraft}
		onUnsavedChangesUpdate={handleUnsavedChangesUpdate}
		onCancel={handleCancel}
	/>
</div>

<ToastContainer />
