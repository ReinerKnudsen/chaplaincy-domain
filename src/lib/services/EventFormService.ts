import { validateEventData, buildTimeStamp } from '$lib/services/validateForm';
import { existingImageData as data, selectedImage as image } from '$lib/stores/ImageSelectionStore';
import { get } from 'svelte/store';
import { Timestamp } from 'firebase/firestore';
import { type DomainEvent } from '$lib/stores/ObjectStore';
import { uploadImage, type ReturnType } from './fileService';
import { setItemState } from '$lib/stores/ObjectStore';

export const eventFormService = async (newEvent: DomainEvent) => {
	const existingImageData = get(data);
	const selectedImage = get(image);

	if (validateEventData(newEvent)) {
		return;
	}

	// Add calculated Date values
	// Set publish date to now if not defined
	if (!newEvent.publishdate) {
		newEvent.publishdate = new Date().toISOString().split('T')[0];
		const currentTime = new Date();
		newEvent.publishtime = currentTime.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
	}

	// Set publish time to 09:00 if not defined
	if (!newEvent.publishtime) newEvent.publishtime = '09:00';

	// set state for the event
	setItemState(newEvent, 'Event');

	// Set unpublish date and time to start date if not defined
	if (!newEvent.unpublishdate) {
		newEvent.unpublishdate = newEvent.enddate!;
		newEvent.unpublishtime = newEvent.endtime!;
	}

	// Ensure we have valid date strings before creating Date objects
	// Generate publishDateTime
	if (newEvent.publishdate && newEvent.publishtime) {
		const publishDateTime = buildTimeStamp(newEvent.publishdate, newEvent.publishtime);
		newEvent.publishDateTime = Timestamp.fromDate(publishDateTime);
	}
	// Generate unpublishDateTime
	if (newEvent.unpublishdate && newEvent.unpublishtime) {
		const unpublishDateTime = buildTimeStamp(newEvent.unpublishdate, newEvent.unpublishtime);
		newEvent.unpublishDateTime = Timestamp.fromDate(unpublishDateTime);
	}

	// Generate startDateTimeUtc
	if (newEvent.startdate && newEvent.starttime) {
		const startDateTime = buildTimeStamp(newEvent.startdate, newEvent.starttime);
		newEvent.startDateTimeUtc = startDateTime.toISOString();
	}
	// Generate endDateTimeUtc
	if (newEvent.enddate && newEvent.endtime) {
		const endDateTime = buildTimeStamp(newEvent.enddate, newEvent.endtime);
		newEvent.endDateTimeUtc = endDateTime.toISOString();
	}

	// Upload selected image
	if (selectedImage && !existingImageData) {
		// Validate that alt text is provided when uploading an image (accessibility requirement)
		if (!newEvent.imageAlt || newEvent.imageAlt.trim() === '') {
			throw new Error('Alt text is required when uploading an image for accessibility.');
		}

		const result: ReturnType = await uploadImage(selectedImage, newEvent.imageAlt, newEvent.imageCaption || '');
		newEvent.image = result.url;
		newEvent.imageRef = result.ref;
	} else {
		newEvent.image = existingImageData?.downloadUrl || null;
	}
	return newEvent;
};
