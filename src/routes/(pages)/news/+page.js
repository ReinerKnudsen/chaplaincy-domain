import { getDocs, query, orderBy } from 'firebase/firestore';
import { newsColRef } from '$lib/firebase/firebaseConfig';

export const load = async () => {
	const q = query(newsColRef, orderBy('publishdate', 'desc'));
	let snapshot = await getDocs(q);
	let news = snapshot.docs.map((item) => {
		return {
			id: item.id,
			data: item.data()
		};
	});
	return { news };
};
