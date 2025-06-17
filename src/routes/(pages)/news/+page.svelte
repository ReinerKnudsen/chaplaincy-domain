<script lang="ts">
	import { run } from 'svelte/legacy';

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

	let loading = $state(true);
	let favNews: CollectionItem = $state();
	let newsItems: CollectionItem[] = $state();

	// Sort news items
	const sortKey = writable<NewsSortableFields>('publishdate'); // default sort key
	const sortDirection = writable<1 | -1>(-1); // default sort direction (ascending)
	const sortItems = writable<CollectionItem[]>([]); // Start empty



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
			'https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-prod.appspot.com/o/images%2Fheaders%2Fnews.jpg?alt=media&token=aa27a23c-2004-4f8b-be58-2930c5bbedff',
		title: 'News and Notices',
	};
	run(() => {
		if ($NewsItemsStore) {
			sortItems.set($NewsItemsStore.slice());
		}
	});
	run(() => {
		if ($sortKey || $sortDirection) {
			sortNews();
		}
	});
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
