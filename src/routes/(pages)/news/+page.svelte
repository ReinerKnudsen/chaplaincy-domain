<script>
	import { writable } from 'svelte/store';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import ItemCardFav from '$lib/components/ItemCardFav.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	export let data;
	let news = data.news;
	let favNews = news[0];
	let newsItems = news.slice(1);

	// Sort table items
	const sortKey = writable('publishdate'); // default sort key
	const sortDirection = writable(-1); // default sort direction (ascending)
	const sortItems = writable(news.slice()); // make a copy of the news array

	$: {
		const key = $sortKey;
		const direction = $sortDirection;
		const sorted = [...$sortItems].sort((a, b) => {
			// since the data sits deeper in the news object we must dig deeper here
			const aVal = a.data[key];
			const bVal = b.data[key];
			if (aVal < bVal) {
				return -direction;
			} else if (aVal > bVal) {
				return direction;
			}
			return 0;
		});
		sortItems.set(sorted);
		const favNews = sorted[0];
	}

	const headerData = {
		photoName: 'Reiner Knudsen',
		photoUrl: 'https://unsplash.com/@reinerknudsen',
		imageUrl:
			'https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fnews.jpg?alt=media&token=c783cad1-946a-4a47-9917-56c24bb74872',
		title: 'News and Notices'
	};
</script>

<PageHeader {headerData} textStyle="white" />

<div class=" flex flex-col">
	<ItemCardFav newsItem={favNews} />
	<div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
		{#each newsItems as newsItem}
			<ItemCard item={newsItem} kind="news" />
		{/each}
	</div>
</div>

<style>
</style>
