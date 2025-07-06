import { type DomainEvent } from '$lib/stores/ObjectStore';
import { notificationStore } from '$lib/stores/notifications';

export interface FormData {
	target: Record<string, { name: string; required: boolean; value: string }>;
}

export function validateEmptyInput(formData: FormData): string[] {
	if (!formData.target) {
		return [];
	}
	const errObject = [];
	for (const field in formData.target) {
		if (formData.target[field].required && formData.target[field].value === '') {
			errObject.push(formData.target[field].name);
		}
	}
	return errObject;
}

export const buildTimeStamp = (date: string, time: string): Date => {
	return new Date(`${date}T${time}Z`);
};

export function validateEventData(event: DomainEvent): boolean {
	if (!event) {
		throw new Error('Event could be found');
	}

	const { startdate, starttime, enddate, endtime, publishdate, publishtime, unpublishdate, unpublishtime } = event;

	const startDateTime = starttime && startdate && buildTimeStamp(startdate, starttime).getTime();
	const endDateTime = enddate && endtime && buildTimeStamp(enddate, endtime).getTime();
	const publishDateTime = publishdate && publishtime && buildTimeStamp(publishdate, publishtime).getTime();
	const unpublishDateTime = unpublishdate && unpublishtime && buildTimeStamp(unpublishdate, unpublishtime).getTime();

	let hasError = false;

	if (!startdate) {
		notificationStore.addToast('error', 'Mandatory start date is empty');
		hasError = true;
	} else if (!starttime) {
		notificationStore.addToast('error', 'Mandatory start time is empty');
		hasError = true;
	}
	console.log('Has error 1: ', hasError);

	if (!enddate) {
		notificationStore.addToast('error', 'Mandatory end date is empty');
		hasError = true;
	} else if (!endtime) {
		notificationStore.addToast('error', 'Mandatory end time is empty');
		hasError = true;
	}
	console.log('Has error 2: ', hasError);

	if (new Date(startdate) < new Date()) {
		notificationStore.addToast('error', 'The start date cannot be in the past');
		hasError = true;
	}
	console.log('Has error 3: ', hasError);
	if (startDateTime && endDateTime) {
		if (endDateTime < startDateTime) {
			notificationStore.addToast('error', 'The event end cannot be before the event start');
			hasError = true;
		} else if (endDateTime === startDateTime) {
			notificationStore.addToast('warning', 'Both start and end date-time are the same');
			hasError = true;
		}
	}
	console.log('Has error 4: ', hasError);
	if (startDateTime && publishDateTime && startDateTime < publishDateTime) {
		notificationStore.addToast('error', 'The publish date cannot be later than the start date');
		hasError = true;
	}
	console.log('Has error 5: ', hasError);
	if (unpublishDateTime && publishDateTime) {
		if (unpublishDateTime < publishDateTime) {
			notificationStore.addToast('error', 'The unpublish date cannot be earlier than the publish date');
			hasError = true;
		} else if (unpublishDateTime === publishDateTime) {
			notificationStore.addToast('warning', 'Both publish and unpublish date-time are the same.');
			hasError = true;
		}
	}
	console.log('Has error 6: ', hasError);
	return hasError;
}
