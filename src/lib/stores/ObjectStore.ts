import { writable, derived, type Writable } from 'svelte/store';
import {
	type DocumentData,
	getDocs,
	collection,
	doc,
	getDoc,
	addDoc,
	query,
	orderBy,
	where,
	limit,
	type DocumentReference,
} from 'firebase/firestore';
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
	startdate: string;
	starttime: string | null;
	enddate: string | null;
	endtime: string | null;
	location: string;
	condition?: string;
	publishdate: string;
	publishtime: string;
	publishDateTime: string;
	unpublishdate: string;
	unpublishtime: string;
	unpublishDateTime: string;
	comments: string;
	image?: string | null;
	imageAlt?: string;
	imageCaption?: string;
	author: string;
	pdfFile?: string;
	tags: string[];
}

export const initialEvent: Event = {
	title: '',
	subtitle: '',
	description: '',
	slug: '',
	startdate: '',
	starttime: null,
	enddate: null,
	endtime: null,
	location: '',
	condition: '',
	publishdate: '',
	publishDateTime: '',
	publishtime: '',
	unpublishdate: '',
	unpublishtime: '',
	unpublishDateTime: '',
	comments: '',
	image: null,
	imageAlt: '',
	imageCaption: '',
	author: '',
	pdfFile: '',
	tags: [],
};

export type EventSortableFields = keyof Event;

// News
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

// WeeklySheet
export interface WeeklySheet {
	date: string;
	name: string;
	path: string;
	id: string;
}

export type WeeklySheetSortableFields = keyof WeeklySheet;

export const initialWeeklySheet: WeeklySheet = {
	date: '',
	name: '',
	path: '',
	id: '',
};

// Newsletter
export interface Newsletter {
	date: string;
	path: string;
	id: string;
}

export type NewsletterSortableFields = keyof Newsletter;

export const initialNewsletter: Newsletter = {
	date: '',
	path: '',
	id: '',
};

export enum CollectionType {
	Events = 'events',
	News = 'news',
	FutureEvents = 'futureEvents', // Virtual collection type
}

export enum DocumentType {
	WeeklySheet = 'weeklysheet',
	Newsletter = 'newsletter',
}

// Single item stores
export const EventStore: Writable<Event | null> = writable(initialEvent);
export const NewsStore: Writable<News | null> = writable(initialNews);
export const WeeklySheetStore: Writable<WeeklySheet | null> = writable(null);
export const NewsletterStore: Writable<Newsletter | null> = writable(null);

// Collection and document stores
export const EventsStore: Writable<CollectionItem[] | null> = writable([]);
export const FutureEventsStore: Writable<CollectionItem[]> = writable([]);
export const NewsItemsStore: Writable<CollectionItem[]> = writable([]);
export const WeeklySheetsStore: Writable<CollectionItem[] | null> = writable([]);
export const NewslettersStore: Writable<CollectionItem[] | null> = writable([]);

// Derived stores for homepage previews
// The three latest news
export const LatestNewsStore = derived(NewsItemsStore, ($NewsItemsStore) => {
	return [...$NewsItemsStore] // Create a copy to avoid mutating the original
		.sort((a, b) => new Date(b.data.publishdate).getTime() - new Date(a.data.publishdate).getTime())
		.slice(0, 4);
});

// The three next events
export const NextEventsStore = derived(FutureEventsStore, ($FutureEventsStore) => {
	return $FutureEventsStore.slice(0, 4); // Already sorted by date in loadItems
});

export function resetEventStore() {
	EventStore.set(initialEvent);
}

export function resetNewsStore() {
	NewsStore.set(initialNews);
}

// Other collection or dcoument related items
export enum EditMode {
	New = 'new',
	Update = 'update',
}

export const EditModeStore = writable<'new' | 'update' | ''>('new');
export function resetEditModeStore() {
	EditModeStore.set('');
}

// Collection and document related functions
// Load a single item by id and type
export const loadItem = async (
	id: string,
	type: CollectionType,
): Promise<DocumentReference | null> => {
	try {
		const docRef = doc(database, type, id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const item = {
				id: docSnap.id,
				data: docSnap.data(),
			};

			// Set the appropriate store based on type
			if (type === CollectionType.Events) {
				EventStore.set(item.data as Event);
			} else if (type === CollectionType.News) {
				NewsStore.set(item.data as News);
			}
			return docRef;
		} else {
			console.error(`No ${type} found with id: ${id}`);
			// Reset the appropriate store
			if (type === CollectionType.Events) {
				resetEventStore();
			} else if (type === CollectionType.News) {
				resetNewsStore();
			}
			return null;
		}
	} catch (error) {
		console.error(`Error loading ${type} item:`, error);
		// Reset the appropriate store
		if (type === CollectionType.Events) {
			resetEventStore();
		} else if (type === CollectionType.News) {
			resetNewsStore();
		}
		return null;
	}
};

