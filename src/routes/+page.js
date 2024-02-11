import { initializeApp } from 'firebase/app';
import { Db } from '../store';

const firebaseConfig = {
	apiKey: 'AIzaSyDzGsaVy4PHDvHQhNQj5fmcAaGm64bf_kY',
	authDomain: 'chaplaincy-website-bncgn.firebaseapp.com',
	projectId: 'chaplaincy-website-bncgn',
	storageBucket: 'chaplaincy-website-bncgn.appspot.com',
	messagingSenderId: '342698394076',
	appId: '1:342698394076:web:21790dc7aa59f599a58f19'
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
