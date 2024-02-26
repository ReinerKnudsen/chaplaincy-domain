import { getDocs } from 'firebase/firestore';
import { eventsColRef } from '$lib/firebase/firebaseConfig';

export const load = async () => {
	let snapshot = await getDocs(eventsColRef);
	let events = snapshot.docs.map((events) => events.data());
	return { events };
};
