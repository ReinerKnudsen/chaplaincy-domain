<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';

	import { addDoc } from 'firebase/firestore';
	import { newsColRef } from '$lib/firebase/firebaseConfig';

	import { type News, EditModeStore, EditMode } from '$lib/stores/ObjectStore';
	import { selectedImage, imageExists, existingImageUrl, resetImageselection } from '$lib/stores/ImageSelectionStore';
	import { newsFormService } from '$lib/services/NewsFormService';
	import { Messages } from '$lib/utils/messages';

	import NewsForm from '$lib/components/NewsForm.svelte';
	import { notificationStore } from '$lib/stores/notifications';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	let pageHasUnsavedChanges = $state(false);
	let showNavigateWarning = $state(false);

	const handleSaveDraft = async (newNewsItem: News) => {
		try {
			await addDoc(newsColRef, newNewsItem);
			EditModeStore.set(EditMode.Empty);
			pageHasUnsavedChanges = false;
			notificationStore.addToast('success', Messages.DRAFTSUCCESS);
			goto('/admin/newsadmin');
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

	const saveNewItem = async (newNewsItem: News) => {
		try {
			const thisNews: News | undefined = await newsFormService(
				newNewsItem,
				$selectedImage,
				$imageExists,
				$existingImageUrl
			);
			await addDoc(newsColRef, thisNews);
			pageHasUnsavedChanges = false;
			goto('/admin/newsadmin');
			EditModeStore.set('');
			notificationStore.addToast('success', Messages.SAVESUCCESS);
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
		resetImageselection();
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
		onCreateNew={saveNewItem}
		onSaveDraft={handleSaveDraft}
		onUnsavedChangesUpdate={handleUnsavedChangesUpdate}
		onCancel={handleCancel}
	/>
</div>

<ToastContainer />
