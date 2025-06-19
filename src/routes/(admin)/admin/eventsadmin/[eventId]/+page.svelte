<script lang="ts">
	import { updateDoc } from 'firebase/firestore';
	import { DocumentReference, type DocumentData } from 'firebase/firestore';
	import { type DomainEvent, EditModeStore } from '$lib/stores/ObjectStore';

	import EventForm from '$lib/components/EventForm.svelte';

	type Params = {
		newEvent: DomainEvent;
		docRef: DocumentReference | null;
	};

	interface Props {
		data: Params;
	}

	let currentDocRef: DocumentReference | null = null;

	let { data }: Props = $props();
	currentDocRef = data.docRef;

	const updateEvent = async (updatedEvent: DomainEvent) => {
		try {
			if (!data.docRef) {
				throw new Error('No document reference provided');
			}
			if (!currentDocRef) {
				throw new Error('No document reference provided');
			}
			const eventData = { ...updatedEvent } as DocumentData;
			await updateDoc(data.docRef, eventData);
			EditModeStore.set('');
		} catch (error) {
			console.error('Error updating the event: ', error);
		}
	};
</script>

<div>
	<EventForm thisEvent={data.newEvent} onUpdate={updateEvent} />
</div>
