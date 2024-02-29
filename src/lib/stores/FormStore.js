import { writable } from 'svelte/store';

// Define the initial state of the form
const initialEventState = {
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
	comments: '',
	url: ''
};

// Create a writable store with the initial state
export const EventStore = writable(initialEventState);

// We store the document ID if we are working on a existing document; otherwise the ide will be empty
export const docRef = writable('');

// Function to reset the form store to its initial state
export function resetEventStore() {
	EventStore.set(initialEventState);
	docRef.set('');
}
