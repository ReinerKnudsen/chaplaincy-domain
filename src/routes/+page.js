import { getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { newsColRef, eventsColRef } from '$lib/firebase/firebaseConfig';

let news;
export const load = async () => {
	try {
		const q = query(newsColRef, orderBy('publishdate', 'desc'), limit(2));
		let snapshot = await getDocs(q);
		news = snapshot.docs.map((item) => {
			return {
				id: item.id,
				data: item.data()
			};
		});
	} catch (err) {
		console.log('Error while loading news:', err);
	}

	const today = new Date();
	try {
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
	} catch (err) {
		console.log('Error while loading events:', err);
	}
};

/** Gib mal die enviroment variablen aus. */

let env = {
	APIKEY: import.meta.env.VITE_APIKEY,
	AUTHDOMAIN: import.meta.env.VITE_AUTHDOMAIN,
	PROJECTID: import.meta.env.VITE_PROJECTID,
	APPID: import.meta.env.VITE_APPID,
	BASE_URL: import.meta.env.VITE_BASE_URL
};

console.log(env);