// load all items of a collection
export const loadItems = async (type: CollectionType): Promise<void> => {
	try {
		// For FutureEvents, we still query the events collection but filter the results
		const collectionPath = type === CollectionType.FutureEvents ? CollectionType.Events : type;
		const snapshot = await getDocs(collection(database, collectionPath));
		const items = snapshot.docs.map((doc) => ({
			id: doc.id,
			data: doc.data(),
		}));

		// Filter and store based on type
		if (type === CollectionType.Events) {
			EventsStore.set(items);
		} else if (type === CollectionType.News) {
			NewsItemsStore.set(items);
		} else if (type === CollectionType.FutureEvents) {
			const now = new Date();
			const futureEvents = items
				.filter((item) => {
					const eventData = item.data as Event;
					const eventDate = new Date(eventData.startdate);
					const publishDate = new Date(eventData.publishdate);
					const unpublishDate = new Date(eventData.unpublishdate);

					// Event must be:
					// 1. In the future or today
					// 2. Publish date has passed
					// 3. Unpublish date hasn't passed yet
					return eventDate >= now && publishDate <= now && unpublishDate > now;
				})
				.sort((a, b) => {
					const dateA = new Date((a.data as Event).startdate);
					const dateB = new Date((b.data as Event).startdate);
					return dateA.getTime() - dateB.getTime();
				});
			FutureEventsStore.set(futureEvents);
		}
	} catch (error) {
		console.error(`Error loading ${type} items:`, error);
		if (type === CollectionType.Events) {
			EventsStore.set([]);
		} else if (type === CollectionType.News) {
			NewsItemsStore.set([]);
		} else if (type === CollectionType.FutureEvents) {
			FutureEventsStore.set([]);
		}
	}
};

// load a single document
export const loadDocument = async (type: DocumentType): Promise<void> => {
	if (!collection(database, 'documents')) {
		if (type === DocumentType.WeeklySheet) {
			WeeklySheetStore.set(null);
		} else if (type === DocumentType.Newsletter) {
			NewsletterStore.set(null);
		}
		return;
	}
	try {
		const q = query(
			collection(database, 'documents'),
			where('type', '==', type),
			orderBy('date', 'desc'),
			limit(1),
		);
		const querySnapshot = await getDocs(q);
		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			if (type === DocumentType.WeeklySheet) {
				WeeklySheetStore.set({
					...(doc.data() as WeeklySheet),
					id: doc.id,
				});
			} else if (type === DocumentType.Newsletter) {
				NewsletterStore.set({
					...(doc.data() as Newsletter),
					id: doc.id,
				});
			}
		} else {
			if (type === DocumentType.WeeklySheet) {
				WeeklySheetStore.set(null);
			} else if (type === DocumentType.Newsletter) {
				NewsletterStore.set(null);
			}
		}
	} catch (error) {
		console.error(`Error loading ${type} document:`, error);
		if (type === DocumentType.WeeklySheet) {
			WeeklySheetStore.set(null);
		} else if (type === DocumentType.Newsletter) {
			NewsletterStore.set(null);
		}
	}
};

// load all documents of a DocumentType
export const loadDocuments = async (type: DocumentType) => {
	if (!collection(database, 'documents')) {
		if (type === DocumentType.WeeklySheet) {
			WeeklySheetsStore.set([]);
		} else if (type === DocumentType.Newsletter) {
			NewslettersStore.set([]);
		}
		return;
	}
	try {
		const q = query(
			collection(database, 'documents'),
			where('type', '==', type),
			orderBy('date', 'desc'),
		);
		const querySnapshot = await getDocs(q);
		if (!querySnapshot.empty) {
			const documents: CollectionItem[] = [];
			if (type === DocumentType.WeeklySheet) {
				querySnapshot.docs.forEach((doc) => {
					documents.push({
						id: doc.id,
						data: doc.data() as DocumentData,
					});
				});
				WeeklySheetsStore.set(documents);
			} else if (type === DocumentType.Newsletter) {
				querySnapshot.docs.forEach((doc) => {
					documents.push({
						id: doc.id,
						data: doc.data() as DocumentData,
					});
				});
				NewslettersStore.set(documents);
			}
		} else {
			if (type === DocumentType.WeeklySheet) {
				WeeklySheetsStore.set([]);
			} else if (type === DocumentType.Newsletter) {
				NewslettersStore.set([]);
			}
		}
	} catch (error) {
		console.error(`Error loading ${type} documents:`, error);
		if (type === DocumentType.WeeklySheet) {
			WeeklySheetsStore.set([]);
		} else if (type === DocumentType.Newsletter) {
			NewslettersStore.set([]);
		}
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
		console.error(error);
		return undefined;
	}
};
