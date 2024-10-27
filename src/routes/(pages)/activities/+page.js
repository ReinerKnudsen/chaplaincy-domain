import { getDocs, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { eventsColRef } from '$lib/firebase/firebaseConfig';

export const load = async () => {
	let events = [];
	const dateNow = new Date();
	const q = query(
		eventsColRef,
		where('publishDateTime', '<', Timestamp.fromDate(dateNow)),
		where('unpublishDateTime', '>', Timestamp.fromDate(dateNow)),
		orderBy('startdate', 'asc'),
	);
	let snapshot = await getDocs(q);
	if (snapshot.empty) {
		events = [];
	} else {
		events = snapshot.docs.map((item) => {
			return {
				id: item.id,
				data: item.data(),
			};
		});
	}
	return { events };
};
