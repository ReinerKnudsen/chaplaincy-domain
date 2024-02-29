import { writable } from 'svelte/store';

// Define initial authentication state
const initialAuthState = {
	user: null, // User object (null if not authenticated)
	loading: false, // Loading state indicator
	error: null, // Error message (if any)
	isLoggedIn: false
};
export const authStore = writable(initialAuthState);

const initialUserState = {
	name: '',
	role: ''
};
export const authUser = writable(initialUserState);

export const unloadUser = () => {
	authStore.set(initialAuthState);
	authUser.set(initialUserState);
};
