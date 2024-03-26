<script>
	import NewsForm from '$lib/components/NewsForm.svelte';
	import { updateDoc } from 'firebase/firestore';
	export let data;

	const updateNews = async (event) => {
		await updateDoc(data.docRef, event.detail);
		console.log('News updated');
	};
</script>

<div>
	<NewsForm thisItem={data.newsItem} on:update={updateNews} />
</div>
