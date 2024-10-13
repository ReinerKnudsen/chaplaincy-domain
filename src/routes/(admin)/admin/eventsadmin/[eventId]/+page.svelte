<script>
	import EventForm from '$lib/components/EventForm.svelte';
	import { updateDoc } from 'firebase/firestore';
	import { connectStorageEmulator } from 'firebase/storage';
	import { page } from '$app/stores';
	import { currentEvent } from '$lib/stores/EventStore';
	export let data;

	const updateEvent = async (event) => {
		await updateDoc(data.docRef, event.detail);
	};

	let viewUrl = `${$page.url.href}/display`;
</script>

<div><a href={viewUrl}>View in different views</a></div>
<div>
	<EventForm thisEvent={data.newEvent} on:update={updateEvent} />
</div>
