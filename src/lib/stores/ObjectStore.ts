import { writable, type Writable } from 'svelte/store';
import { type DocumentData, getDocs, collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

export interface CollectionItem {
	id: string;
	data: DocumentData;
}

export interface Event {
	title: string;
	subtitle: string;
	description: string;
	slug: string;
	startdate: string | null;
	starttime: string | null;
	enddate: string | null;
	endtime: string | null;
	location: string;
	condition?: string;
	publishdate: string | null;
	publishtime: string | null;
	publishDateTime: string | null;
	unpublishdate: string | null;
	unpublishtime: string | null;
	unpublishDateTime: string | null;
	comments: string;
	image?: string | null;
	imageAlt?: string;
	imageCaption?: string;
	author: string;
	pdfFile?: string;
	tags: string[];
}

export type EventSortableFields = keyof Event;

export interface News {
	title: string;
	text: string;
	slug: string;
	publishdate: string | null;
	publishtime: string | null;
	publishDateTime: string | null;
	comments: string;
	image: string | null;
	imageAlt?: string;
	imageCaption?: string;
	author: string;
	pdfFile?: string;
	tags: string[];
}

export type NewsSortableFields = keyof News;

const initialEvent: Event = {
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
	publishDateTime: null,
	publishtime: null,
	unpublishdate: null,
	unpublishtime: null,
	unpublishDateTime: null,
	comments: '',
	image: null,
	imageAlt: '',
	imageCaption: '',
	author: '',
	pdfFile: '',
	tags: [],
};

export const initialNews: News = {
	title: '',
	text: '',
	slug: '',
	publishdate: null,
	publishtime: null,
	publishDateTime: null,
	tags: [],
	comments: '',
	image: null,
	imageAlt: '',
	author: '',
	imageCaption: '',
	pdfFile: '',
};

export enum CollectionType {
	Events = 'events',
	News = 'news',
}

// Single item stores
export const EventStore: Writable<Event> = writable(initialEvent);
export const NewsStore: Writable<News> = writable(initialNews);

// Collection stores
export const EventsStore: Writable<CollectionItem[]> = writable([]);
export const NewsItemsStore: Writable<CollectionItem[]> = writable([]);

export function resetEventStore() {
	EventStore.set(initialEvent);
}

export function resetNewsStore() {
	NewsStore.set(initialNews);
}

export const EditMode = writable<'new' | 'update' | ''>('new');
export function resetEditMode() {
	EditMode.set('');
}

export const loadItems = async (type: CollectionType): Promise<CollectionItem[]> => {
	try {
		const snapshot = await getDocs(collection(database, type));
		const items = snapshot.docs.map((doc) => ({
			id: doc.id,
			data: doc.data(),
		}));
		// Always update the store, even with empty array
		if (type === CollectionType.Events) {
			EventsStore.set(items);
		} else if (type === CollectionType.News) {
			NewsItemsStore.set(items);
		}
		return items;
	} catch (error) {
		console.error(`Error loading ${type} items:`, error);
		return [];
	}
};

const removeDateFields = (data: DocumentData): DocumentData => {
	const newData = { ...data };
	for (const [key] of Object.entries(newData)) {
		// Check if field name contains 'date' or 'time' (case insensitive)
		if (
			key.toLowerCase().includes('date') ||
			key.toLowerCase().includes('time') ||
			key.toLowerCase().includes('datetime')
		) {
			newData[key] = null;
		}
	}
	return newData;
};

export const duplicateItem = async (
	itemId: string,
	type: CollectionType,
): Promise<string | undefined> => {
	try {
		const itemRef = doc(database, type, itemId);
		const item = await getDoc(itemRef);
		if (!item.exists()) {
			throw new Error('Item not found');
		}
		const newData = removeDateFields(item.data());
		const newDocRef = await addDoc(collection(database, type), newData);
		return newDocRef.id;
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
