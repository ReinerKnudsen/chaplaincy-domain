<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import { loadItem, CollectionType, NewsStore } from '$lib/stores/ObjectStore';
	import NewsForm from '$lib/components/NewsForm.svelte';
	import { updateDoc, DocumentReference } from 'firebase/firestore';

	let currentDocRef: DocumentReference | null = null;

	/**
	 * TODO: Report completion or error
	 */
	onMount(async () => {
		currentDocRef = await loadItem($page.params.newsId, CollectionType.News);
	});

	const updateNews = async (event: CustomEvent<Record<string, any>>) => {
		await updateDoc(currentDocRef!, event.detail);
	};
</script>

<div>
	<NewsForm thisItem={$NewsStore} on:update={updateNews} />
</div>
