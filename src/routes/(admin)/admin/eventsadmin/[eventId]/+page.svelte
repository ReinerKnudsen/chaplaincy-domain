<script lang="ts">
	import { updateDoc } from 'firebase/firestore';
	import { DocumentReference, type DocumentData } from 'firebase/firestore';
	import { type DomainEvent, EditMode, EditModeStore } from '$lib/stores/ObjectStore';
	import { notificationStore } from '$lib/stores/notifications';

	import EventForm from '$lib/components/EventForm.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import { goto } from '$app/navigation';
	import { validateEventData } from '$lib/services/validateForm';
	import { eventFormService } from '$lib/services/EventFormService';
	import { selectedImage, imageExists, existingImageUrl } from '$lib/stores/ImageSelectionStore';

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
			if (validateEventData(updatedEvent)) {
				return;
			}

			const thisEvent: DomainEvent | undefined = await eventFormService(
				updatedEvent,
				$selectedImage,
				$imageExists,
				$existingImageUrl
			);

			const eventData = { ...thisEvent } as DocumentData;
			await updateDoc(data.docRef, eventData);
			EditModeStore.set(EditMode.Empty);
			notificationStore.addToast('success', 'Event updated successfully!');
			goto('/admin/eventsadmin');
		} catch (error) {
			notificationStore.addToast('error', 'Failed to update event. Please try again.');
			console.error('Error updating the event: ', error);
		}
	};
</script>

<div>
	<EventForm thisEvent={data.newEvent} onUpdate={updateEvent} />
</div>

<ToastContainer />
