import { writable } from 'svelte/store';

// Define initial authentication state
const initialAuthState = {
	user: null, // User object (null if not authenticated)
	loading: false, // Loading state indicator
	error: null, // Error message (if any)
	isLoggedIn: false
};
export const authStore = writable(initialAuthState);

const initialAuthUserState = {
	firstname: '',
	lastname: '',
	displayname: '',
	email: '',
	role: '',
	city: '',
	isAdmin: false
};
// The authUser store holds the information of the authenticated user
export const authUser = writable(initialAuthUserState);

export const unloadUser = () => {
	authStore.set(initialAuthState);
	authUser.set(initialAuthUserState);
};
