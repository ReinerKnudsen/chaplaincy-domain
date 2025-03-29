<script lang="ts">
	import EventForm from '$lib/components/EventForm.svelte';
	import { updateDoc } from 'firebase/firestore';
	import { resetEditMode } from '$lib/stores/ObjectStore.js';
	import { DocumentReference } from 'firebase/firestore';
	import type { Event } from '$lib/stores/ObjectStore.js';

	type Params = {
		newEvent: Event;
		docRef: DocumentReference | null;
	};

	export let data: Params;

	const updateEvent = async (event: CustomEvent) => {
		try {
			if (!data.docRef) {
				throw new Error('No document reference provided');
			}
			await updateDoc(data.docRef, event.detail);
			resetEditMode();
		} catch (error) {
			console.log('Error updating the event: ', error);
		}
	};
</script>

<div>
	<EventForm thisEvent={data.newEvent} on:update={updateEvent} />
</div>
