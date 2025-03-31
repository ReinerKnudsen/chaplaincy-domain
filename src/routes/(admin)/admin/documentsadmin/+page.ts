import { getDocs, type QuerySnapshot, type DocumentData } from 'firebase/firestore';
import { documentsColRef } from '$lib/firebase/firebaseConfig';

interface DocumentItem {
    id: string;
    data: DocumentData;
}

export const load = async () => {
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(documentsColRef);
    const documents: DocumentItem[] = snapshot.docs.map((doc) => {
        return {
            id: doc.id,
            data: doc.data(),
        };
    });
    return { documents };
};
