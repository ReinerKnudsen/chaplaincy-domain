import { getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { newsColRef, eventsColRef, documentsColRef } from '$lib/firebase/firebaseConfig';

let news;
let events;
let sheet;

export const load = async () => {
	await loadNews();
	await loadEvents();
	await loadWeeklySheet();
	console.log('Next weekly sheet: ', sheet);
	return { news, events, sheet };
};

const loadNews = async () => {
	if (!newsColRef) {
		news = [];
		return;
	}
	try {
		const q = query(newsColRef, orderBy('publishdate', 'desc'), limit(2));
		let snapshot = await getDocs(q);
		if (snapshot.empty) {
			news = [];
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
	if (!eventsColRef) {
		events = [];
		return;
	}
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
			events = [];
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

const loadWeeklySheet = async () => {
	const today = new Date().toISOString().split('T')[0];
	const q = query(documentsColRef, where('date', '>=', today));
	const querySnapshot = await getDocs(q);
	const documents = querySnapshot.docs.map((document) => ({
		id: document.id,
		...document.data(),
	}));
	sheet = documents.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
};
