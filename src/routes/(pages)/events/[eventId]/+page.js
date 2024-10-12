import { doc, getDoc } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

export async function load({ params }) {
	const eventId = params.eventId;
	try {
		const docRef = doc(database, 'events', eventId);
		const docSnapshot = await getDoc(docRef);
		if (docSnapshot.exists()) {
			const thisEvent = docSnapshot.data();
			return { thisEvent, docRef };
		} else {
			console.log('Could not load event document!');
		}
	} catch (err) {
		console.log('Error while loading event:', err);
	}
}
