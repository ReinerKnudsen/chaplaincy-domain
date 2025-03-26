import { getDocs, query, orderBy, limit, where, type QuerySnapshot, type DocumentData } from 'firebase/firestore';
import { database } from '$lib/firebase/firebaseConfig';
import { collection } from 'firebase/firestore';

const newsColRef = collection(database, 'news');
const eventsColRef = collection(database, 'events');
const documentsColRef = collection(database, 'documents');

let news: DocumentData[] = [];
let events: DocumentData[] = [];
let sheet: DocumentData | null = null;

export const load = async () => {
    await loadNews();
    await loadEvents();
    await loadWeeklySheet();
    return { news, events, sheet };
};

const loadNews = async () => {
    if (!newsColRef) {
        news = [];
        return;
    }
    try {
        const q = query(newsColRef, orderBy('publishdate', 'desc'), limit(2));
        const querySnapshot = await getDocs(q);
        news = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error loading news:', error);
        news = [];
    }
};

const loadEvents = async () => {
    if (!eventsColRef) {
        events = [];
        return;
    }
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const q = query(
            eventsColRef,
            where('date', '>=', today),
            orderBy('date', 'asc'),
            limit(2)
        );
        const querySnapshot = await getDocs(q);
        events = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error loading events:', error);
        events = [];
    }
};

const loadWeeklySheet = async () => {
    if (!documentsColRef) {
        sheet = null;
        return;
    }
    try {
        const q = query(documentsColRef, orderBy('date', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        sheet = querySnapshot.empty ? null : {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data()
        };
    } catch (error) {
        console.error('Error loading weekly sheet:', error);
        sheet = null;
    }
};
