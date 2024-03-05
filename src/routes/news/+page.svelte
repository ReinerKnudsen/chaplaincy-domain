<script>
	import { writable } from 'svelte/store';
	import ItemCard from '../../lib/components/ItemCard.svelte';
	import ItemCardPortrait from '../../lib/components/ItemCardPortrait.svelte';

	export let data;
	let news = data.news;

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
	}
</script>

<h1>News in portrait</h1>
<div class="mr-10 grid grid-cols-3 gap-5">
	{#each $sortItems as newsItem}
		<ItemCardPortrait {newsItem} />
	{/each}
</div>
<hr class="my-10" />
<h1>News in landscape</h1>
<div class="mr-10 grid grid-cols-2 gap-5">
	{#each $sortItems as newsItem}
		<ItemCard {newsItem} />
	{/each}
</div>

<style>
</style>
