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
	image: '',
	imagealt: '',
	author: '',
};

export const EventStore = writable(initialEventState);

export function resetEventStore() {
	EventStore.set(initialEventState);
	docRef.set('');
}

// News Store

// Define the initial state of the form
const initialNewsState = {
	title: '',
	text: '',
	slug: '',
	publishdate: null,
	publishtime: null,
	tags: [],
	image: '',
	imagealt: '',
	author: '',
};

export const NewsStore = writable(initialNewsState);

export function resetNewsStore() {
	NewsStore.set(initialNewsState);
	docRef.set('');
}

// We store the document ID if we are working on a existing document; otherwise the ide will be empty
export const docRef = writable('');
