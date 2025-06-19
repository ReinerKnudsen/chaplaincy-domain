// src/lib/services/editorImageService.ts
import { storage } from '$lib/firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export async function uploadEditorImage(blob: Blob, contentType: string): Promise<string> {
	const fileExtension = contentType.split('/')[1];
	const uniqueId = uuidv4();
	const path = `editor-images/${uniqueId}.${fileExtension}`;
	const storageRef = ref(storage, path);

	await uploadBytes(storageRef, blob);
	return getDownloadURL(storageRef);
}
