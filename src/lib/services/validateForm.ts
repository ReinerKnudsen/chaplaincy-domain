import { type DomainEvent } from '$lib/stores/ObjectStore';
import { notificationStore } from '$lib/stores/notifications';

export interface FormData {
	target: Record<string, { name: string; required: boolean; value: string }>;
}

/**
 * Checks all required fields in a form and returns the names of any that are empty.
 *
 * @param formData - The form data object containing field definitions and values
 * @returns An array of field names that are required but have no value; empty array if all fields are filled
 */
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

/**
 * Builds a Date object from separate date and time strings, interpreted as LOCAL time.
 *
 * IMPORTANT: The strings are joined with 'T' but WITHOUT a trailing 'Z' timezone suffix.
 * This is intentional — omitting 'Z' causes the browser to interpret the result as local
 * time rather than UTC. All user-facing date/time inputs in this app are in local time.
 *
 * @param date - A date string in 'YYYY-MM-DD' format
 * @param time - A time string in 'HH:MM' format
 * @returns A Date object representing the given date and time in the user's local timezone
 */
export const buildTimeStamp = (date: string, time: string): Date => {
	return new Date(`${date}T${time}`);
};

/**
 * Validates all date and time fields of an event and shows error toasts for any violations.
 *
 * Checks performed:
 * - Start date and time are present
 * - End date and time are present
 * - Start date is not in the past (date-level comparison: yesterday or earlier is rejected,
 *   today is allowed regardless of the current time of day)
 * - End date/time is not before or equal to start date/time
 * - Publish date is not later than the start date
 * - Unpublish date is not before or equal to the publish date
 *
 * @param event - The event object to validate
 * @returns true if any validation error was found (the event is NOT valid), false if all checks pass
 * @throws Error if the event object itself is null or undefined
 */
export function validateEventData(event: DomainEvent): boolean {
	if (!event) {
		throw new Error('Event could not be found');
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

	if (!enddate) {
		notificationStore.addToast('error', 'Mandatory end date is empty');
		hasError = true;
	} else if (!endtime) {
		notificationStore.addToast('error', 'Mandatory end time is empty');
		hasError = true;
	}

	// Compare the selected start date against midnight of today (not the current time).
	// Using new Date().toDateString() gives us 'Mon Jun 07 2026', which parses back to
	// midnight local time — the same representation used by new Date(startdate).
	// This means 'today' is always allowed, only dates before today are rejected.
	const todayAtMidnight = new Date(new Date().toDateString());
	if (startdate && new Date(startdate) < todayAtMidnight) {
		notificationStore.addToast('error', 'The start date cannot be in the past');
		hasError = true;
	}
	if (startDateTime && endDateTime) {
		if (endDateTime < startDateTime) {
			notificationStore.addToast('error', 'The event end cannot be before the event start');
			hasError = true;
		} else if (endDateTime === startDateTime) {
			notificationStore.addToast('warning', 'Both start and end date-time are the same');
			hasError = true;
		}
	}
	if (startDateTime && publishDateTime && startDateTime < publishDateTime) {
		notificationStore.addToast('error', 'The publish date cannot be later than the start date');
		hasError = true;
	}
	if (unpublishDateTime && publishDateTime) {
		if (unpublishDateTime < publishDateTime) {
			notificationStore.addToast('error', 'The unpublish date cannot be earlier than the publish date');
			hasError = true;
		} else if (unpublishDateTime === publishDateTime) {
			notificationStore.addToast('warning', 'Both publish and unpublish date-time are the same.');
			hasError = true;
		}
	}
	return hasError;
}
