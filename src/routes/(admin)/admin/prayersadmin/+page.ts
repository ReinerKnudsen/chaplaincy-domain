import { getDocs, orderBy, query } from 'firebase/firestore';
import { prayersColRef } from '$lib/firebase/firebaseConfig';

export const load = async () => {
	const q = query(prayersColRef, orderBy('date', 'desc'));
	const snapshot = await getDocs(q);

	const prayers = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return { prayers };
};
