<script lang="ts">
	import EventForm from '$lib/components/EventForm.svelte';
	import { updateDoc } from 'firebase/firestore';
	import { DocumentReference } from 'firebase/firestore';
	import { type Event, EditModeStore } from '$lib/stores/ObjectStore';

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
			EditModeStore.set('');
		} catch (error) {
			console.log('Error updating the event: ', error);
		}
	};
</script>

<div>
	<EventForm thisEvent={data.newEvent} on:update={updateEvent} />
</div>
