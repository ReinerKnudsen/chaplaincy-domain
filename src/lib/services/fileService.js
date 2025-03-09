/* eslint-disable no-unused-vars */
// fileService.js provides file related services

import { database } from '../firebase/firebaseConfig';
import { getDoc, doc, addDoc, collection } from 'firebase/firestore';

export const duplicateItem = async (itemId, collectionName) => {
	try {
		const itemRef = doc(database, collectionName, itemId);
		const item = await getDoc(itemRef);
		if (!item.exists) {
			throw new Error('Item not found');
		}
		const newData = removeDateFields(item.data());
		const newDocRef = await addDoc(collection(database, collectionName), newData);
		return newDocRef.id;
	} catch (error) {
		console.log(error);
	}
};

const removeDateFields = (data) => {
	const {
		startdate,
		starttime,
		enddate,
		endtime,
		publishdate,
		publishtime,
		unpublishdate,
		unpublishtime,
		publishDateTime,
		unpublishDateTime,
		...remainingData
	} = data;
	return remainingData;
};
