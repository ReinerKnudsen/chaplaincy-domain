import { EventStore } from '../stores/FormStore';

export function validateEmptyInput(formData) {
	let errObject = [];
	for (let field in formData.target) {
		if (field.required && field.value === '') {
			errObject.push(field.name);
		}
	}
	return errObject;
}

export function validateEventData() {
	const event = EventStore;
	let formErrors;

	console.log('Validating EventData');
	if (new Date(event.startdate) > new Date()) {
		formErrors.push({
			field: 'startdate',
			message: 'The start date cannot be in the past'
		});
	}
	if (new Date(event.enddate) < new Date(event.startdate)) {
		console.log('End Date is before Start Date');
		formErrors.push({
			field: 'enddate',
			message: 'The end date cannot be before the start date'
		});
	}
	if (
		new Date(event.startdate) === new Date(event.endddate) &&
		new Date(event.starttime) > new Date(event.endtime)
	) {
		formErrors.push({
			field: 'endtime',
			message: 'The end time cannot be before the start time'
		});
	}
	if (new Date(event.publishdate) < new Date(event.startdate)) {
		formErrors.push({
			field: 'publishdate',
			message: 'The publish date cannot be before the start date'
		});
	}

	if (
		new Date(event.publishdate) === new Date(event.startdate) &&
		new Date(event.publishtime) > new Date(event.starttime)
	) {
		formErrors.push({
			field: 'publishtime',
			message: 'The publish time cannot be before the start time'
		});
	}
	if (new Date(event.unpublishdate) < new Date(event.publishdate)) {
		formErrors.push({
			field: 'unpublishdate',
			message: 'The unpublish date cannot be before the publish date'
		});
	}
	if (
		new Date(event.unpublishdate) === new Date(event.publishdate) &&
		new Date(event.unpublishtime) < new Date(event.publishtime)
	) {
		formErrors.push({
			field: 'unpublishtime',
			message: 'The unpublish time cannot be before the publish time'
		});
	}
	console.log('FormErrors', formErrors);
	return formErrors;
}
