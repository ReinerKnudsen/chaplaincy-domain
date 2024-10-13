<script>
	import { page } from '$app/stores';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import ItemCardPortrait from '$lib/components/ItemCardPortrait.svelte';
	import ItemCardFav from '$lib/components/ItemCardFav.svelte';
	import { currentEvent } from '$lib/stores/EventStore';
	import { connectStorageEmulator } from 'firebase/storage';

	let thisEvent = $currentEvent;
</script>

<h1>Displaying event</h1>
<h2>Article in ItemCardFav</h2>

<div>
	<ItemCard item={thisEvent} kind="events" />
</div>
