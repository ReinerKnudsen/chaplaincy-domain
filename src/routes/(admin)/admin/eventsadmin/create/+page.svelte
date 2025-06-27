<script lang="ts">
	import { goto } from '$app/navigation';
	import { eventsColRef } from '$lib/firebase/firebaseConfig';
	import { addDoc } from 'firebase/firestore';

	//import { notificationStore } from '$lib/stores/notifications';
	import { EditMode, EditModeStore, type DomainEvent } from '$lib/stores/ObjectStore';
	import {
		selectedImage,
		imageExists,
		existingImageUrl,
		resetImageselection,
	} from '$lib/stores/ImageSelectionStore';

	import { validateEventData, buildTimeStamp } from '$lib/services/validateForm';
	import { eventFormService } from '$lib/services/EventFormService';

	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import EventForm from '$lib/components/EventForm.svelte';
	import { notificationStore } from '$lib/stores/notifications';

	const saveNewEvent = async (newEvent: DomainEvent) => {
		if (validateEventData(newEvent)) {
			return;
		}
		const thisEvent: DomainEvent | undefined = await eventFormService(
			newEvent,
			$selectedImage,
			$imageExists,
			$existingImageUrl
		);

		try {
			await addDoc(eventsColRef, thisEvent);
			EditModeStore.set(EditMode.Empty);
			notificationStore.addToast('success', 'Event created successfully!');
			resetImageselection();
			goto('/admin/eventsadmin');
		} catch (error) {
			notificationStore.addToast('error', 'Failed to create event. Please try again.');
			console.error('Error creating event: ', error);
		}
	};
</script>

<div>
	<EventForm onCreateNew={saveNewEvent} />
</div>

<ToastContainer />
