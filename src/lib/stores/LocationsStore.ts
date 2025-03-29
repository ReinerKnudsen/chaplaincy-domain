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
	openMapUrl: string;
}

// Define a store for holding all Locations
const initialLocationsState: Location[] = [];
export const AllLocations = writable(initialLocationsState);
export function resetAllLocations() {
	AllLocations.set(initialLocationsState);
}

// Location Store
// Define the initial state of the form
const initialLocationState: Location = {
	id: '',
	name: '',
	description: '',
	street: '',
	city: '',
	zip: '',
	openMapUrl: '',
};

export const CurrentLocation = writable(initialLocationState);

export function resetCurrentLocation() {
	CurrentLocation.set(initialLocationState);
}

export function updateAndSortLocations(updateFn: (locations: Location[]) => Location[]) {
	AllLocations.update((locations) => {
		const updatedLocations = updateFn(locations);
		return updatedLocations.sort((a, b) => a.name.localeCompare(b.name));
	});
}

export const selectedLocation = writable('');

// Fetch locations from Firestore
export const fetchLocations = async (): Promise<Location[]> => {
	const querySnapshot = await getDocs(collection(database, 'location'));
	const locs = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Location, 'id'>),
	}));
	return locs;
};
