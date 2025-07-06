<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import { updateDoc, type DocumentReference, type DocumentData } from 'firebase/firestore';

	import { type News, EditModeStore } from '$lib/stores/ObjectStore';

	import { newsFormService, uploadNewsImage } from '$lib/services/NewsFormService';
	import { notificationStore, TOAST_DURATION, Messages } from '$lib/stores/notifications';
	import { uploadNewPDF } from '$lib/services/EventFormService';

	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import NewsForm from '$lib/components/NewsForm.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	let pageHasUnsavedChanges = $state(false);

	interface Props {
		data: {
			newsItem: News;
			docRef: DocumentReference;
		};
	}

	let { data }: Props = $props();
	let showNavigateWarning = $state(false);

	beforeNavigate(({ cancel }) => {
		if (pageHasUnsavedChanges) {
			cancel();
			showNavigateWarning = true;
		}
	});

	const handleCancel = () => {
		EditModeStore.set('');
		pageHasUnsavedChanges = false;
		goto('/admin/newsadmin');
	};

	const handleNavigateConfirm = () => {
		showNavigateWarning = false;
		pageHasUnsavedChanges = false;
		goto('/admin/newsadmin');
	};

	const handleSaveDraft = async (thisNews: News, newImage: File | null, newPDF: File | null) => {
		if (!thisNews) return;
		try {
			let draftNews: News = thisNews;
			if (!data.docRef) {
				throw new Error('No document reference provided');
			}

			if (newImage) {
				draftNews = await uploadNewsImage(thisNews, newImage);
			}

			if (newPDF) {
				const result = await uploadNewPDF(newPDF, 'documents');
				if (result) draftNews = { ...thisNews, pdfFile: result.url, pdfName: result.ref.name };
			}

			const newsData = { ...draftNews } as DocumentData;
			await updateDoc(data.docRef, newsData);
			notificationStore.addToast('success', Messages.UPDATESUCCESS, TOAST_DURATION);
			pageHasUnsavedChanges = false;
			goto('/admin/newsadmin');
			EditModeStore.set('');
		} catch (error) {
			notificationStore.addToast('error', Messages.UPDATEERROR);
			console.error('Error updating the news: ', error);
		}
	};

	const handleUnsavedChangesUpdate = (formHasUnsavedChanges: boolean): void => {
		pageHasUnsavedChanges = formHasUnsavedChanges;
	};

	const handleUpdateNews = async (thisNews: News, newImage: File | null, newPDF: File | null) => {
		if (!thisNews) return;
		try {
			if (!data.docRef) {
				throw new Error('No document reference provided');
			}

			if (newImage) {
				thisNews = await uploadNewsImage(thisNews, newImage);
			}

			if (newPDF) {
				const result = await uploadNewPDF(newPDF, 'documents');
				if (result) thisNews = { ...thisNews, pdfFile: result.url, pdfName: result.ref.name };
			}
			thisNews = await newsFormService(thisNews);
			const newsData = { ...thisNews } as DocumentData;
			await updateDoc(data.docRef, newsData);
			notificationStore.addToast('success', Messages.UPDATESUCCESS, TOAST_DURATION);
			pageHasUnsavedChanges = false;
			goto('/admin/newsadmin');
			EditModeStore.set('');
		} catch (error) {
			notificationStore.addToast('error', Messages.UPDATEERROR);
			console.error('Error updating the news: ', error);
		}
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
		thisNews={data.newsItem}
		onUpdate={handleUpdateNews}
		onSaveDraft={handleSaveDraft}
		onCancel={handleCancel}
		onUnsavedChangesUpdate={handleUnsavedChangesUpdate}
	/>
</div>

<ToastContainer />
