import { deleteApp, getApps, getApp, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
}

const firebaseConfig: FirebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_APPID,
};

export let firebaseApp: FirebaseApp;

// Initialize Firebase
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}

export const auth = getAuth(firebaseApp);
export const database = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const functions = getFunctions(firebaseApp);

// Uncomment to use emulator
// if (import.meta.env.DEV && typeof window !== 'undefined') {
//     connectFunctionsEmulator(functions, 'localhost', 5001);
// }

// Create database references
export const eventsColRef = collection(database, 'events');
export const newsColRef = collection(database, 'news');
export const userCollectionReference = collection(database, 'users');
export const settingsColRef = collection(database, 'settings');
export const imageColRef = collection(database, 'images');
export const pdfColRef = collection(database, 'pdfs');
export const documentsColRef = collection(database, 'documents');
export const locationColRef = collection(database, 'location');
export const noticeColRef = collection(database, 'notices');

// Create storage references
export const eventsStoreRef = ref(storage, 'events');
export const articlesStoreRef = ref(storage, 'articles');
export const docsStorageRef = ref(storage, 'documents');
export const imgStorageRef = ref(storage, 'images');
export const headerStorageRef = ref(storage, 'images/headers');
export const pdfStorageRef = ref(storage, 'pdfs');
export const weeklysheetStorageRef = ref(storage, 'documents/weeklysheet');
export const newsletterStorageRef = ref(storage, 'documents/newsletter');
