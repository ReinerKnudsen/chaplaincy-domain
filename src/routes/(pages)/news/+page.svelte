<script>
	import { writable } from 'svelte/store';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import ItemCardPortrait from '$lib/components/ItemCardPortrait.svelte';
	import ItemCardFav from '$lib/components/ItemCardFav.svelte';

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
		console.log(favNews);
	}
</script>

<h1 class="mb-16 text-4xl font-semibold">News and notices</h1>
<div>
	<ItemCardFav newsItem={favNews} />
</div>
<div class=" grid grid-cols-2 gap-5">
	{#each newsItems as newsItem}
		<ItemCard item={newsItem} kind="news" />
	{/each}
</div>

<style>
</style>
