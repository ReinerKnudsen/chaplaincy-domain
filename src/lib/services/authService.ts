import { functions, auth, database } from '../firebase/firebaseConfig';
import { authStore, unloadUser, unloadAuthStore } from '$lib/stores/AuthStore';
import { doc, setDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

export interface UserData {
	email: string;
	displayName: string;
	role?: string;
	firstname?: string;
	lastname?: string;
}

export interface AdminUserData {
	uid: string;
	email: string;
	displayName: string | null;
	emailVerified: boolean;
	disabled: boolean;
	metadata: {
		creationTime?: string;
		lastSignInTime?: string;
	};
	customClaims?: {
		role?: string;
	};
}

interface CreateUserResponse {
	uid: string;
	email: string;
}

// *****
// List all users (only for admins)
// *****

const listAllUsersFunction = httpsCallable<unknown, { users: AdminUserData[] }>(
	functions,
	'listUsers',
);
export const listAllUsers = async (): Promise<AdminUserData[]> => {
	try {
		const result = await listAllUsersFunction();
		return result.data.users;
	} catch (error: unknown) {
		console.error('Error listing users:', error);
		return [];
	}
};

// *****
// Count Admin Users
// *****
export async function countAdmins(): Promise<number> {
	const countAdminUsers = httpsCallable<unknown, { count: number }>(functions, 'getCountOfAdmins');
	try {
		const numberOfAdmins = await countAdminUsers();
		return numberOfAdmins.data.count;
	} catch (error: unknown) {
		console.error('Error counting admins:', error);
		return 0;
	}
}

// *****
// Change user role
// *****

export async function changeUserRole(email: string, role: string): Promise<void> {
	const changeUserRole = httpsCallable<{ email: string; role: string }, void>(
		functions,
		'changeUserRole',
	);
	await changeUserRole({ email, role });
}

// *****
// Get user by ID
// *****

export async function getUserByID(uid: string): Promise<User | null> {
	try {
		const getUserProfile = httpsCallable<{ uid: string }, { user: User }>(
			functions,
			'getUserProfile',
		);
		const result = await getUserProfile({ uid });
		if (!result?.data?.user) {
			return null;
		}
		return result.data.user;
	} catch (error: unknown) {
		console.error('Error:', error);
		return null;
	}
}

// *****
// Get user role
// *****

export async function getUserRole(user: User): Promise<string> {
	if (!user) {
		return '';
	}
	try {
		const idTokenResult = await user.getIdTokenResult();
		return (idTokenResult.claims.role as string) || '';
	} catch (error: unknown) {
		console.error('Error getting user role:', error);
		return '';
	}
}

// *****
// Create new with email, displayName and role
// *****

export async function createNewUser(userData: UserData): Promise<User | null> {
	try {
		const createUser = httpsCallable<UserData, CreateUserResponse>(functions, 'createUser');
		const newUser = await createUser(userData);
		if (!newUser?.data?.uid) {
			return null;
		}

		// Create user profile in Firestore
		try {
			const userDocRef = doc(database, 'users', newUser.data.uid);
			await setDoc(
				userDocRef,
				{
					firstname: userData.firstname || '',
					lastname: userData.lastname || '',
					email: userData.email,
					displayName: userData.displayName,
				},
				{ merge: true },
			);
		} catch (error: unknown) {
			console.error('Error creating user profile:', error);
		}

		const BASE_URL = import.meta.env.VITE_BASE_URL;
		const actionCodeSettings = {
			url: `${BASE_URL}/passwordreset`,
			handleCodeInApp: true,
		};

		if (newUser.data.email) {
			await sendPasswordResetEmail(auth, newUser.data.email, actionCodeSettings);
		}

		return getUserByID(newUser.data.uid);
	} catch (error: unknown) {
		console.error('Error creating user:', error);
		return null;
	}
}

// *****
// Sign in user with email and password
// *****

export async function signInExistingUser(email: string, password: string): Promise<User | null> {
	await unloadAuthStore();
	try {
		authStore.update((store) => ({ ...store, loading: true, error: null }));
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		if (!userCredential.user) {
			throw new Error('No user found after sign in');
		}
		const authenticatedUser = userCredential.user;
		const role = await getUserRole(authenticatedUser);
		const displayName = authenticatedUser.displayName || email;

		authStore.update((store) => ({
			...store,
			user: authenticatedUser,
			name: displayName,
			role: role,
			loading: false,
			error: null,
			isLoggedIn: true,
		}));
		return authenticatedUser;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error signing in:', error.message);
		}
		authStore.update((store) => ({
			...store,
			loading: false,
			error: error instanceof Error ? error.message : 'Unknown error',
			isLoggedIn: false,
		}));
		return null;
	}
}

// *****
// Register new user with email and password
// *****

export async function registerUser(userData: UserData, password?: string): Promise<User | null> {
	try {
		let authenticatedUser: User;
		if (password) {
			const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password);
			if (!userCredential.user) {
				throw new Error('No user found after registration');
			}
			authenticatedUser = userCredential.user;

			// We set the displayName in the user object
			try {
				const userDocRef = doc(database, 'users', authenticatedUser.uid);
				await setDoc(
					userDocRef,
					{
						firstname: userData.firstname || '',
						lastname: userData.lastname || '',
						email: userData.email,
						displayName: userData.displayName,
					},
					{ merge: true },
				);
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.error('Error creating user profile:', error.message);
				}
				throw error;
			}

			// Set custom claims for the user
			const role = userData.role || 'user';
			const setUserRole = httpsCallable<{ uid: string; role: string }, void>(
				functions,
				'setUserRole',
			);
			await setUserRole({
				uid: authenticatedUser.uid,
				role: role,
			});

			return authenticatedUser;
		}
		return null;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error during registration:', error.message);
		}
		authStore.update((store) => ({
			...store,
			loading: false,
			error: error instanceof Error ? error.message : 'Unknown error during registration',
			isLoggedIn: false,
		}));
		return null;
	}
}

// *****
// Update user profile
// *****

export async function updateUserProfile(userData: UserData): Promise<void> {
	try {
		const updateUserProfile = httpsCallable<UserData, void>(functions, 'updateUserProfile');
		await updateUserProfile(userData);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error: ', error.message);
			throw error;
		}
		throw new Error('An unknown error occurred');
	}
}

// *****
// Sign out user
// *****

export async function signOut(): Promise<void> {
	try {
		await auth.signOut();
		unloadUser();
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error: ', error.message);
		}
		authStore.update((store) => ({
			...store,
			error: 'Error signing out',
		}));
		throw error;
	}
}

// *****
// Get current user
// *****

export const getCurrentUser = () => {
	return auth.currentUser;
};

// *****
// Request password reset email
// *****

export const requestPasswordReset = async (email: string): Promise<void> => {
	try {
		await sendPasswordResetEmail(auth, email);
	} catch (error: unknown) {
		console.error('Error sending password reset email:', error);
		throw error;
	}
};
