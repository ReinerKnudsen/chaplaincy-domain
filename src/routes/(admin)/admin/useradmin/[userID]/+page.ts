import { error } from '@sveltejs/kit';
import { getUserByID } from '$lib/services/authService';
import { getDoc, doc } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const user = await getUserByID(params.userID);
		if (!user) {
			throw error(404, 'User not found');
		}
		const docRef = doc(database, 'users', params.userID);
		const userDoc = await getDoc(docRef);
		const userDocData = userDoc.data();

		return { user, userDocData };
	} catch (err) {
		console.error('Error loading user:', err);
		throw error(500, 'Could not load user');
	}
};
