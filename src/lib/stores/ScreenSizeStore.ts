import { writable, type Writable } from 'svelte/store';

// Initialize screenSize with a default value
export const screenSize: Writable<number> = writable(0);

// Function to update the screen size
function updateScreenSize(): void {
    screenSize.set(window.innerWidth);
}

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
    // Update screenSize with the actual window width
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
}

// Function to stop listening to resize events
export function stopListening(): void {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateScreenSize);
    }
}
