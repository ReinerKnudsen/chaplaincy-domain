// AuthService.js
import { auth, userColRef } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { authStore, authUser, unloadUser } from '$lib/stores/AuthStore'; // Import the user store
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Function to sign in user with email and password
export async function signInExistingUser(email, password) {
	try {
		// Set loading state
		authStore.update((store) => ({ ...store, loading: true, error: null }));

		// Sign in user with email and password
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const authenticatedUser = userCredential.user;
		const userDocRef = doc(userColRef, authenticatedUser.uid);
		// get the user role from the user document
		const snapshot = await getDoc(userDocRef);
		if (snapshot.exists()) {
			// set the authUser store with the authenticated user
			authUser.set({
				role: snapshot.data().role,
				name: snapshot.data().firstname
			});
		} else {
			console.log('No such document!');
		}

		// Update user store with authenticated user
		authStore.set({
			...authStore,
			user: authenticatedUser,
			loading: false,
			error: null,
			isLoggedIn: true
		});

		return authenticatedUser; // Return authenticated user
	} catch (error) {
		console.log('Error: ', error.message);
		authStore.update((store) => ({
			...store,
			loading: false,
			error: error.message,
			isLoggedIn: false
		}));
		throw error;
	}
}

// Register new user with email and password
export async function registerUser(email, password, firstname, lastname, city, displayName) {
	try {
		// Set loading state
		authStore.update((store) => ({ ...store, loading: true, error: null }));

		// Register user with email and password
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const authenticatedUser = userCredential.user;
		updateProfile(authenticatedUser, {
			displayName: displayName
		});

		// Update user store with authenticated user
		authStore.set({
			...authStore,
			user: authenticatedUser,
			loading: false,
			error: null,
			isLoggedIn: true
		});

		// Set the authUser store with the authenticated user
		authUser.set({
			role: 'user',
			name: firstname
		});

		// create user document in firestore
		try {
			const userDocRef = doc(userColRef, authenticatedUser.uid);
			await setDoc(userDocRef, {
				firstname: firstname,
				lastname: lastname,
				email: email,
				city: city,
				role: 'user'
			});
		} catch (e) {
			console.error('Error adding document: ', e);
		}
		return authenticatedUser; // Return authenticated user
	} catch (error) {
		console.log('Error: ', error.code);
		authStore.update((store) => ({
			...store,
			loading: false,
			error: error.message,
			isLoggedIn: false
		}));
		throw error;
	}
}

// sign out user
export function signOutUser() {
	try {
		auth.signOut();
		unloadUser();
	} catch (error) {
		console.log('Error: ', error.message);
		authStore.update((store) => ({
			...store,
			loading: false,
			error: error.message,
			isLoggedIn: false
		}));
		throw error;
	}
}

// get current user
export function getCurrentUser() {
	if (auth.currentUser) {
		return auth.currentUser;
	} else {
		return null;
	}
}
