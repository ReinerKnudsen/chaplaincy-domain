<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';

	import { updateDoc } from 'firebase/firestore';
	import { DocumentReference, type DocumentData } from 'firebase/firestore';

	import { selectedImage, imageExists, existingImageUrl } from '$lib/stores/ImageSelectionStore';
	import { selectedLocation, resetSelectedLocation } from '$lib/stores/LocationsStore';
	import { notificationStore } from '$lib/stores/notifications';
	import { type DomainEvent, EditMode, EditModeStore } from '$lib/stores/ObjectStore';
	import { Messages } from '$lib/utils/messages';

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
	let pageHasUnsavedChanges = $state(false);
	currentDocRef = data.docRef;

	const handleCancel = () => {
		resetSelectedLocation();
		EditModeStore.set(EditMode.Empty);
		goto('/admin/eventsadmin');
	};

	const handleSaveDraft = async (thisEvent: DomainEvent) => {
		try {
			if (!data.docRef) {
				throw new Error('No document reference provided');
			}
			const itemData = { ...thisEvent } as DocumentData;
			await updateDoc(data.docRef, itemData);
			EditModeStore.set('');
			notificationStore.addToast('success', Messages.UPDATESUCCESS);
			goto('/admin/newsadmin');
		} catch (error) {
			notificationStore.addToast('error', Messages.UPDATEERROR);
			console.error('Error updating the news: ', error);
		}
	};

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
			notificationStore.addToast('success', Messages.UPDATESUCCESS);
			goto('/admin/eventsadmin');
		} catch (error) {
			notificationStore.addToast('error', Messages.UPDATEERROR);
			console.error('Error updating the event: ', error);
		}
	};

	function handleUnsavedChangesUpdate(formHasUnsavedChanges: boolean): void {
		pageHasUnsavedChanges = formHasUnsavedChanges;
	}

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
		thisEvent={data.newEvent}
		onCancel={handleCancel}
		onUpdate={updateEvent}
		onSaveDraft={handleSaveDraft}
		onUnsavedChangesUpdate={handleUnsavedChangesUpdate}
	/>
</div>

<ToastContainer />
