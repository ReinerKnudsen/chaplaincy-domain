import { Timestamp } from 'firebase/firestore';

import { type DomainEvent, setItemState } from '$lib/stores/ObjectStore';
import { uploadImage, uploadPDF, type ReturnType, type PDFType } from './fileService';
import { buildTimeStamp } from '$lib/services/validateForm';

/**
 * Prepares an event object for saving to Firestore by computing all derived
 * Timestamp and ISO date fields from the user's raw date/time string inputs.
 *
 * Steps performed:
 * 1. If no publish date was entered, defaults to the current local date and time.
 * 2. If no publish time was entered, defaults to 09:00.
 * 3. Derives the item state (draft / scheduled / public / unpublished).
 * 4. If no unpublish date was entered AND the end date is available, copies the
 *    end date/time as the unpublish date/time.
 * 5. Converts all date+time string pairs into Firebase Timestamps and UTC ISO strings.
 *
 * @param newEvent - The event object with user-supplied date/time strings
 * @returns The same event object, mutated in place, with all Timestamp fields populated
 */
export const eventFormService = async (newEvent: DomainEvent) => {
	// Default publish date and time to the current local date and time if not provided.
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

	// Fall back to 09:00 if a publish date was entered but the time was left empty.
	if (!newEvent.publishtime) newEvent.publishtime = '09:00';

	// Derive and update the item state based on the current time vs publish/unpublish dates.
	setItemState(newEvent, 'Event');

	// Copy the end date/time into the unpublish fields when the editor has not set them
	// explicitly. Both enddate and endtime must be non-null — if either is missing we
	// leave unpublishdate null so the Timestamp generation below is simply skipped,
	// rather than passing null into buildTimeStamp and writing an Invalid Date to Firestore.
	if (!newEvent.unpublishdate && newEvent.enddate && newEvent.endtime) {
		newEvent.unpublishdate = newEvent.enddate;
		newEvent.unpublishtime = newEvent.endtime;
	}

	// Convert the publish date+time strings to a Firebase Timestamp.
	if (newEvent.publishdate && newEvent.publishtime) {
		const publishDateTime = buildTimeStamp(newEvent.publishdate, newEvent.publishtime);
		newEvent.publishDateTime = Timestamp.fromDate(publishDateTime);
	}

	// Convert the unpublish date+time strings to a Firebase Timestamp.
	if (newEvent.unpublishdate && newEvent.unpublishtime) {
		const unpublishDateTime = buildTimeStamp(newEvent.unpublishdate, newEvent.unpublishtime);
		newEvent.unpublishDateTime = Timestamp.fromDate(unpublishDateTime);
	}

	// Store start and end as UTC ISO strings for interoperability (e.g. calendar exports).
	if (newEvent.startdate && newEvent.starttime) {
		const startDateTime = buildTimeStamp(newEvent.startdate, newEvent.starttime);
		newEvent.startDateTimeUtc = startDateTime.toISOString();
	}

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
