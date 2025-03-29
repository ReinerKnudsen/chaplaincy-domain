/**
 * Utility functions for date handling
 */

/**
 * Converts a timestamp string to a formatted date string
 * @param timestamp - ISO timestamp string
 * @returns Formatted date string in en-US locale (MM/DD/YYYY)
 */

export const makeDate = (timestamp: string): string => {
	const date = new Date(timestamp);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});
};

/**
 * Creates a Date object from separate date and time strings
 * @param date - Date string in YYYY-MM-DD format
 * @param time - Time string in HH:mm format
 * @returns Date object
 */
export const makeTimestamp = (date: string, time: string): Date => {
	const timestamp = new Date(`${date}T${time}`);
	return timestamp;
};
