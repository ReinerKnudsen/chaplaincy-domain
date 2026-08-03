import { doc, getDoc, type DocumentReference } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';

interface Params {
	prayerId: string;
}

export async function load({ params }: { params: Params }) {
	const { prayerId } = params;
	const docRef = doc(database, 'prayers', prayerId);
	const snapshot = await getDoc(docRef);

	if (!snapshot.exists()) {
		return { prayer: undefined, docRef };
	}

	return {
		prayer: { id: snapshot.id, ...snapshot.data() },
		docRef: docRef as DocumentReference,
	};
}
