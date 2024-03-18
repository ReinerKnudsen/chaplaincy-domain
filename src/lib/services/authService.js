import { functions, auth, userColRef } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { authStore, unloadUser, unloadAuthStore } from '$lib/stores/AuthStore'; // Import the user store
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

export async function setUserRole(uid, role) {
	let addUserRole = httpsCallable(functions, 'addUserRole');
	addUserRole({ uid: uid, role: role })
		.then((result) => {
			console.log('After role assignment: ', result);
		})
		.catch((err) => {
			console.log(err.message);
		});
}

export async function getUserRole(user) {
	return user.getIdTokenResult().then((idTokenResult) => {
		return idTokenResult.claims.role;
	});
}

export async function getUserDoc(uid) {
	const userDocRef = doc(userColRef, uid);
	const snapshot = await getDoc(userDocRef);
	return snapshot.data();
}

//
// Function to sign in user with email and password
//
export async function signInExistingUser(email, password) {
	await unloadAuthStore();
	try {
		// Set loading state
		authStore.update((store) => ({ ...store, loading: true, error: null }));
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const authenticatedUser = userCredential.user;
		const role = await getUserRole(authenticatedUser);
		// Open the related user doc and set the user data
		let data = await getUserDoc(authenticatedUser.uid);
		authStore.set({
			...authStore,
			user: authenticatedUser,
			loading: false,
			error: null,
			isLoggedIn: true,
			role: role,
			firstname: data.firstname,
			lastname: data.lastname
		});
		return authenticatedUser;
	} catch (error) {
		authStore.update((store) => ({
			...store,
			loading: false,
			error: error.message,
			isLoggedIn: false
		}));
		console.log('Error: ', error.message);
	}
}

//
// Register new user with email and password
//

export async function registerUser(newUser, password) {
	try {
		// Set loading state
		authStore.update((store) => ({ ...store, loading: true, error: null }));

		const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, password);
		const authenticatedUser = userCredential.user;
		updateProfile(authenticatedUser, {
			displayName: newUser.displayName
		});

		// set new user role
		await setUserRole({ uid: authenticatedUser.uid, role: 'user' });
		authStore.set({
			...authStore,
			user: authenticatedUser,
			loading: false,
			error: null,
			isLoggedIn: true,
			firstname: newUser.firstname,
			lastname: newUser.lastname
		});

		try {
			const userDocRef = doc(userColRef, authenticatedUser.uid);
			await setDoc(userDocRef, {
				firstname: newUser.firstname,
				lastname: newUser.lastname
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

//
// sign out user
//
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

//
// get current user
//
export function getCurrentUser() {
	if (auth.currentUser) {
		return auth.currentUser;
	} else {
		return null;
	}
}
