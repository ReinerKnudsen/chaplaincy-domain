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
import { setDoc, doc, Timestamp, deleteDoc } from 'firebase/firestore';

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

/**
 * Uploads an image file to Firebase Storage and records its metadata in Firestore.
 *
 * Errors from Firebase (network failures, quota exceeded, permission errors, etc.)
 * are intentionally NOT caught here — they propagate to the caller so the caller
 * can decide how to handle them (e.g. show a toast notification to the user).
 *
 * @param selectedImage - The image file to upload
 * @param altText - Accessible description of the image (required, stored in Firestore)
 * @param caption - Optional visible caption displayed below the image
 * @returns An object containing the public download URL and the Firebase StorageReference
 * @throws Any Firebase Storage or Firestore error that occurs during the upload
 */
export const uploadImage = async (selectedImage: File, altText: string, caption: string): Promise<ReturnType> => {
	const storageRef = ref(storage, 'images/' + selectedImage.name);

	const snapshot = await uploadBytes(storageRef, selectedImage);
	const imageUrl = await getDownloadURL(snapshot.ref);

	await setDoc(doc(database, FileType.Image, selectedImage.name), {
		name: selectedImage.name,
		url: imageUrl,
		createdAt: new Date(),
		altText: altText,
		imageCaption: caption,
	} as ImageDocument);

	return { url: imageUrl, ref: snapshot.ref };
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
	} catch (error: unknown) {
		if (error instanceof Error && 'code' in error) {
			if ((error as { code: string }).code === 'storage/object-not-found') {
				return null;
			}
		}
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
