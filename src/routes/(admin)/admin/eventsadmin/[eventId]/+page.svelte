<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';

	import { updateDoc } from 'firebase/firestore';
	import { DocumentReference, type DocumentData } from 'firebase/firestore';

	import { selectedImage, imageExists, existingImageUrl } from '$lib/stores/ImageSelectionStore';
	import { selectedLocation, resetSelectedLocation } from '$lib/stores/LocationsStore';
	import { notificationStore, TOAST_DURATION, Messages } from '$lib/stores/notifications';
	import { type DomainEvent, EditMode, EditModeStore } from '$lib/stores/ObjectStore';

	import { validateEventData } from '$lib/services/validateForm';
	import { eventFormService } from '$lib/services/EventFormService';

	import EventForm from '$lib/components/EventForm.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

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

	let showNavigateWarning = $state(false);

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
			notificationStore.addToast('success', Messages.UPDATESUCCESS, TOAST_DURATION);
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
			notificationStore.addToast('success', Messages.UPDATESUCCESS, TOAST_DURATION);
			goto('/admin/eventsadmin');
		} catch (error) {
			notificationStore.addToast('error', Messages.UPDATEERROR);
			console.error('Error updating the event: ', error);
		}
	};

	const handleUnsavedChangesUpdate = (formHasUnsavedChanges: boolean): void => {
		pageHasUnsavedChanges = formHasUnsavedChanges;
	};

	$inspect('Changes? ', pageHasUnsavedChanges);
	$inspect('Show warning? ', showNavigateWarning);

	beforeNavigate(({ cancel }) => {
		if (pageHasUnsavedChanges) {
			cancel();
			showNavigateWarning = true;
		}
	});

	const handleNavigateConfirm = () => {
		showNavigateWarning = false;
		pageHasUnsavedChanges = false;
		goto('/admin/eventsadmin');
	};
</script>

<ConfirmDialog
	open={showNavigateWarning}
	title="Unsaved Changes"
	message="You have unsaved changes. \nAre you sure you want to leave this page?"
	confirmText="Leave Page"
	cancelText="Stay on Page"
	confirmVariant="destructive"
	onConfirm={handleNavigateConfirm}
	onCancel={() => {
		showNavigateWarning = false;
	}}
/>

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
