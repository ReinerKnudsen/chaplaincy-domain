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
	if (!validateDateString(date)) {
		throw new Error('Invalid date string');
	}
	if (!validateTimeString(time)) {
		throw new Error('Invalid time string');
	}
	const timestamp = new Date(`${date}T${time}`);
	return timestamp;
};

const validateDateString = (dateString: string): boolean => {
	const date = new Date(dateString);
	return !isNaN(date.getTime());
};

const validateTimeString = (timeString: string): boolean => {
	// Check basic format HH:mm (but allow single digits too)
	const timeRegex = /^\d{1,2}:\d{2}$/;
	if (!timeRegex.test(timeString)) {
		return false;
	}
	
	// Parse hours and minutes
	const [hours, minutes] = timeString.split(':').map(Number);
	
	// Validate ranges
	return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};