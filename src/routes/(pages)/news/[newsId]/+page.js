import { doc, getDoc } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

export async function load({ params }) {
	const newsId = params.newsId;
	try {
		const docRef = doc(database, 'news', newsId);
		const docSnapshot = await getDoc(docRef);
		if (docSnapshot.exists()) {
			const thisItem = docSnapshot.data();
			return { thisItem, docRef };
		} else {
			console.log('Could not load news document!');
		}
	} catch (err) {
		console.log('Error while loading news:', err);
	}
}
