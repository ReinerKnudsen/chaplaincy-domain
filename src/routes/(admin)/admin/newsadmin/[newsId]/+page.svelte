<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import { loadItem, CollectionType, NewsStore, type News } from '$lib/stores/ObjectStore';
	import NewsForm from '$lib/components/NewsForm.svelte';
	import { updateDoc, DocumentReference, type DocumentData } from 'firebase/firestore';

	let currentDocRef: DocumentReference | null = null;

	/**
	 * TODO: Report completion or error
	 */
	onMount(async () => {
		currentDocRef = await loadItem(page.params.newsId, CollectionType.News);
	});

	const updateNews = async (updatedNews: News) => {
		if (!currentDocRef) {
			throw new Error('Document reference not initialized');
		}
		// Convert to plain object for Firestore
		const newsData = { ...updatedNews } as DocumentData;
		await updateDoc(currentDocRef, newsData);
	};
</script>

<div>
	{#if $NewsStore}
		<NewsForm thisItem={$NewsStore} onUpdate={updateNews} />
	{:else}
		<p>Loading news item...</p>
	{/if}
</div>
