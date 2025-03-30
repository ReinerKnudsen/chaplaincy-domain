import { functions, auth, database } from '../firebase/firebaseConfig';
import { authStore, unloadAuthStore } from '$lib/stores/AuthStore';
import { doc, setDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

export interface UserData {
	email: string;
	displayName: string;
	role?: string;
	firstname?: string;
	lastname?: string;
}

export interface CustomClaims {
	role?: string;
	[key: string]: string | undefined;
}

export interface FirebaseUser extends User {
	customClaims?: CustomClaims;
}

// List all users (only for admins)
const listAllUsersFunction = httpsCallable(functions, 'listUsers');

export const listAllUsers = async (): Promise<FirebaseUser[]> => {
	try {
		const result = await listAllUsersFunction();
		const users = result.data as FirebaseUser[];
		return users;
	} catch (error) {
		console.error('Error listing users:', error);
		return [];
	}
};

// Count Admin Users
export async function getCountOfAdmins(): Promise<number> {
	const countAdminUsers = httpsCallable(functions, 'getCountOfAdmins');
	const numberOfAdmins = await countAdminUsers();
	const count = numberOfAdmins.data as number;
	return count;
}

// Change user role
export async function changeUserRole(email: string, role: string): Promise<void> {
	const changeUserRoleFunction = httpsCallable(functions, 'changeUserRole');
	await changeUserRoleFunction({ email, role });
}

// Get user role
export async function getUserRole(user: User): Promise<string> {
	try {
		const token = await user.getIdTokenResult();
		return (token.claims.role as string) || '';
	} catch (error) {
		console.error('Error getting user role:', error);
		return '';
	}
}

// Create new user with email, displayName and role
export async function createNewUser(userData: UserData): Promise<void> {
	try {
		const docRef = doc(database, 'users', userData.email);
		await setDoc(docRef, {
			email: userData.email,
			displayName: userData.displayName,
			role: userData.role || 'user',
			firstname: userData.firstname || '',
			lastname: userData.lastname || '',
		});
	} catch (error) {
		console.error('Error creating new user:', error);
		throw error;
	}
}

// Sign in user with email and password
export async function signIn(email: string, password: string): Promise<void> {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		const role = await getUserRole(user);

		authStore.update((curr) => ({
			...curr,
			user,
			isLoggedIn: true,
			isLoading: false,
			error: null,
			name: user.displayName || 'no-name',
			role,
		}));
	} catch (error) {
		console.error('Error signing in:', error);
		throw error;
	}
}

// Register new user with email and password
export async function register(userData: UserData, password: string): Promise<void> {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, userData.email, password);
		const user = userCredential.user;

		await updateProfile(user, {
			displayName: userData.displayName,
		});

		await createNewUser(userData);

		const role = await getUserRole(user);
		authStore.update((curr) => ({
			...curr,
			user,
			isLoggedIn: true,
			isLoading: false,
			error: null,
			name: user.displayName || 'no-name',
			role,
		}));
	} catch (error) {
		console.error('Error registering user:', error);
		throw error;
	}
}

// Update user profile
export async function updateUserProfile(user: User): Promise<void> {
	try {
		await updateProfile(user, {
			displayName: user.displayName,
		});
	} catch (error) {
		console.error('Error updating user profile:', error);
		throw error;
	}
}

// Sign out user
export async function signOutUser(): Promise<void> {
	try {
		await auth.signOut();
		unloadAuthStore();
		sessionStorage.removeItem('accessToken');
	} catch (error) {
		console.error('Error signing out:', error);
		throw error;
	}
}

// Get current user
export function getCurrentUser(): User | null {
	return auth.currentUser;
}
