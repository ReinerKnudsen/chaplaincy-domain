<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { doc, updateDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig.js';
	import EventForm from '$lib/components/EventForm.svelte';

	const eventID = $page.params.eventId;
	const docRef = doc(database, 'events', eventID);

	const updateEvent = async (e) => {
		try {
			await updateDoc(docRef, e.detail);
		} catch (error) {
			console.error('Error updating document:', error);
		}
	};
</script>

<div>
	<EventForm {eventID} on:update={updateEvent} />
</div>
