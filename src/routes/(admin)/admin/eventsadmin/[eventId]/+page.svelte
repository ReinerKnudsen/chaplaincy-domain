<script lang="ts">
	import EventForm from '$lib/components/EventForm.svelte';
	import { updateDoc } from 'firebase/firestore';
	import { DocumentReference } from 'firebase/firestore';
	import { type DomainEvent, EditModeStore } from '$lib/stores/ObjectStore';

	type Params = {
		newEvent: DomainEvent;
		docRef: DocumentReference | null;
	};

	interface Props {
		data: Params;
	}

	let { data }: Props = $props();

	const updateEvent = async (event: CustomEvent) => {
		try {
			if (!data.docRef) {
				throw new Error('No document reference provided');
			}
			await updateDoc(data.docRef, event.detail);
			EditModeStore.set('');
		} catch (error) {
			console.error('Error updating the event: ', error);
		}
	};
</script>

<div>
	<EventForm thisEvent={data.newEvent} on:update={updateEvent} />
</div>
