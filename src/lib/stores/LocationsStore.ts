import { writable } from 'svelte/store';
import { getDocs, collection } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

export interface Location {
	id: string;
	name: string;
	description: string;
	street: string;
	city: string;
	zip: string;
	locationUrl: string;
	online?: boolean;
}

// Location Store
// Define the initial state of the form
export const initialLocationState: Location = {
	id: '',
	name: '',
	description: '',
	street: '',
	city: '',
	zip: '',
	locationUrl: '',
	online: false,
};

const initialLocationsState: Location[] = [];

// Location related stores
export const AllLocations = writable<Location[]>(initialLocationsState);
export const CurrentLocation = writable<Location>(initialLocationState);
export const selectedLocation = writable<Location>(initialLocationState);

// Reset functions
export function resetAllLocations() {
	AllLocations.set(initialLocationsState);
}
export function resetCurrentLocation() {
	CurrentLocation.set(initialLocationState);
}
export function resetSelectedLocation() {
	selectedLocation.set(initialLocationState);
}

// Update functions
export function updateAndSortLocations(updateFn: (locations: Location[]) => Location[]) {
	AllLocations.update((locations) => {
		const updatedLocations = updateFn(locations);
		return updatedLocations.sort((a, b) => a.name.localeCompare(b.name));
	});
}

// Fetch locations from Firestore
export const fetchLocations = async (): Promise<void> => {
	const querySnapshot = await getDocs(collection(database, 'location'));
	const locs = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Location, 'id'>),
	}));
	locs.sort((a: Location, b: Location) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});
	AllLocations.set(locs);
};
