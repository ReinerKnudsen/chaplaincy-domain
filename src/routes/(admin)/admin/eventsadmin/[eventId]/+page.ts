import { doc, getDoc, type DocumentData, type DocumentReference } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

interface Params {
	eventId: string;
}

// Exports an event: Event and its docRef

export async function load({
	params,
}: {
	params: Params;
}): Promise<{ newEvent: DocumentData | undefined; docRef: DocumentReference | null }> {
	const eventId = params.eventId;
	try {
		const docRef = doc(database, 'events', eventId);
		const docSnapshot = await getDoc(docRef);
		if (docSnapshot.exists()) {
			const newEvent = docSnapshot.data();
			return { newEvent, docRef };
		} else {
			console.log('Error: Document does not exist!)');
			return { newEvent: undefined, docRef };
		}
	} catch (err) {
		console.log('Error while loading event:', err);
		return { newEvent: undefined, docRef: null };
	}
}
