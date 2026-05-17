export const MAX_SLUG_TEXT = 250;
export const MAX_IMAGE_SIZE = 1200000;
export const STORAGE_URL = `https://storage.cloud.google.com/${import.meta.env.VITE_STORAGEBUCKET}/`;
export const STORAGE_IMAGES = STORAGE_URL + 'images/';

export const h2Class = 'text-2xl font-semibold my-4';

export const size = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
};

export const userRoles = [
	{ id: 1, value: 'user', name: 'User' },
	{ id: 2, value: 'editor', name: 'Editor' },
	{ id: 3, value: 'admin', name: 'Admin' },
];

export const MINUTES_BEFORE_EVENT_START = 20;
