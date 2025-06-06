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
		type CollectionItem,
	} from '$lib/stores/ObjectStore.js';
	import { onMount } from 'svelte';

	let loading = true;
	let favNews: CollectionItem;
	let newsItems: CollectionItem[];

	// Sort news items
	const sortKey = writable<NewsSortableFields>('publishdate'); // default sort key
	const sortDirection = writable<1 | -1>(-1); // default sort direction (ascending)
	const sortItems = writable<CollectionItem[]>([]); // Start empty

	$: if ($NewsItemsStore) {
		sortItems.set($NewsItemsStore.slice());
	}

	$: if ($sortKey || $sortDirection) {
		sortNews();
	}

	const loadData = async () => {
		try {
			await loadItems(CollectionType.News);
		} catch (error) {
			console.error('Failed to load news items. ', error);
		}
	};

	const sortNews = async () => {
		try {
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
			newsItems = sorted.slice(1);
			favNews = sorted[0];
		} catch (error) {
			console.error('Error sorting the news items. ', error);
		}
	};

	onMount(async () => {
		await loadData();
		await sortNews();
		loading = false;
	});

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
