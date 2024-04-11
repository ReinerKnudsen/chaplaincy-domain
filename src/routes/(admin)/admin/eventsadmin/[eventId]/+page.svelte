<script>
	import EventForm from '$lib/components/EventForm.svelte';
	import { updateDoc } from 'firebase/firestore';
	export let data;

	const updateEvent = async (event) => {
		await updateDoc(data.docRef, event.detail);
		console.log('Event updated');
	};
</script>

<div>
	<EventForm thisEvent={data.newEvent} on:update={updateEvent} />
</div>
