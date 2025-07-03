import { writable, type Writable } from 'svelte/store';

export const selectedImage: Writable<File | null> = writable(null);

type ImageData = {
	downloadUrl: string;
	altText: string;
	caption: string;
};
export const selectedImageData: Writable<ImageData | null> = writable(null);
export const existingImageData: Writable<ImageData | null> = writable(null);
