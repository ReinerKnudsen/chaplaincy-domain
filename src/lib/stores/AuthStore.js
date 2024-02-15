import { writable } from 'svelte/store';

// Define initial authentication state
const initialAuthState = {
	user: null, // User object (null if not authenticated)
	loading: false, // Loading state indicator
	error: null // Error message (if any)
};

// Create writable store for authentication state
export const authStore = writable(initialAuthState);

export const unloadUser = () => {
	authStore.set(initialAuthState);
	isLoggedIn.set(false);
	credentials.set({ email: null, password: null });
};

export const credentials = writable({
	email: null,
	password: null
});

export const isLoggedIn = writable(false);
