import { doc, getDoc } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

export async function load({ params }) {
	const eventId = params.eventId;
	try {
		const docRef = doc(database, 'events', eventId);
		const docSnapshot = await getDoc(docRef);
		if (docSnapshot.exists()) {
			const newEvent = docSnapshot.data();
			return { newEvent, docRef };
		} else {
			console.log('Error: Document does not exist!)');
		}
	} catch (err) {
		console.log('Error while loading event:', err);
	}
}
