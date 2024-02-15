import { writable } from 'svelte/store';

// Define the initial state of the form
const initialFormState = {
	title: '',
	subtitle: '',
	description: '',
	slug: '',
	startdate: null,
	starttime: null,
	enddate: null,
	endtime: null,
	location: '',
	condition: '',
	publishdate: null,
	publishtime: null,
	unpublishdate: null,
	unpublishtime: null,
	comments: ''
};

// Create a writable store with the initial state
export const FormStore = writable(initialFormState);

// Function to reset the form store to its initial state
export function resetForm() {
	FormStore.set(initialFormState);
}
