// fileService.ts provides file related services
import { database, storage } from '../firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL, updateMetadata, type StorageReference, getMetadata } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

interface ImageDocument {
	name: string;
	url: string;
	createdAt: Date;
	altText: string | null;
	caption?: string | null;
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
			const metadata = {
				customMetadata: {
					imageAlt: altText,
					imageCaption: caption,
				},
			};
			await uploadBytes(storageRef, selectedImage);
			await updateMetadata(storageRef, metadata);
			const imageUrl = await getDownloadURL(storageRef);
			const imageRef = storageRef;
			await setDoc(doc(database, FileType.Image, selectedImage.name), {
				name: selectedImage.name,
				url: imageUrl,
				createdAt: new Date(),
			} as ImageDocument);
			return { url: imageUrl, ref: imageRef };
		} catch (error) {
			console.error(error);
		}
	}
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
		return storageRef;
	} catch (error) {
		console.error(error);
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
		console.log(result);
	} catch (error) {
		console.error(error);
	}
	return result;
};
