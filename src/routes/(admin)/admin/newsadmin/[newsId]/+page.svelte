<script lang="ts">
	import { updateDoc, type DocumentReference, type DocumentData } from 'firebase/firestore';
	import { type News, EditModeStore } from '$lib/stores/ObjectStore';
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
			const newsData = { ...updatedNews } as DocumentData;
			await updateDoc(data.docRef, newsData);
			EditModeStore.set('');
		} catch (error) {
			console.error('Error updating the news: ', error);
		}
	};
</script>

<div>
	<NewsForm thisNews={data.newsItem} onUpdate={updateNews} />
</div>
