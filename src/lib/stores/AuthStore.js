import {
	createUserWithEmailAndPassword,
	updatePassword,
	signOut,
	sendPasswordResetEmail,
	updateEmail,
	signInWithEmailAndPassword
} from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '$lib/firebase/firebaseConfig';

// Define initial authentication state
const initialAuthState = {
	user: null, // User object (null if not authenticated)
	loading: false, // Loading state indicator
	error: null, // Error message (if any)
	isLoggedIn: false,
	role: '',
	firstname: '',
	lastname: ''
};

export const authStore = writable(initialAuthState);
export const unloadAuthStore = () => {
	authStore.set(initialAuthState);
};
export const unloadUser = () => {
	authStore.set(initialAuthState);
};

export const authHandlers = {
	login: async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	signup: async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
	},
	resetPassword: async (email) => {
		await sendPasswordResetEmail(auth, email);
	},
	updateEmail: async (email) => {
		await updateEmail(auth, email);
	},
	updatePassword: async (password) => {
		await updatePassword(auth, password);
	}
};
