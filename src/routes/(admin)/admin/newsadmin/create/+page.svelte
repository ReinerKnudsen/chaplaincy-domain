<script lang="ts">
	import { goto } from '$app/navigation';

	import { addDoc } from 'firebase/firestore';
	import { newsColRef } from '$lib/firebase/firebaseConfig';

	import { type News, EditModeStore } from '$lib/stores/ObjectStore';;
	import {selectedImage, imageExists, existingImageUrl} from '$lib/stores/ImageSelectionStore';
	import { newsFormService } from '$lib/services/NewsFormService';

	import NewsForm from '$lib/components/NewsForm.svelte';
	import { notificationStore } from '$lib/stores/notifications';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

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
			notificationStore.addToast('success', 'News article created successfully!');
		} catch (error) {
			notificationStore.addToast('error', 'Failed to create news article. Please try again.');
			console.error('Error writing document:', error);
		}
	};
</script>

<div>
	<NewsForm onCreateNew={saveNewItem} />
</div>

<ToastContainer />