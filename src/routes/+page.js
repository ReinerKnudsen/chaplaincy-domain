// import { getDocs, query, orderBy, limit, where } from 'firebase/firestore';
// import { onMount } from 'svelte';
// import { newsColRef, eventsColRef } from '$lib/firebase/firebaseConfig';

// console.log('Data load :', new Date());

// let news;
// export const load = async () => {
// 	try {
// 		const q = query(newsColRef, orderBy('publishdate', 'desc'), limit(2));
// 		let snapshot = await getDocs(q);
// 		if (snapshot.empty) {
// 			console.log('No matching documents.');
// 		} else {
// 			news = snapshot.docs.map((item) => {
// 				return {
// 					id: item.id,
// 					data: item.data()
// 				};
// 			});
// 		}
// 	} catch (err) {
// 		console.log('Error while loading news:', err);
// 	}

// 	const today = new Date();
// 	try {
// 		const a = query(
// 			eventsColRef,
// 			where('publishDateTime', '<', today),
// 			where('unpublishDateTime', '>', today),
// 			orderBy('publishDateTime', 'asc'),
// 			limit(2)
// 		);
// 		let snapshot2 = await getDocs(a);
// 		if (snapshot2.empty) {
// 			console.log('No matching documents.');
// 		} else {
// 			let events = snapshot2.docs.map((item) => {
// 				return {
// 					id: item.id,
// 					data: item.data()
// 				};
// 			});
// 			return { news, events };
// 		}
// 	} catch (err) {
// 		console.log('Error while loading events:', err);
// 	}
// };

// onMount(async () => {
// 	await load();
// });
