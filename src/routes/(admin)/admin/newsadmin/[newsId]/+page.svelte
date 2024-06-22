<script>
	import NewsForm from '$lib/components/NewsForm.svelte';
	import { updateDoc } from 'firebase/firestore';
	export let data;

	const updateNews = async (event) => {
		let result = await updateDoc(data.docRef, event.detail);
	};
</script>

<div>
	<NewsForm thisItem={data.newsItem} on:update={updateNews} />
</div>
