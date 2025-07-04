<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import { eventsColRef } from '$lib/firebase/firebaseConfig';
	import { addDoc } from 'firebase/firestore';

	import { EditMode, EditModeStore, type DomainEvent } from '$lib/stores/ObjectStore';
	import { notificationStore, TOAST_DURATION, Messages } from '$lib/stores/notifications';
	import { resetSelectedLocation } from '$lib/stores/LocationsStore';

	import { validateEventData, buildTimeStamp } from '$lib/services/validateForm';
	import { eventFormService, uploadEventImage, uploadNewPDF } from '$lib/services/EventFormService';

	import EventForm from '$lib/components/EventForm.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	let pageHasUnsavedChanges = $state(false);
	let showNavigateWarning = $state(false);

	beforeNavigate(({ cancel }) => {
		if (pageHasUnsavedChanges) {
			cancel();
			showNavigateWarning = true;
		}
	});

	const handleCancel = () => {
		EditModeStore.set(EditMode.Empty);
		pageHasUnsavedChanges = false;
		resetSelectedLocation();
		goto('/admin/eventsadmin');
	};

	const handleNavigateConfirm = () => {
		showNavigateWarning = false;
		pageHasUnsavedChanges = false;
		goto('/admin/eventsadmin');
	};

	const handleSaveDraft = async (thisEvent: DomainEvent, newImage?: File | null, newPDF?: File | null) => {
		if (!thisEvent) return;
		try {
			let draftEvent: DomainEvent = thisEvent;
			if (newImage) {
				draftEvent = await uploadEventImage(thisEvent, newImage);
			}

			if (newPDF) {
				const result = await uploadNewPDF(newPDF, 'documents');
				if (result) draftEvent = { ...thisEvent, pdfFile: result.url };
			}

			await addDoc(eventsColRef, draftEvent);
			EditModeStore.set(EditMode.Empty);
			resetSelectedLocation();
			pageHasUnsavedChanges = false;
			notificationStore.addToast('success', Messages.DRAFTSUCCESS, TOAST_DURATION);
			goto('/admin/eventsadmin');
		} catch (error) {
			notificationStore.addToast('error', Messages.DRAFTERROR);
			console.error('Error creating event: ', error);
		}
	};

	const handlesaveNewEvent = async (thisEvent: DomainEvent, newImage?: File | null, newPDF?: File | null) => {
		if (validateEventData(thisEvent) || !thisEvent) return;
		try {
			if (newImage) {
				thisEvent = await uploadEventImage(thisEvent, newImage);
			}
			if (newPDF) {
				console.log('I have a new PDF');
				const result = await uploadNewPDF(newPDF, 'documents');
				console.log(result);
				if (result) thisEvent = { ...thisEvent, pdfFile: result.url };
			}
			const updatedEvent = await eventFormService(thisEvent);
			await addDoc(eventsColRef, updatedEvent);
			EditModeStore.set(EditMode.Empty);
			resetSelectedLocation();
			pageHasUnsavedChanges = false;
			notificationStore.addToast('success', Messages.SAVESUCCESS, TOAST_DURATION);
			goto('/admin/eventsadmin');
		} catch (error) {
			notificationStore.addToast('error', Messages.SAVERROR);
			console.error('Error creating event: ', error);
		}
	};

	const handleUnsavedChangesUpdate = (formHasUnsavedChanges: boolean): void => {
		pageHasUnsavedChanges = formHasUnsavedChanges;
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
		onCreateNew={handlesaveNewEvent}
		onCancel={handleCancel}
		onSaveDraft={handleSaveDraft}
		onUnsavedChangesUpdate={handleUnsavedChangesUpdate}
	/>
</div>

<ToastContainer />
