import { writable } from 'svelte/store';

export const currentEvent = writable({});

export const loadedEvents = writable([]);
