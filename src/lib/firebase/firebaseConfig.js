import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDzGsaVy4PHDvHQhNQj5fmcAaGm64bf_kY',
	authDomain: 'chaplaincy-website-bncgn.firebaseapp.com',
	projectId: 'chaplaincy-website-bncgn',
	storageBucket: 'chaplaincy-website-bncgn.appspot.com',
	messagingSenderId: '342698394076',
	appId: '1:342698394076:web:21790dc7aa59f599a58f19'
};

// Initialize Firebase
if (!getApps().length) {
	initializeApp(firebaseConfig);
}

// Create auth, database and storage instances
export const auth = getAuth();
export const database = getFirestore();
const storage = getStorage();
export const storageRef = ref(storage);

// Create database references
export const userColRef = collection(database, 'users');
export const eventsColRef = collection(database, 'events');
export const articlesColRef = collection(database, 'articles');

// Create storage references
export const userStoreRef = ref(storage, 'users');
export const eventsStoreRef = ref(storage, 'events');
export const articlesStoreRef = ref(storage, 'articles');
export const docsStorageRef = ref(storage, 'documents');
export const imgStorageRef = ref(storage, 'images');
