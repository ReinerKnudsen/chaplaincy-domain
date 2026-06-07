import { Timestamp } from 'firebase/firestore';

import { type DomainEvent, setItemState } from '$lib/stores/ObjectStore';
import { uploadImage, uploadPDF, type ReturnType, type PDFType } from './fileService';
import { buildTimeStamp } from '$lib/services/validateForm';

export const eventFormService = async (newEvent: DomainEvent) => {
	// Add calculated Date values
	// Set publish date to now if not defined
	if (!newEvent.publishdate) {
		// Build the date and time strings using local date methods, NOT toISOString().
		// toISOString() returns a UTC string — for users west of UTC this can produce
		// yesterday's date after midnight local time (e.g. 23:00 CET = 22:00 UTC = previous day).
		// Using getFullYear/getMonth/getDate/getHours/getMinutes gives the correct local values.
		// NewsFormService.ts uses the same approach.
		const now = new Date();
		const pad = (n: number) => String(n).padStart(2, '0');
		newEvent.publishdate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
		newEvent.publishtime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
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

export const uploadEventImage = async (event: DomainEvent, newImage: File | null): Promise<DomainEvent> => {
	if (!newImage) {
		return event;
	}
	if (newImage) {
		if (!event.imageAlt || event.imageAlt.trim() === '') {
			throw new Error('Image alt text is required');
		}
		const result: ReturnType = await uploadImage(newImage, event.imageAlt, event.imageCaption || '');
		event.image = result.url;
	}
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
