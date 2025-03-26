import { writable, type Writable } from 'svelte/store';

export interface EventState {
    title: string;
    subtitle: string;
    description: string;
    slug: string;
    startdate: string | null;
    starttime: string | null;
    enddate: string | null;
    endtime: string | null;
    location: string;
    condition: string;
    publishdate: string | null;
    publishtime: string | null;
    unpublishdate: string | null;
    unpublishtime: string | null;
    comments: string;
    image: string;
    imageAlt: string;
    author: string;
    pdfFile: string;
}

export interface NewsState {
    title: string;
    text: string;
    slug: string;
    publishdate: string | null;
    publishtime: string | null;
    tags: string[];
    image: string;
    imageAlt: string;
    imageCaption: string;
    author: string;
    pdfFile: string;
}

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
	imageAlt: '',
	author: '',
    pdfFile: '',
};

const initialNewsState = {
	title: '',
	text: '',
	slug: '',
	publishdate: null,
	publishtime: null,
	tags: [],
	image: '',
	imageAlt: '',
	author: '',
    imageCaption: '',
    pdfFile: '',
};

export const EventStore: Writable<EventState> = writable(initialEventState);
export const NewsStore: Writable<NewsState> = writable(initialNewsState);

export function resetEventStore() {
    EventStore.set(initialEventState);
}

export function resetNewsStore() {
    NewsStore.set(initialNewsState);
}

export const EditMode = writable<'new'|'update'|''>('new');
export function resetEditMode() {
    EditMode.set('');
}
    
