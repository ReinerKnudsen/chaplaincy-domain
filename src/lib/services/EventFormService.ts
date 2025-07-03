import { Timestamp } from 'firebase/firestore';

import { type DomainEvent, setItemState } from '$lib/stores/ObjectStore';
import { uploadImage, type ReturnType } from './fileService';
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
