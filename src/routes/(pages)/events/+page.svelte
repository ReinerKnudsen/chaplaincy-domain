<script lang="ts">
	import ItemCard from '$lib/components/ItemCard.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { FutureEventsStore, CollectionType, loadItems } from '$lib/stores/ObjectStore';
	import { onMount } from 'svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	let loading = $state(true);
	let events = $derived($FutureEventsStore);

	onMount(async () => {
		await loadItems(CollectionType.FutureEvents);
		loading = false;
	});

	const headerData = {
		title: 'Events',
		photoName: 'Gaurav Kumar',
		photoUrl: 'https://unsplash.com/@gkumar2175',
		imageUrl:
			'https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-prod.appspot.com/o/images%2Fheaders%2Fevents.jpeg?alt=media&token=b1232118-1e3b-44da-901d-4d1debdc6f6e',
	};
</script>

<PageHeader {headerData} textStyle="white" />

<p>Please find our upcoming events.</p>
<p>
	Make sure to join our mailing list if you want to receive reminders and more details in your
	inbox.
</p>

{#if loading}
	<div class="flex justify-center py-8">
		<Spinner />
	</div>
{:else if events.length > 0}
	<div class="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
		{#each events as event}
			<ItemCard item={event} kind="events" />
		{/each}
	</div>
{:else}
	<p class="py-8 text-center text-gray-600">No upcoming events at the moment. Check back soon!</p>
{/if}

<style>
</style>
