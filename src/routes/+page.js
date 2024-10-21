import { getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { newsColRef, eventsColRef } from '$lib/firebase/firebaseConfig';

let news;
let events;

export const load = async () => {
	await loadNews();
	await loadEvents();

	return { news, events };
};

const loadNews = async () => {
	try {
		const q = query(newsColRef, orderBy('publishdate', 'desc'), limit(2));
		let snapshot = await getDocs(q);
		if (snapshot.empty) {
			console.log('No matching documents.');
		} else {
			news = snapshot.docs.map((item) => {
				return {
					id: item.id,
					data: item.data(),
				};
			});
		}
	} catch (err) {
		console.log('Error while loading news:', err);
	}
};

const loadEvents = async () => {
	const today = new Date();
	try {
		const a = query(
			eventsColRef,
			where('publishDateTime', '<', today),
			where('unpublishDateTime', '>', today),
			orderBy('startdate', 'asc'),
			limit(2),
		);
		let snapshot2 = await getDocs(a);
		if (snapshot2.empty) {
			console.log('No matching documents.');
		} else {
			events = snapshot2.docs.map((item) => {
				return {
					id: item.id,
					data: item.data(),
				};
			});
		}
	} catch (err) {
		console.log('Error while loading events:', err);
	}
};
