import { doc, getDoc } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';
import { CollectionType } from '$lib/stores/ObjectStore';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { eventId } = params;

	try {
		// Load the specific event
		const docRef = doc(database, CollectionType.Events, eventId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const eventData = {
				id: docSnap.id,
				...docSnap.data(),
			};

			return {
				event: eventData,
				eventId,
			};
		} else {
			// Event not found
			throw error(404, 'Event not found');
		}
	} catch (err) {
		console.error('Error loading event:', err);
		throw error(500, 'Failed to load event');
	}
}
