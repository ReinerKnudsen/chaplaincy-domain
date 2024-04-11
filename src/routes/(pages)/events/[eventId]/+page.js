import { doc, getDoc } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

export async function load({ params }) {
	const eventId = params.eventId;
	const docRef = doc(database, 'events', eventId);
	const docSnapshot = await getDoc(docRef);
	if (docSnapshot.exists()) {
		const thisEvent = docSnapshot.data();
		console.log(thisEvent);
		return { thisEvent, docRef };
	} else {
		console.log('No such document!');
	}
}
