<script lang="ts">
	import { goto } from '$app/navigation';

	import { updateDoc } from 'firebase/firestore';
	import { DocumentReference, type DocumentData } from 'firebase/firestore';
	
	import { selectedImage, imageExists, existingImageUrl } from '$lib/stores/ImageSelectionStore';
	import { selectedLocation, resetSelectedLocation } from '$lib/stores/LocationsStore';
	import { notificationStore } from '$lib/stores/notifications';
	import { type DomainEvent, EditMode, EditModeStore } from '$lib/stores/ObjectStore';
	
	import { validateEventData } from '$lib/services/validateForm';
	import { eventFormService } from '$lib/services/EventFormService';
	
	import EventForm from '$lib/components/EventForm.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

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

$inspect($selectedLocation)

	const handleCancel = () => {
		resetSelectedLocation();
		EditModeStore.set(EditMode.Empty);
		goto('/admin/eventsadmin');
	}

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
			resetSelectedLocation();
			notificationStore.addToast('success', 'Event updated successfully!');
			goto('/admin/eventsadmin');
		} catch (error) {
			notificationStore.addToast('error', 'Failed to update event. Please try again.');
			console.error('Error updating the event: ', error);
		}
	};
</script>

<div>
	<EventForm thisEvent={data.newEvent} onCancel={handleCancel} onUpdate={updateEvent} />
</div>

<ToastContainer />
