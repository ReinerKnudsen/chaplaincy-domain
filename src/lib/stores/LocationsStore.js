import { writable } from 'svelte/store';

// Define a store for holding all Locations
const initialLocationsState = [];
export const LocationsStore = writable(initialLocationsState);
export function resetLocationsStore() {
	LocationsStore.set(initialLocationsState);
}

// Location Store
// Define the initial state of the form
const initialLocationState = {
	name: '',
	description: '',
	street: '',
	city: '',
	zip: '',
	openMapUrl: '',
};

export const LocationStore = writable(initialLocationState);

export function resetLocationStore() {
	LocationStore.set(initialLocationState);
}

export function updateAndSortLocations(updateFn) {
	LocationsStore.update((locations) => {
		const updatedLocations = updateFn(locations);
		return updatedLocations.sort((a, b) => a.data.name.localeCompare(b.data.name));
	});
}

export const selectedLocation = writable('');
