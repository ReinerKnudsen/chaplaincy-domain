<script lang="ts">
	import { goto } from '$app/navigation';
	import { updateDoc, type DocumentReference, type DocumentData } from 'firebase/firestore';

	import { type News, EditModeStore } from '$lib/stores/ObjectStore';
	import { selectedImage, imageExists, existingImageUrl } from '$lib/stores/ImageSelectionStore';

	import { newsFormService } from '$lib/services/NewsFormService';
	import { notificationStore } from '$lib/stores/notifications';
	import { Messages } from '$lib/utils/messages';

	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import NewsForm from '$lib/components/NewsForm.svelte';

	interface Props {
		data: {
			newsItem: News;
			docRef: DocumentReference;
		};
	}

	let { data }: Props = $props();

	const handleCancel = () => {
		EditModeStore.set('');
		goto('/admin/newsadmin');
	};

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
			notificationStore.addToast('success', Messages.UPDATESUCCESS);
			goto('/admin/newsadmin');
		} catch (error) {
			notificationStore.addToast('error', Messages.UPDATEERROR);
			console.error('Error updating the news: ', error);
		}
	};

	const handleSaveDraft = async (thisNews: News) => {
		try {
			if (!data.docRef) {
				throw new Error('No document reference provided');
			}
			const newsData = { ...thisNews } as DocumentData;
			await updateDoc(data.docRef, newsData);
			EditModeStore.set('');
			notificationStore.addToast('success', Messages.UPDATESUCCESS);
			goto('/admin/newsadmin');
		} catch (error) {
			notificationStore.addToast('error', Messages.UPDATEERROR);
			console.error('Error updating the news: ', error);
		}
	};
</script>

<div>
	<NewsForm thisNews={data.newsItem} onUpdate={updateNews} onSaveDraft={handleSaveDraft} onCancel={handleCancel} />
</div>

<ToastContainer />
