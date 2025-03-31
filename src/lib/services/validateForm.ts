import { EventStore } from '$lib/stores/ObjectStore';
import { get } from 'svelte/store';

interface FormError {
	field: string;
	message: string;
}

interface FormData {
	target: Record<string, { name: string; required: boolean; value: string }>;
}

export function validateEmptyInput(formData: FormData): string[] {
	const errObject = [];
	for (const field in formData.target) {
		if (formData.target[field].required && formData.target[field].value === '') {
			errObject.push(formData.target[field].name);
		}
	}
	return errObject;
}

export function validateEventData(): FormError[] {
	const event = get(EventStore);
	const formErrors: FormError[] = [];

	if (event.startdate && new Date(event.startdate) > new Date()) {
		formErrors.push({
			field: 'startdate',
			message: 'The start date cannot be in the past',
		});
	}
	if (event.enddate && event.startdate && new Date(event.enddate) < new Date(event.startdate)) {
		formErrors.push({
			field: 'enddate',
			message: 'The end date cannot be before the start date',
		});
	}
	if (
		event.startdate &&
		event.enddate &&
		event.starttime &&
		event.endtime &&
		new Date(event.startdate) === new Date(event.enddate) &&
		new Date(event.starttime) > new Date(event.endtime)
	) {
		formErrors.push({
			field: 'endtime',
			message: 'The end time cannot be before the start time',
		});
	}
	if (
		event.publishdate &&
		event.startdate &&
		new Date(event.publishdate) < new Date(event.startdate)
	) {
		formErrors.push({
			field: 'publishdate',
			message: 'The publish date cannot be before the start date',
		});
	}
	if (
		event.publishdate &&
		event.startdate &&
		event.publishtime &&
		event.starttime &&
		new Date(event.publishdate) === new Date(event.startdate) &&
		new Date(event.publishtime) > new Date(event.starttime)
	) {
		formErrors.push({
			field: 'publishtime',
			message: 'The publish time cannot be before the start time',
		});
	}
	if (
		event.unpublishdate &&
		event.publishdate &&
		new Date(event.unpublishdate) < new Date(event.publishdate)
	) {
		formErrors.push({
			field: 'unpublishdate',
			message: 'The unpublish date cannot be before the publish date',
		});
	}
	if (
		event.unpublishdate &&
		event.publishdate &&
		event.unpublishtime &&
		event.publishtime &&
		new Date(event.unpublishdate) === new Date(event.publishdate) &&
		new Date(event.unpublishtime) < new Date(event.publishtime)
	) {
		formErrors.push({
			field: 'unpublishtime',
			message: 'The unpublish time cannot be before the publish time',
		});
	}
	return formErrors;
}
