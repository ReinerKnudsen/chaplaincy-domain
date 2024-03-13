// AuthService.js
import { auth, userColRef } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { authStore, unloadUser, authUser, unloadAuthStore } from '$lib/stores/AuthStore'; // Import the user store
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Set User data from user document
const setUserData = async (snapshot) => {
	await authUser.set({
		firstname: snapshot.data().firstname,
		lastname: snapshot.data().lastname,
		displayname: snapshot.data().displayname,
		email: snapshot.data().email,
		role: snapshot.data().role,
		city: snapshot.data().city
	});
};

export async function getUserDoc(uid) {
	const userDocRef = doc(userColRef, uid);
	const snapshot = await getDoc(userDocRef);
	return snapshot.data();
}

// Function to sign in user with email and password
export async function signInExistingUser(email, password) {
	await unloadAuthStore();
	try {
		// Set loading state
		authStore.update((store) => ({ ...store, loading: true, error: null }));
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const authenticatedUser = userCredential.user;
		let data = await getUserDoc(authenticatedUser.uid);
		authStore.set({
			...authStore,
			user: authenticatedUser,
			loading: false,
			error: null,
			isLoggedIn: true,
			firstname: data.firstname,
			lastname: data.lastname,
			role: data.role,
			isEditor: data.role === 'editor' || data.role === 'admin'
		});
		return authenticatedUser;
	} catch (error) {
		authStore.update((store) => ({
			...store,
			loading: false,
			error: error.message,
			isLoggedIn: false,
			isEditor: false
		}));
		console.log('Error: ', error.message);
	}
}

// Register new user with email and password
export async function registerUser(password) {
	try {
		// Set loading state
		authStore.update((store) => ({ ...store, loading: true, error: null }));
		const userCredential = await createUserWithEmailAndPassword(auth, authUser.email, password);
		const authenticatedUser = userCredential.user;
		updateProfile(authenticatedUser, {
			displayName: authUser.displayName
		});
		authStore.set({
			...authStore,
			user: authenticatedUser,
			loading: false,
			error: null,
			isLoggedIn: true,
			isEditor: false,
			firstname: authUser.firstname,
			lastname: authUser.lastname,
			role: 'user'
		});
		try {
			const userDocRef = doc(userColRef, authenticatedUser.uid);
			await setDoc(userDocRef, {
				firstname: authUser.firstname,
				lastname: authUser.lastname,
				displayname: authUser.displayname,
				email: authUser.email,
				city: authUser.city,
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
			isLoggedIn: false,
			isEditor: false
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
			isLoggedIn: false,
			isEditor: false
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
