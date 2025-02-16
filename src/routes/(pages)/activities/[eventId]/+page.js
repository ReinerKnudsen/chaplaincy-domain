import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

export async function load({ params }) {
	const eventId = params.eventId;
	try {
		const docRef = doc(database, 'events', eventId);
		const docSnapshot = await getDoc(docRef);

		// Fetch all locations
		const locationSnapshot = await getDocs(collection(database, 'location'));
		const locations = {};
		locationSnapshot.forEach((doc) => {
			const data = doc.data();
			locations[doc.id] = `${data.name}, ${data.city}`;
		});

		if (docSnapshot.exists()) {
			const thisEvent = docSnapshot.data();
			return { thisEvent, docRef, locations };
		} else {
			console.log('Could not load event document!');
		}
	} catch (err) {
		console.log('Error while loading event:', err);
	}
}
