import { doc, getDoc } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';
import { CollectionType } from '$lib/stores/ObjectStore';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { newsId } = params;

	try {
		const docRef = doc(database, CollectionType.News, newsId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const eventData = {
				id: docSnap.id,
				...docSnap.data(),
			};
			return {
				news: eventData,
				newsId,
			};
		} else {
			throw error(404, 'News item not found');
		}
	} catch (err) {
		console.error('Error loading news:', err);
		throw error(500, 'Failed to load news');
	}
}
