// fileService.ts provides file related services
import { database, imageColRef, storage } from '../firebase/firebaseConfig';
import {
	ref,
	uploadBytes,
	getDownloadURL,
	type StorageReference,
	getMetadata,
	listAll,
	deleteObject,
} from 'firebase/storage';
import { setDoc, doc, Timestamp, getDoc, deleteDoc } from 'firebase/firestore';

interface ImageDocument {
	name: string;
	url: string;
	createdAt: Date;
	altText: string | null;
	caption?: string | null;
}

export interface ImageUsage {
	id: string; // auto-generated
	imageId: string; // filename (from imageRef field)
	documentType: 'news' | 'events';
	documentId: string; // the document that uses this image
	createdAt: Timestamp;
}

export type PDFType = 'documents' | 'weeklysheet' | 'newsletter';

export enum FileType {
	Image = 'images',
	Pdf = 'pdf',
}

export type ReturnType = {
	url: string;
	ref: StorageReference;
};

// Upload an image to Firebase storage
export const uploadImage = async (selectedImage: File, altText: string, caption: string): Promise<ReturnType> => {
	if (selectedImage) {
		const storageRef = ref(storage, 'images/' + selectedImage.name);
		try {
			await uploadBytes(storageRef, selectedImage);
			const imageUrl = await getDownloadURL(storageRef);
			const imageRef = storageRef;
			await setDoc(doc(database, FileType.Image, selectedImage.name), {
				name: selectedImage.name,
				url: imageUrl,
				createdAt: new Date(),
				altText: altText,
				imageCaption: caption,
			} as ImageDocument);
			return { url: imageUrl, ref: imageRef };
		} catch (error) {
			console.error(error);
		}
	}
};

// Delete an image from storage
// all images live in the 'images' directory
export const deleteImageFromStorage = async (imageName: string) => {
	const storageRef = ref(storage, 'images/' + imageName);
	await deleteObject(storageRef);

	const docRef = doc(imageColRef, imageName);
	await deleteDoc(docRef);
};

// Check if a file exists
export const checkIfFileExists = async (imageFileName: string): Promise<StorageReference | null> => {
	if (!imageFileName) {
		return null;
	}
	const storageRef = ref(storage, 'images/' + imageFileName);
	try {
		await getMetadata(storageRef);
		return storageRef;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const checkIfPDFExists = async (pdfFileName: string, type: PDFType) => {
	if (!pdfFileName) {
		return null;
	}
	const storageRef = ref(storage, `${type === 'documents' ? '' : 'documents'}/${type}/${pdfFileName}`);

	try {
		await getMetadata(storageRef);
		// If we get here, file exists
		return storageRef;
	} catch (error: any) {
		// Check if it's specifically a "not found" error
		if (error.code === 'storage/object-not-found') {
			// This is expected for new files - not an error
			return null;
		}
		// Only log actual errors (permissions, network, etc.)
		console.error('Unexpected error checking PDF:', error);
		return null;
	}
};

export const uploadPDF = async (newPdf: File, type: PDFType): Promise<ReturnType | null> => {
	if (!newPdf || !type) return null;
	const storageRef = ref(storage, `${type === 'documents' ? '' : 'documents'}/${type}/${newPdf.name}`);
	let result: ReturnType | null = null;
	try {
		const newPDF = await uploadBytes(storageRef, newPdf);
		const pdfUrl = await getDownloadURL(newPDF.ref);
		const pdfRef = newPDF.ref;
		result = { url: pdfUrl, ref: pdfRef };
	} catch (error) {
		console.error(error);
	}
	return result;
};

export const listAllImages = async () => {
	try {
		const imagesRef = ref(storage, 'images');
		const result = await listAll(imagesRef);
		return result.items;
	} catch (error) {
		console.error('Error listing images', error);
		return [];
	}
};

export const getStorageFileSize = async (item: StorageReference) => {
	try {
		const metadata = await getMetadata(item);
		return metadata.size;
	} catch (error) {
		console.error(error);
		return null;
	}
};
