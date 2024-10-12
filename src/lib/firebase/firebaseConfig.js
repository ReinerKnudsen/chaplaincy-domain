import { deleteApp, getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_APPID
};

console.log(firebaseConfig);

export let firebaseApp;

//Initialize Firebase
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}

// Create auth, database and storage instances
export const auth = getAuth(firebaseApp);
export const database = getFirestore();
export const functions = getFunctions();
export const storage = getStorage();
export const storageRef = ref(storage);

// Create database references
export const eventsColRef = collection(database, 'events');
export const newsColRef = collection(database, 'news');
export const userCollectionReference = collection(database, 'users');

// Create storage references
export const eventsStoreRef = ref(storage, 'events');
export const articlesStoreRef = ref(storage, 'articles');
export const docsStorageRef = ref(storage, 'documents');
export const imgStorageRef = ref(storage, 'images');
