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
	let favNews: CollectionItem | undefined = $state();
	let newsItems: CollectionItem[] = $state([]);

	// Sort news items
	const sortKey = writable<NewsSortableFields>('publishdate'); // default sort key
	const sortDirection = writable<1 | -1>(-1); // default sort direction (ascending)

	const loadData = async () => {
		try {
			await loadItems(CollectionType.News);
		} catch (error) {
			console.error('Failed to load news items. ', error);
		}
	};

	onMount(async () => {
		await loadData();
		loading = false;
	});

	const headerData = {
		photoName: 'Reiner Knudsen',
		photoUrl: 'https://unsplash.com/@reinerknudsen',
		imageUrl:
			'https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-prod.appspot.com/o/images%2Fheaders%2Fnews.jpg?alt=media&token=aa27a23c-2004-4f8b-be58-2930c5bbedff',
		title: 'News and Notices',
	};

	// Handle sorting and data updates in a single effect
	$effect(() => {
		if ($NewsItemsStore?.length) {
			// Create a new array to avoid mutations
			const sorted = [...$NewsItemsStore].sort((a, b) => {
				const aValue = String(a.data[$sortKey]);
				const bValue = String(b.data[$sortKey]);
				return $sortDirection === 1 ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
			});

			// Update the featured news and remaining items
			favNews = sorted[0];
			newsItems = sorted.slice(1);
		}
	});
</script>

<PageHeader {headerData} textStyle="white" />

{#if loading}
	loading...
{:else if $NewsItemsStore.length > 0}
	<div class=" flex flex-col">
		{#if favNews}
			<ItemCardFav item={favNews} kind="news" />
		{/if}
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
