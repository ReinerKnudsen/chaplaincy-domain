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

<div class="page-header mb-10">
	<div class="page-header-image grid h-[150px] grid-cols-1 items-center">
		<div class="page-title pl-10 text-5xl font-semibold text-white">News and Notices</div>
	</div>
	<div class="text-right text-sm">
		Image by: <a href="https://unsplash.com/@reinerknudsen" target="_blank">Reiner Knudsen</a>
	</div>
</div>

<div>
	<ItemCardFav newsItem={favNews} />
</div>
<div class=" grid grid-cols-2 gap-5">
	{#each newsItems as newsItem}
		<ItemCard item={newsItem} kind="news" />
	{/each}
</div>

<style>
	.page-header a {
		color: #2986cc;
		font-weight: 600;
	}

	.page-header-image {
		background-image: url('https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fnews.jpg?alt=media&token=c783cad1-946a-4a47-9917-56c24bb74872');
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		background-size: cover;
	}
</style>
