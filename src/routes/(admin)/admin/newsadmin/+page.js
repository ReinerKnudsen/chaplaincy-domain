import { getDocs } from 'firebase/firestore';
import { newsColRef } from '$lib/firebase/firebaseConfig';

export const load = async () => {
	let snapshot = await getDocs(newsColRef);
	let news = snapshot.docs.map((item) => {
		return {
			id: item.id,
			data: item.data()
		};
	});
	return { news };
};
