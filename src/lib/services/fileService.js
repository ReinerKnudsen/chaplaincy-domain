/* eslint-disable no-unused-vars */
// fileService.js provides file related services

import { database, storage } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { getDoc, getDocs, doc, addDoc, collection, setDoc } from 'firebase/firestore';

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

export const uploadImage = async (selectedImage) => {
	if (selectedImage) {
		const storageRef = ref(storage, 'images/' + selectedImage.name);
		try {
			await uploadBytes(storageRef, selectedImage);
			let imageUrl = await getDownloadURL(storageRef);
			await setDoc(doc(database, 'images', selectedImage.name), {
				name: selectedImage.name,
				url: imageUrl,
				createdAt: new Date(),
			});
			return imageUrl;
		} catch (error) {
			console.log(error); // eslint-disable-line no-console
		}
	} else {
		return null;
	}
};

export const fetchLocations = async () => {
	const querySnapshot = await getDocs(collection(database, 'location'));
	const locs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	return locs;
};
