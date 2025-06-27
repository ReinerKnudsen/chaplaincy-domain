<script lang="ts">

	import { updateDoc, type DocumentReference, type DocumentData } from 'firebase/firestore';

	import { type News, EditModeStore } from '$lib/stores/ObjectStore';
	import { selectedImage, imageExists, existingImageUrl } from '$lib/stores/ImageSelectionStore';
	
	import { newsFormService } from '$lib/services/NewsFormService';
	import { notificationStore } from '$lib/stores/notifications';

	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import NewsForm from '$lib/components/NewsForm.svelte';

	interface Props {
		data: {
			newsItem: News;
			docRef: DocumentReference;
		};
	}

	let { data }: Props = $props();



	const updateNews = async (updatedNews: News) => {
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
			notificationStore.addToast('success', 'News article updated successfully!');
		} catch (error) {
			notificationStore.addToast('error', 'Failed to update news article. Please try again.');
			console.error('Error updating the news: ', error);
		}
	};
</script>

<div>
	<NewsForm thisNews={data.newsItem} onUpdate={updateNews} />
</div>

<ToastContainer />
