<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';

	import { updateDoc } from 'firebase/firestore';
	import { DocumentReference, type DocumentData } from 'firebase/firestore';

	import { resetSelectedLocation } from '$lib/stores/LocationsStore';
	import { notificationStore, TOAST_DURATION, Messages } from '$lib/stores/notifications';
	import { type DomainEvent, EditMode, EditModeStore } from '$lib/stores/ObjectStore';

	import { validateEventData } from '$lib/services/validateForm';
	import { eventFormService, uploadEventImage, uploadNewPDF } from '$lib/services/EventFormService';

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

	let { data }: Props = $props();
	let pageHasUnsavedChanges = $state(false);
	let currentDocRef: DocumentReference | null = data.docRef;
	let showNavigateWarning = $state(false);

	beforeNavigate(({ cancel }: any) => {
		if (pageHasUnsavedChanges) {
			cancel();
			showNavigateWarning = true;
		}
	});

	const handleCancel = () => {
		resetSelectedLocation();
		pageHasUnsavedChanges = false;
		EditModeStore.set(EditMode.Empty);
		goto('/admin/eventsadmin');
	};

	const handleSaveDraft = async (thisEvent: DomainEvent, newImage?: File | null, newPDF?: File | null) => {
		if (!thisEvent) return;
		try {
			if (!data.docRef) {
				throw new Error('No document reference provided');
			}
			if (newImage) {
				thisEvent = await uploadEventImage(thisEvent, newImage || null);
			}
			if (newPDF) {
				const result = await uploadNewPDF(newPDF, 'documents');
				if (result) thisEvent = { ...thisEvent, pdfFile: result.url, pdfName: result.ref.name };
			}
			const itemData = { ...thisEvent } as DocumentData;
			await updateDoc(data.docRef, itemData);
			EditModeStore.set('');
			resetSelectedLocation();
			pageHasUnsavedChanges = false;
			notificationStore.addToast('success', Messages.UPDATESUCCESS, TOAST_DURATION);
			goto('/admin/	newsadmin');
		} catch (error) {
			notificationStore.addToast('error', Messages.UPDATEERROR);
			console.error('Error updating the news: ', error);
		}
	};

	const handleUpdateEvent = async (thisEvent: DomainEvent, newImage?: File | null, newPDF?: File | null) => {
		if (validateEventData(thisEvent) || !thisEvent) return;
		try {
			if (!data.docRef) {
				throw new Error('No document reference provided');
			}
			if (!currentDocRef) {
				throw new Error('No document reference provided');
			}

			if (newImage) {
				thisEvent = await uploadEventImage(thisEvent, newImage);
			}
			if (newPDF) {
				const result = await uploadNewPDF(newPDF, 'documents');
				if (result) thisEvent = { ...thisEvent, pdfFile: result.url, pdfName: result.ref.name };
			}
			const updatedEvent: DomainEvent = await eventFormService(thisEvent);
			const eventData = { ...updatedEvent } as DocumentData;
			await updateDoc(data.docRef, eventData);
			EditModeStore.set(EditMode.Empty);
			resetSelectedLocation();
			pageHasUnsavedChanges = false;
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
		onUpdate={handleUpdateEvent}
		onSaveDraft={handleSaveDraft}
		onUnsavedChangesUpdate={handleUnsavedChangesUpdate}
	/>
</div>

<ToastContainer />
