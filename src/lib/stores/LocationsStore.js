import { writable } from 'svelte/store';

// Define a store for holding all Locations
const initialLocationsState = [];
export const AllLocations = writable(initialLocationsState);
export function resetAllLocations() {
	AllLocations.set(initialLocationsState);
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

export const CurrentLocation = writable(initialLocationState);

export function resetCurrentLocation() {
	CurrentLocation.set(initialLocationState);
}

export function updateAndSortLocations(updateFn) {
	AllLocations.update((locations) => {
		const updatedLocations = updateFn(locations);
		return updatedLocations.sort((a, b) => a.data.name.localeCompare(b.data.name));
	});
}

export const selectedLocation = writable('');
