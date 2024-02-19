// AuthService.js
import { auth, userColRef } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { authStore } from '$lib/stores/AuthStore'; // Import the user store
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, doc, setDoc } from 'firebase/firestore';

// Function to sign in user with email and password
export async function signInExistingUser(email, password) {
	try {
		// Set loading state
		authStore.update((store) => ({ ...store, loading: true, error: null }));

		// Sign in user with email and password
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const authenticatedUser = userCredential.user;
		console.log(userCredential);

		// Update user store with authenticated user
		authStore.set({ ...authStore, user: authenticatedUser, loading: false, error: null });

		return authenticatedUser; // Return authenticated user
	} catch (error) {
		console.log('Error: ', error.message);
		authStore.update((store) => ({ ...store, loading: false, error: error.message }));
		throw error;
	}
}

export async function registerUser(email, password, firstname, lastname, city) {
	try {
		// Set loading state
		authStore.update((store) => ({ ...store, loading: true, error: null }));

		// Register user with email and password
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const authenticatedUser = userCredential.user;
		const userID = userCredential.user.uid;
		console.log(userCredential);

		// Update user store with authenticated user
		authStore.set({ ...authStore, user: authenticatedUser, loading: false, error: null });

		try {
			const userDocRef = doc(userColRef, userID);
			console.log(userDocRef);

			await setDoc(userDocRef, {
				firstname: firstname,
				lastname: lastname,
				email: email,
				city: city
			});
			console.log('Document created ');
		} catch (e) {
			console.error('Error adding document: ', e);
		}

		return authenticatedUser; // Return authenticated user
	} catch (error) {
		console.log('Error: ', error.code);
		authStore.update((store) => ({ ...store, loading: false, error: error.message }));
		throw error;
	}
}
