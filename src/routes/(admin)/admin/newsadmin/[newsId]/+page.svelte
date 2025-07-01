<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import { updateDoc, type DocumentReference, type DocumentData } from 'firebase/firestore';

	import { type News, EditModeStore } from '$lib/stores/ObjectStore';
	import { selectedImage, imageExists, existingImageUrl } from '$lib/stores/ImageSelectionStore';

	import { newsFormService } from '$lib/services/NewsFormService';
	import { notificationStore, TOAST_DURATION, Messages } from '$lib/stores/notifications';

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

	const handleSaveDraft = async (thisNews: News) => {
		try {
			if (!data.docRef) {
				throw new Error('No document reference provided');
			}
			const newsData = { ...thisNews } as DocumentData;
			await updateDoc(data.docRef, newsData);
			EditModeStore.set('');
			notificationStore.addToast('success', Messages.UPDATESUCCESS, TOAST_DURATION);
			pageHasUnsavedChanges = false;
			goto('/admin/newsadmin');
		} catch (error) {
			notificationStore.addToast('error', Messages.UPDATEERROR);
			console.error('Error updating the news: ', error);
		}
	};

	const handleUnsavedChangesUpdate = (formHasUnsavedChanges: boolean): void => {
		pageHasUnsavedChanges = formHasUnsavedChanges;
	};

	const handleUpdateNews = async (updatedNews: News) => {
		try {
			if (!data.docRef) {
				throw new Error('No document reference provided');
			}

			const thisNews: News | undefined = await newsFormService(
				updatedNews,
				$selectedImage,
				$imageExists,
				$existingImageUrl
			);

			const newsData = { ...thisNews } as DocumentData;
			await updateDoc(data.docRef, newsData);
			EditModeStore.set('');
			notificationStore.addToast('success', Messages.UPDATESUCCESS, TOAST_DURATION);
			pageHasUnsavedChanges = false;
			goto('/admin/newsadmin');
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
