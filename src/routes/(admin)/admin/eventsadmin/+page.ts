import { getDocs, type QuerySnapshot, type DocumentData } from 'firebase/firestore';
import { eventsColRef } from '$lib/firebase/firebaseConfig';

interface EventItem {
    id: string;
    data: DocumentData;
}

export const load = async () => {
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(eventsColRef);
    const events: EventItem[] = snapshot.docs.map((event) => {
        return {
            id: event.id,
            data: event.data(),
        };
    });
    return { events };
};
