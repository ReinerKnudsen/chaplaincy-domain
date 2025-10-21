import { query, where, getDocs } from 'firebase/firestore';
import { documentsColRef } from '$lib/firebase/firebaseConfig';

export const load = async () => {
	const q = query(documentsColRef, where('type', '==', 'weeklysheet'));
	const querysnapshot = await getDocs(q);

	const documents = querysnapshot.docs.map((document) => ({
		id: document.id,
		...document.data(),
	}));
	return { documents };
};
