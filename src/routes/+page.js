import { getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { newsColRef, eventsColRef } from '$lib/firebase/firebaseConfig';

export const load = async () => {
	const q = query(newsColRef, orderBy('publishdate', 'desc'), limit(2));
	let snapshot = await getDocs(q);
	let news = snapshot.docs.map((item) => {
		return {
			id: item.id,
			data: item.data()
		};
	});

	const today = new Date();
	const a = query(
		eventsColRef,
		where('publishDateTime', '<', today),
		where('unpublishDateTime', '>', today),
		orderBy('publishDateTime', 'asc'),
		limit(2)
	);
	let snapshot2 = await getDocs(a);
	let events = snapshot2.docs.map((item) => {
		return {
			id: item.id,
			data: item.data()
		};
	});
	return { news, events };
};
