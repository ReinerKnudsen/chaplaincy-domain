import { functions, auth, database } from '../firebase/firebaseConfig';
import { authStore, unloadUser, unloadAuthStore } from '$lib/stores/AuthStore';
import { doc, setDoc } from 'firebase/firestore';

import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

// *****************************************************************************************
// List all users (only for admins)
// *****************************************************************************************

const listAllUsersFunction = httpsCallable(functions, 'listUsers');
export const listAllUsers = async () => {
	try {
		const result = await listAllUsersFunction();
		return result.data.users;
	} catch (error) {
		console.error('Error listing users:', error);
	}
};

// *****************************************************************************************
// Count Admin Users
// *****************************************************************************************
export async function countAdmins() {
	let countAdminUsers = httpsCallable(functions, 'getCountOfAdmins');

	const numberOfAdmins = await countAdminUsers();
	console.log('countAdminUsers: ', numberOfAdmins.data);
	return numberOfAdmins.data;
}

// *****************************************************************************************
// Change user role
// *****************************************************************************************

export async function changeUserRole(email, role) {
	let changeUserRole = httpsCallable(functions, 'changeUserRole');

	let result = await changeUserRole({ email: email, role: role });
}

// *****************************************************************************************
// Get user by ID
// *****************************************************************************************

export async function getUserByID(uid) {
	try {
		let getUserProfile = httpsCallable(functions, 'getUserProfile');
		let result = await getUserProfile({ uid: uid });
		if (!result) {
			return null;
		} else {
			return result.data.user;
		}
	} catch (err) {
		console.log(err.message);
		throw err;
	}
}

// *****************************************************************************************
// Get user role
// *****************************************************************************************
export async function getUserRole(user) {
	if (user) {
		try {
			return user.getIdTokenResult().then((idTokenResult) => {
				return idTokenResult.claims.role;
			});
		} catch (error) {
			console.log('Error: user not logged indent', error.message);
		}
	} else {
		console.log('Error: must provide a user object');
		return null;
	}
}

// *****************************************************************************************
// Create new with email, displayName and role
// *****************************************************************************************
export async function createNewUser({ email, displayName, role, firstname, lastname }) {
	try {
		let createUser = httpsCallable(functions, 'createUser');
		const newUser = await createUser({ email, displayName, role });
		const uid = newUser.data.uid;

		// Create user profile in Firestore
		try {
			const userDocRef = doc(database, 'users', uid);
			await setDoc(
				userDocRef,
				{
					firstname: firstname,
					lastname: lastname,
					email: email,
					displayName: displayName,
				},
				{ merge: true },
			);
		} catch (error) {
			console.log('Error: ', error);
		}
		const BASE_URL = import.meta.env.VITE_BASE_URL;
		const actionCodeSettings = {
			url: `${BASE_URL}/passwordreset`,
			handleCodeInApp: true,
		};
		await sendPasswordResetEmail(auth, newUser.data.email, actionCodeSettings);
		return newUser;
	} catch (error) {
		console.log("Couldn't create user ", error);
	}
}

// *****************************************************************************************
// Sign in user with email and password
// *****************************************************************************************

export async function signInExistingUser(email, password) {
	await unloadAuthStore();
	try {
		authStore.update((store) => ({ ...store, loading: true, error: null }));
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		if (!userCredential.user) {
			return;
		}
		const authenticatedUser = userCredential.user;
		const role = await getUserRole(authenticatedUser);

		authStore.set({
			...authStore,
			user: authenticatedUser,
			name: authenticatedUser.displayName,
			loading: false,
			error: null,
			isLoggedIn: true,
			role: role,
		});
		return authenticatedUser;
	} catch (error) {
		authStore.update((store) => ({
			...store,
			loading: false,
			error: error.message,
			isLoggedIn: false,
		}));
		console.log('Error: ', error.message);
	}
}

// *****************************************************************************************
// Register new user with email and password
// *****************************************************************************************

export async function registerUser({ email, displayName, firstname, lastname, role }, password) {
	try {
		authStore.update((store) => ({ ...store, loading: true, error: null }));
		let authenticatedUser;
		if (password) {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			authenticatedUser = userCredential.user;

			// We set the displayName in the user object
			await updateProfile(authenticatedUser, {
				displayName: displayName,
			});

			// Set user role
			if (role) {
				await changeUserRole(authenticatedUser.uid, role);
			}
		}

		// Create user profile in Firestore
		try {
			const userDocRef = doc(database, 'users', authenticatedUser.uid);
			await setDoc(
				userDocRef,
				{
					firstname: firstname,
					lastname: lastname,
					email: email,
					displayName: displayName,
				},
				{ merge: true },
			);
		} catch (error) {
			console.log('Error: ', error.message);
		}

		authStore.set({
			...authStore,
			user: authenticatedUser,
			name: authenticatedUser.displayName,
			role: 'user',
			loading: false,
			error: null,
			isLoggedIn: true,
		});

		return authenticatedUser; // Return authenticated user
	} catch (error) {
		console.log('Error: ', error.code);
		authStore.update((store) => ({
			...store,
			loading: false,
			error: error.message,
			isLoggedIn: false,
		}));
		throw error;
	}
}

// *****************************************************************************************
// Update user profile
// *****************************************************************************************

export async function updateUserProfile(user) {
	// User = firstname, lastname, email, role
	try {
		let updateUserProfile = httpsCallable(functions, 'updateUserProfile');
		return await updateUserProfile(user)
			.then((result) => {
				return result;
			})
			.catch((err) => {
				console.log(err.message);
				throw err; // It's usually better to re-throw the error so it can be handled by the caller
			});
	} catch (error) {
		console.log('Error: ', error.message);
		throw error;
	}
}

// *****************************************************************************************
// Sign out user
// *****************************************************************************************

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
		}));
		throw error;
	}
}

// *****************************************************************************************
// Get current user
// *****************************************************************************************

export function getCurrentUser() {
	if (auth.currentUser) {
		return auth.currentUser;
	} else {
		return null;
	}
}
