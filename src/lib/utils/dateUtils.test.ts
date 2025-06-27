import { describe, it, expect } from 'vitest';
import { makeDate, makeTimestamp } from './dateUtils';

describe('makeDate', () => {
	it('should return a formatted date string', () => {
		const timestamp = '2025-06-26T12:54:40.000Z';
		const result = makeDate(timestamp);
		expect(result).toBe('6/26/2025');
	});
	
	it('should return a formatted date string for New Year', () => {
		const timestamp = '2024-12-31T22:00:12.000Z';
		const result = makeDate(timestamp);
		expect(result).toBe('12/31/2024');
	});
});

describe('makeTimestamp', () => {
	it('should return a timestamp', () => {
		const date = '2024-12-23';
		const time = '13:07';
		const result = makeTimestamp(date, time);
		
		// Test the Date object properties instead of string comparison
		expect(result.getFullYear()).toBe(2024);
		expect(result.getMonth()).toBe(11); // December = 11 (0-indexed)
		expect(result.getDate()).toBe(23);
		expect(result.getHours()).toBe(13);
		expect(result.getMinutes()).toBe(7);
	});
  
	it('should throw an error for invalid date format', () => {
		const date = '23.12.2025';
		const time = '13:07';
		
		// Need to wrap the function call in an arrow function for error testing
		expect(() => makeTimestamp(date, time)).toThrow('Invalid date string');
	});

	it('should throw an error for invalid time format', () => {
		const date = '2024-12-23';
		const time = '25:07'; // Invalid hour
		
		expect(() => makeTimestamp(date, time)).toThrow('Invalid time string');
	});
});