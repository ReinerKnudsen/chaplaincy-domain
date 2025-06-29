<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';

	import { addDoc } from 'firebase/firestore';
	import { newsColRef } from '$lib/firebase/firebaseConfig';

	import { type News, EditModeStore } from '$lib/stores/ObjectStore';
	import { selectedImage, imageExists, existingImageUrl } from '$lib/stores/ImageSelectionStore';
	import { newsFormService } from '$lib/services/NewsFormService';
	import { Messages } from '$lib/utils/messages';

	import NewsForm from '$lib/components/NewsForm.svelte';
	import { notificationStore } from '$lib/stores/notifications';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	let pageHasUnsavedChanges = $state(false);

	const handleSaveDraft = async (newNewsItem: News) => {
		try {
			await addDoc(newsColRef, newNewsItem);
			EditModeStore.set('');
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
	/**
	 * TODO: replcae dialog with the global modal (to be delivered)
	 */
	beforeNavigate(({ cancel }) => {
		if (pageHasUnsavedChanges) {
			if (!confirm('You have unsaved changes. Are you sure you want to leave this page?')) {
				cancel();
			}
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
			goto('/admin/newsadmin');
			EditModeStore.set('');
			notificationStore.addToast('success', Messages.SAVESUCCESS);
		} catch (error) {
			notificationStore.addToast('error', Messages.SAVERROR);
			console.error('Error writing document:', error);
		}
	};
</script>

<div>
	<NewsForm
		onCreateNew={saveNewItem}
		onSaveDraft={handleSaveDraft}
		onUnsavedChangesUpdate={handleUnsavedChangesUpdate}
	/>
</div>

<ToastContainer />
