import { writable, type Writable } from 'svelte/store';

export const selectedImage: Writable<File | null> = writable(null);
export const imageExists: Writable<boolean> = writable(false);
export const existingImageUrl: Writable<string | null> = writable(null);

export function resetImageselection() {
  selectedImage.set(null);
  imageExists.set(false);
  existingImageUrl.set(null);
}
