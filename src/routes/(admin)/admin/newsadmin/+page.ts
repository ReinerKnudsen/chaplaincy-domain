import { getDocs, type QuerySnapshot, type DocumentData } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';
import { collection } from 'firebase/firestore';

interface NewsItem {
    id: string;
    data: DocumentData;
}

const newsColRef = collection(database, 'news');

export const load = async () => {
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(newsColRef);
    const news: NewsItem[] = snapshot.docs.map((item) => {
        return {
            id: item.id,
            data: item.data()
        };
    });
    return { news };
};
