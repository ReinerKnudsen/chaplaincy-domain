import { doc, getDoc, type DocumentData, type DocumentReference } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

interface Params {
	sheetId: string;
}

export async function load({
	params,
}: {
	params: Params;
}): Promise<{ sheetItem: DocumentData | undefined; docRef: DocumentReference | null }> {
	const sheetId = params.sheetId;
	try {
		const docRef = doc(database, 'documents', sheetId);
		const docSnapshot = await getDoc(docRef);
		if (docSnapshot.exists()) {
			const sheetItem = docSnapshot.data();
			return { sheetItem, docRef };
		} else {
			console.error('Error: Document does not exist!');
			return { sheetItem: undefined, docRef };
		}
	} catch (err) {
		console.error('Error while loading sheet:', err);
		return { sheetItem: undefined, docRef: null };
	}
}
