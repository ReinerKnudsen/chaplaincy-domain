import { writable } from 'svelte/store';

// Initialize screenSize with a default value
export const screenSize = writable(0);

// Function to update the screen size
function updateScreenSize() {
	screenSize.set(window.innerWidth);
}

if (typeof window !== 'undefined') {
	// Update screenSize with the actual window width
	updateScreenSize();
	window.addEventListener('resize', updateScreenSize);
}

// Function to stop listening to resize events
export function stopListening() {
	if (typeof window !== 'undefined') {
		window.removeEventListener('resize', updateScreenSize);
	}
}
