// fileService.ts provides file related services
import { database, storage } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

interface ImageDocument {
	name: string;
	url: string;
	createdAt: Date;
}

// Upload an image to Firebase storage
export const uploadImage = async (selectedImage: File): Promise<string | null> => {
	if (selectedImage) {
		const storageRef = ref(storage, 'images/' + selectedImage.name);
		try {
			await uploadBytes(storageRef, selectedImage);
			const imageUrl = await getDownloadURL(storageRef);
			await setDoc(doc(database, 'images', selectedImage.name), {
				name: selectedImage.name,
				url: imageUrl,
				createdAt: new Date(),
			} as ImageDocument);
			return imageUrl;
		} catch (error) {
			console.log(error);
		}
	}
	return null;
};
