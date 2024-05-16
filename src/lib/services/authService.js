import { functions, auth } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { authStore, unloadUser, unloadAuthStore } from '$lib/stores/AuthStore'; // Import the user store
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

// *****************************************************************************************
// Set user role
// *****************************************************************************************

// Refactor: Only make available to admins
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
// Change user role
// *****************************************************************************************

// Refactor: Only make available to admins
export async function changeUserRole(email, role) {
	let addUserRole = httpsCallable(functions, 'addUserRole');
	console.log('Before role assignment: ', email, role);
	addUserRole({ email: email, role: role })
		.then((result) => {
			console.log('After role assignment: ', result);
		})
		.catch((err) => {
			console.log('Error: ', err.message);
		});
}

// *****************************************************************************************
// Get user by ID
// *****************************************************************************************

export async function getUserByID(uid) {
	try {
		let getUserProfile = httpsCallable(functions, 'getUserProfile');
		getUserProfile({ uid: uid })
			.then((result) => {
				return result;
			})
			.catch((err) => {
				console.log(err.message);
			});
	} catch (error) {
		console.log('Error: ', error.message);
		throw error;
	}
}

export async function getUserRole(user) {
	return user.getIdTokenResult().then((idTokenResult) => {
		return idTokenResult.claims.role;
	});
}

// *****************************************************************************************
// Sign in user with email and password
// *****************************************************************************************

export async function signInExistingUser(email, password) {
	await unloadAuthStore();
	try {
		authStore.update((store) => ({ ...store, loading: true, error: null }));
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const authenticatedUser = userCredential.user;
		const role = await getUserRole(authenticatedUser);

		authStore.set({
			...authStore,
			user: authenticatedUser,
			name: authenticatedUser.displayName,
			loading: false,
			error: null,
			isLoggedIn: true,
			role: role
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

// *****************************************************************************************
// Get all user profiles
// *****************************************************************************************

// Refactor: Only make available to admins
export async function getAllUsers() {
	let getAllUsers = httpsCallable(functions, 'getAllUsers');
	getAllUsers()
		.then((result) => {
			return result;
		})
		.catch((err) => {
			console.log(err.message);
		});
}

// *****************************************************************************************
// Register new user with email and password
// *****************************************************************************************

export async function registerUser(newUser, password) {
	try {
		authStore.update((store) => ({ ...store, loading: true, error: null }));

		const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, password);
		const authenticatedUser = userCredential.user;
		updateProfile(authenticatedUser, {
			displayName: newUser.firstname + ' ' + newUser.lastname
		});

		await setUserRole({ uid: authenticatedUser.uid, role: 'user' });
		authStore.set({
			...authStore,
			user: authenticatedUser,
			name: authenticatedUser.displayName,
			role: 'user',
			loading: false,
			error: null,
			isLoggedIn: true
		});

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

// *****************************************************************************************
// Update user profile
// *****************************************************************************************

export async function updateUserProfile(user) {
	try {
		// Set loading state
		authStore.update((store) => ({ ...store, loading: true, error: null }));

		const userCredential = await getUserByID(auth, user.uid);
		const authenticatedUser = userCredential.user;
		updateProfile(authenticatedUser, {
			displayName: user.firstname + ' ' + user.lastname
		});

		// set new user role
		await setUserRole({ uid: authenticatedUser.uid, role: 'user' });
		authStore.set({
			...authStore,
			user: authenticatedUser,
			name: authenticatedUser.displayName,
			role: 'user',
			loading: false,
			error: null,
			isLoggedIn: true
		});

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
			isLoggedIn: false
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
