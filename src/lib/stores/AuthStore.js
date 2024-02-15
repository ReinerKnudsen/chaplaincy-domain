import { writable } from 'svelte/store';

// Define initial authentication state
const initialAuthState = {
	user: null, // User object (null if not authenticated)
	loading: false, // Loading state indicator
	error: null // Error message (if any)
};

export const credentials = writable({
	email: null,
	password: null
});

export const isLoggedIn = writable(false);

// Create writable store for authentication state
export const authStore = writable(initialAuthState);
