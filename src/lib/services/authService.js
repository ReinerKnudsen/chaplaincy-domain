// AuthService.js
import { auth } from '../firebaseConfig'; // Import Firebase auth instance
import { authStore, credentials } from '$lib/stores/AuthStore'; // Import the user store
import { signInWithEmailAndPassword } from 'firebase/auth';

// Function to sign in user with email and password
export async function signInExistingUser(email, password) {
	try {
		// Set loading state
		authStore.update((store) => ({ ...store, loading: true, error: null }));

		// Extract email and password from the user store
		// const { email, password } = credentials;
		console.log('Auth: ', auth);
		console.log('Credentials: ', email, password);

		// Sign in user with email and password
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const authenticatedUser = userCredential.user;
		console.log(authenticatedUser);

		// Update user store with authenticated user
		authStore.set({ ...authStore, user: authenticatedUser, loading: false, error: null });

		return authenticatedUser; // Return authenticated user
	} catch (error) {
		console.log('Error: ', error.message);
		authStore.update((store) => ({ ...store, loading: false, error: error.message }));
		throw error;
	}
}
