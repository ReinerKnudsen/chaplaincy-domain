import { Timestamp } from 'firebase/firestore';

import { type DomainEvent, setItemState } from '$lib/stores/ObjectStore';
import { uploadImage, uploadPDF, type ReturnType, type PDFType } from './fileService';
import { buildTimeStamp } from '$lib/services/validateForm';

export const eventFormService = async (newEvent: DomainEvent) => {
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

	return newEvent;
};

/**
 * Uploads a new image for an event and updates the event object with the resulting URL.
 *
 * If no new image is provided, the event object is returned unchanged.
 * Errors from the upload (Firebase failures, missing alt text, etc.) propagate
 * to the caller — they are not caught here.
 *
 * @param event - The event to attach the image to
 * @param newImage - The new image file to upload, or null if no image was selected
 * @returns The event object, updated with the new image URL if an image was uploaded
 * @throws Error if alt text is missing when an image is provided
 * @throws Any Firebase error that occurs during the upload
 */
export const uploadEventImage = async (event: DomainEvent, newImage: File | null): Promise<DomainEvent> => {
	if (!newImage) {
		return event;
	}

	if (!event.imageAlt || event.imageAlt.trim() === '') {
		throw new Error('Image alt text is required');
	}

	const result: ReturnType = await uploadImage(newImage, event.imageAlt, event.imageCaption || '');
	event.image = result.url;

	return event;
};

export const uploadNewPDF = async (newPDF: File | null, type: PDFType) => {
	let result: ReturnType | null = null;
	if (!newPDF) {
		return;
	}
	result = await uploadPDF(newPDF, type);
	if (result) return result;
};
