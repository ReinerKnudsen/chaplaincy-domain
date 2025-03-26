import { writable } from 'svelte/store';

export interface LocationItem {
	id: string;
    name: string;
    description: string;
	street: string;
	city: string;
	zip: string;
	openMapUrl: string;
};

// Define a store for holding all Locations
const initialLocationsState: LocationItem[] = [];
export const AllLocations = writable(initialLocationsState);
export function resetAllLocations() {
	AllLocations.set(initialLocationsState);
}

// Location Store
// Define the initial state of the form
const initialLocationState: LocationItem = {
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

export function updateAndSortLocations(updateFn: (locations: LocationItem[]) => LocationItem[]) {
    AllLocations.update((locations) => {
        const updatedLocations = updateFn(locations);
        return updatedLocations.sort((a, b) => a.name.localeCompare(b.name));
    });
}

export const selectedLocation = writable('');
