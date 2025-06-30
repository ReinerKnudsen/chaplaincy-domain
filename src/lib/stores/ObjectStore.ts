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
	Timestamp,
	where,
	limit,
	type DocumentReference,
} from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

export enum ItemState {
	DRAFT = 'draft',
	SCHEDULED = 'scheduled',
	PUBLIC = 'public',
	UNPUBLISHED = 'unpublished',
}

export interface CollectionItem {
	id: string;
	data: DocumentData;
}

export const setItemState = (item: DomainEvent | News, type: 'Event' | 'News') => {
	if (!item || !type) return;
	if (item.publishDateTime) {
		const publishDate = new Date(item.publishDateTime.seconds * 1000);
		if (publishDate <= new Date()) {
			item.state = ItemState.PUBLIC;
		} else {
			item.state = ItemState.SCHEDULED;
		}
	}
};

export interface DomainEvent {
	id: string | null;
	state: ItemState;
	title: string | null;
	subtitle?: string | null;
	description: string | null;
	slug: string | null;
	startdate: string | null;
	starttime: string | null;
	enddate: string | null;
	endtime: string | null;
	startDateTimeUtc?: string | null;
	endDateTimeUtc?: string | null;
	location: string | null;
	joinOnline?: boolean;
	condition?: string | null;
	publishdate: string | null;
	publishtime: string | null;
	publishDateTime: Timestamp;
	unpublishdate: string | null;
	unpublishtime: string | null;
	unpublishDateTime: Timestamp;
	comments?: string | null;
	image?: string | null;
	imageAlt?: string | null;
	imageCaption?: string | null;
	author: string | null;
	pdfFile?: string | null;
	pdfText?: string | null;
	tags?: string[];
}

export const initialDomainEvent: DomainEvent = {
	id: null,
	state: ItemState.DRAFT,
	title: null,
	subtitle: null,
	description: null,
	slug: null,
	startdate: null,
	starttime: null,
	startDateTimeUtc: null, // Add this for our new field
	enddate: null,
	endtime: null,
	endDateTimeUtc: null, // Add this for our new field
	location: null,
	joinOnline: false,
	condition: null,
	publishdate: null,
	publishDateTime: Timestamp.fromDate(new Date()),
	publishtime: null,
	unpublishdate: null,
	unpublishtime: null,
	unpublishDateTime: Timestamp.fromDate(new Date()),
	comments: null,
	image: null,
	imageAlt: null,
	imageCaption: null,
	author: null,
	pdfFile: null,
	pdfText: null,
	tags: [],
};

export type DomainEventSortableFields = keyof DomainEvent;

// News
export interface News {
	title: string | null;
	state: ItemState;
	text: string | null;
	slug: string | null;
	publishdate: string | null;
	publishtime: string | null;
	publishDateTime: Timestamp;
	comments: string | null;
	image?: string | null;
	imageAlt?: string | null;
	imageCaption?: string | null;
	author: string | null;
	pdfFile?: string | null;
	pdfText?: string | null;
	tags: string[];
}

export type NewsSortableFields = keyof News;

export const initialNews: News = {
	title: null,
	state: ItemState.DRAFT,
	text: null,
	slug: null,
	publishdate: null,
	publishtime: null,
	publishDateTime: Timestamp.fromDate(new Date()),
	tags: [],
	comments: null,
	image: null,
	imageAlt: null,
	author: null,
	imageCaption: null,
	pdfFile: null,
	pdfText: null,
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

export type User = {
	firstname: string;
	lastname: string;
	email: string;
	displayName: string;
	uid: string;
	role: string;
};

export const initUser: User = {
	firstname: '',
	lastname: '',
	email: '',
	displayName: '',
	uid: '',
	role: '',
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
export const EventStore: Writable<DomainEvent | null> = writable(initialDomainEvent);
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
	EventStore.set(initialDomainEvent);
}

export function resetNewsStore() {
	NewsStore.set(initialNews);
}

// Other collection or dcoument related items
export type EditMode = 'new' | 'update' | '';

export const EditMode = {
	New: 'new' as const,
	Update: 'update' as const,
	Empty: '' as const,
};

export const EditModeStore = writable<EditMode>('');
export function resetEditModeStore() {
	EditModeStore.set('');
}

// Collection and document related functions
// Load a single item by id and type
export const loadItem = async (id: string, type: CollectionType): Promise<DocumentReference | null> => {
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
				EventStore.set(item.data as DomainEvent);
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
		// Generate items array with doc.id and data
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
					const eventData = item.data as DomainEvent;
					const unpublishDate = new Date(eventData.unpublishdate);
					return unpublishDate > now;
				})
				.sort((a, b) => {
					const dateA = new Date((a.data as DomainEvent).startdate);
					const dateB = new Date((b.data as DomainEvent).startdate);
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
		const q = query(collection(database, 'documents'), where('type', '==', type), orderBy('date', 'desc'), limit(1));
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
		const q = query(collection(database, 'documents'), where('type', '==', type), orderBy('date', 'desc'));
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

export const duplicateItem = async (itemId: string, type: CollectionType): Promise<string | undefined> => {
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

export const createHashableString = (obj: any) => {
	const normalized = { ...obj };
	Object.keys(normalized).forEach((key) => {
		if (typeof normalized[key] === 'string') {
			normalized[key] = normalized[key].trim() || null;
		}
	});
	return JSON.stringify(normalized, Object.keys(normalized).sort());
};
