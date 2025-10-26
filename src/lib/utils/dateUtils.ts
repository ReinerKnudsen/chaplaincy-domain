/**
 * Utility functions for date handling
 */

/**
 * Converts a timestamp string to a formatted date string
 * @param timestamp - ISO timestamp string
 * @returns Formatted date string in en-US locale (MM/DD/YYYY)
 */

import { Timestamp } from 'firebase/firestore';

export const makeDate = (timestamp: Timestamp | string | null | undefined): string => {
	if (!timestamp) return '';

	// If it's already a string in YYYY-MM-DD format, return as is
	if (typeof timestamp === 'string') {
		return timestamp;
	}

	// If it's a Firebase Timestamp, convert it
	if (timestamp && typeof timestamp.toDate === 'function') {
		return timestamp.toDate().toISOString().split('T')[0];
	}

	// Fallback - try to create a Date object
	try {
		return new Date(timestamp as any).toISOString().split('T')[0];
	} catch (error) {
		console.error('Error converting timestamp:', error);
		return '';
	}
};

/**
 * Creates a Date object from separate date and time strings
 * @param date - Date string in YYYY-MM-DD format
 * @param time - Time string in HH:mm format
 * @returns Date object
 */
export const makeTimestamp = (date: string, time: string): Timestamp => {
	if (!validateDateString(date)) {
		throw new Error('Invalid date string');
	}
	if (!validateTimeString(time)) {
		throw new Error('Invalid time string');
	}
	// Force UTC interpretation by appending 'Z'
	const timestamp = Timestamp.fromDate(new Date(`${date}T${time}:00.000Z`));
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
