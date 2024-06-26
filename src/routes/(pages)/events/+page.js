import { getDocs, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { eventsColRef } from '$lib/firebase/firebaseConfig';

export const load = async () => {
	const dateNow = new Date();
	const q = query(
		eventsColRef,
		where('publishDateTime', '<', Timestamp.fromDate(dateNow)),
		where('unpublishDateTime', '>', Timestamp.fromDate(dateNow)),
		orderBy('startdate', 'asc')
	);
	let snapshot = await getDocs(q);
	let events = snapshot.docs.map((item) => {
		return {
			id: item.id,
			data: item.data()
		};
	});
	return { events };
};
