import {
	createUserWithEmailAndPassword,
	updatePassword,
	signOut,
	sendPasswordResetEmail,
	updateEmail,
	signInWithEmailAndPassword,
	type User
} from 'firebase/auth';
import { writable, type Writable } from 'svelte/store';
import { auth } from '$lib/firebase/firebaseConfig';

export interface AuthState {
	user: User | null;
	loading: boolean;
	error: string | null;
	isLoggedIn: boolean;
	role: string;
	name: string;
}

// Define initial authentication state
const initialAuthState: AuthState = {
	user: null, // User object (null if not authenticated)
	loading: false, // Loading state indicator
	error: null, // Error message (if any)
	isLoggedIn: false,
	role: '',
	name: ''
};

export const authStore: Writable<AuthState> = writable(initialAuthState);

export const unloadAuthStore = (): void => {
	authStore.set(initialAuthState);
};

export const unloadUser = (): void => {
	authStore.set(initialAuthState);
};

export const authHandlers = {
	login: async (email: string, password: string): Promise<void> => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			authStore.set({ ...initialAuthState, user, isLoggedIn: true });
		} catch (error) {
			authStore.set({ ...initialAuthState, error: error.message });
		}
	},

	signup: async (email: string, password: string): Promise<void> => {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		authStore.set({ ...initialAuthState, user: userCredential.user, isLoggedIn: true });
	},

	logout: async (): Promise<void> => {
		await signOut(auth);
		authStore.set(initialAuthState);
	},

	resetPassword: async (email: string): Promise<void> => {
		await sendPasswordResetEmail(auth, email);
	},

	updateEmail: async (email: string): Promise<void> => {
		if (auth.currentUser) {
			await updateEmail(auth.currentUser, email);
		}
	},

	updatePassword: async (password: string): Promise<void> => {
		if (auth.currentUser) {
			await updatePassword(auth.currentUser, password);
		}
	}
};
