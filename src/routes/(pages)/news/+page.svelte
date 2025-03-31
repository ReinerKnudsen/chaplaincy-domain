<script lang="ts">
	import { writable } from 'svelte/store';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import ItemCardFav from '$lib/components/ItemCardFav.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	import {
		NewsItemsStore,
		loadItems,
		type NewsSortableFields,
		CollectionType,
	} from '$lib/stores/ObjectStore.js';
	import { onMount } from 'svelte';

	$: favNews = $NewsItemsStore[0];
	$: newsItems = $NewsItemsStore ? $NewsItemsStore.slice(1) : []; // all news items except the first one
	let loading = true;

	const loadData = async () => {
		await loadItems(CollectionType.News);
	};

	onMount(async () => {
		await loadData();
		loading = false;
	});

	// Sort table items
	const sortKey = writable<NewsSortableFields>('publishdate'); // default sort key
	const sortDirection = writable<1 | -1>(-1); // default sort direction (ascending)
	const sortItems = writable($NewsItemsStore.slice()); // make a copy of the news array

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
		favNews = sorted[0];
	}

	const headerData = {
		photoName: 'Reiner Knudsen',
		photoUrl: 'https://unsplash.com/@reinerknudsen',
		imageUrl:
			'https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fnews.jpg?alt=media&token=c783cad1-946a-4a47-9917-56c24bb74872',
		title: 'News and Notices',
	};
</script>

<PageHeader {headerData} textStyle="white" />

{#if loading}
	loading...
{:else if $NewsItemsStore.length > 0}
	<div class=" flex flex-col">
		<ItemCardFav item={favNews} kind="news" />
		<div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
			{#each newsItems as newsItem}
				<ItemCard item={newsItem} kind="news" />
			{/each}
		</div>
	</div>
{:else}
	<div class="mt-10 font-semibold italic">Currently there are no published news.</div>
{/if}

<style>
</style>
