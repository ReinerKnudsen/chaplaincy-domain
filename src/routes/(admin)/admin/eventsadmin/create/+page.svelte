<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import { eventsColRef } from '$lib/firebase/firebaseConfig';
	import { addDoc } from 'firebase/firestore';

	//import { notificationStore } from '$lib/stores/notifications';
	import { EditMode, EditModeStore, type DomainEvent } from '$lib/stores/ObjectStore';
	import { selectedImage, imageExists, existingImageUrl, resetImageselection } from '$lib/stores/ImageSelectionStore';

	import { validateEventData, buildTimeStamp } from '$lib/services/validateForm';
	import { eventFormService } from '$lib/services/EventFormService';

	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import EventForm from '$lib/components/EventForm.svelte';
	import { notificationStore, TOAST_DURATION, Messages } from '$lib/stores/notifications';
	import { resetSelectedLocation } from '$lib/stores/LocationsStore';

	let pageHasUnsavedChanges = $state(false);

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
			notificationStore.addToast('success', Messages.SAVESUCCESS, TOAST_DURATION);
			resetImageselection();
			goto('/admin/eventsadmin');
		} catch (error) {
			notificationStore.addToast('error', Messages.SAVERROR);
			console.error('Error creating event: ', error);
		}
	};

	const saveDraft = async (thisEvent: DomainEvent) => {
		if (!thisEvent) return;
		try {
			await addDoc(eventsColRef, thisEvent);
			EditModeStore.set(EditMode.Empty);
			notificationStore.addToast('success', Messages.DRAFTSUCCESS, TOAST_DURATION);
			resetImageselection();
			goto('/admin/eventsadmin');
		} catch (error) {
			notificationStore.addToast('error', Messages.DRAFTERROR);
			console.error('Error creating event: ', error);
		}
	};

	const handleCancel = () => {
		EditModeStore.set(EditMode.Empty);
		resetSelectedLocation();
		goto('/admin/eventsadmin');
	};

	const handleUnsavedChangesUpdate = (formHasUnsavedChanges: boolean): void => {
		pageHasUnsavedChanges = formHasUnsavedChanges;
	};
	/**
	 * TODO: replcae dialog with the global modal (to be delivered)
	 */
	beforeNavigate(({ cancel }) => {
		if (pageHasUnsavedChanges) {
			if (!confirm('You have unsaved changes. Are you sure you want to leave this page?')) {
				cancel();
			}
		}
	});
</script>

<div>
	<EventForm
		onCreateNew={saveNewEvent}
		onCancel={handleCancel}
		onSaveDraft={saveDraft}
		onUnsavedChangesUpdate={handleUnsavedChangesUpdate}
	/>
</div>

<ToastContainer />
