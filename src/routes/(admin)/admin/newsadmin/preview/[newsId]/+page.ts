import { doc, getDoc, type DocumentData } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

interface Params {
	newsId: string;
}

export async function load({
	params,
}: {
	params: Params;
}): Promise<{ newsItem: DocumentData | undefined; newsId: string | null }> {
	const newsId = params.newsId;
	try {
		const docRef = doc(database, 'news', newsId);
		const docSnapshot = await getDoc(docRef);
		if (docSnapshot.exists()) {
			const newsItem = docSnapshot.data();
			return { newsItem, newsId };
		} else {
			console.error('Error: Document does not exist!');
			return { newsItem: undefined, newsId };
		}
	} catch (err) {
		console.error('Error while loading news:', err);
		return { newsItem: undefined, newsId: null };
	}
}
