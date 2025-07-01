// fileService.ts provides file related services
import { database, storage } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc, getDoc } from 'firebase/firestore';

interface ImageDocument {
	name: string;
	url: string;
	createdAt: Date;
	altText: string | null;
	caption?: string | null;
}

export enum FileType {
	Image = 'images',
	Pdf = 'pdf',
}

// Upload an image to Firebase storage
export const uploadImage = async (selectedImage: File, altText: string, caption: string): Promise<string | null> => {
	if (selectedImage) {
		const storageRef = ref(storage, 'images/' + selectedImage.name);
		try {
			await uploadBytes(storageRef, selectedImage);
			const imageUrl = await getDownloadURL(storageRef);
			await setDoc(doc(database, FileType.Image, selectedImage.name), {
				name: selectedImage.name,
				url: imageUrl,
				createdAt: new Date(),
				altText: altText,
				caption: caption || '',
			} as ImageDocument);
			return imageUrl;
		} catch (error) {
			console.error(error);
		}
	}
	return null;
};

// Check if a file exists
export const checkIfFileExists = async (imageFile: string, type: FileType) => {
	if (!imageFile) {
		return null;
	}
	const docRef = doc(database, type, imageFile);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap; // File exists in Firestore
	} else {
		return null; // File doesn't exist in Firestore
	}
};
