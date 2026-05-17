import { describe, it, expect, vi, beforeEach } from 'vitest';
import { duplicateItem } from './ObjectStore';
import { CollectionType } from '$lib/stores/ObjectStore';
import { getDoc, addDoc } from 'firebase/firestore';

// Mock Firebase functions
vi.mock('firebase/firestore', () => ({
	getDoc: vi.fn(),
	addDoc: vi.fn(),
	doc: vi.fn(),
	collection: vi.fn(),
	getFirestore: vi.fn(),
	Timestamp: {
		fromDate: vi.fn(() => ({ seconds: 123, nanoseconds: 456 })),
	},
}));

// Mock Firebase config
vi.mock('$lib/firebase/firebaseConfig', () => ({
	database: {},
}));

describe('ObjectStore - duplicateItem', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should duplicate an item and remove date fields', async () => {
		// Arrange
		const mockItemId = 'test-item-id';
		const mockType = CollectionType.News;
		const mockOriginalData = {
			title: 'Test News',
			text: 'This is test news',
			publishdate: '2024-01-01',
			createdate: '2024-01-01',
			author: 'Test Author',
		};
		const mockNewDocRef = { id: 'new-item-id' };

		// Mock Firebase calls
		const mockGetDoc = vi.mocked(getDoc);
		const mockAddDoc = vi.mocked(addDoc);

		mockGetDoc.mockResolvedValue({
			exists: () => true,
			data: () => mockOriginalData,
		} as any);

		mockAddDoc.mockResolvedValue(mockNewDocRef as any);

		// Act
		const result = await duplicateItem(mockItemId, mockType);

		// Assert
		expect(result).toBe('new-item-id');
		expect(getDoc).toHaveBeenCalledTimes(1);
		expect(addDoc).toHaveBeenCalledTimes(1);

		// Verify that date fields were nullified in the added data
		const addDocCall = mockAddDoc.mock.calls[0];
		const addedData = addDocCall[1] as Record<string, unknown>;

		expect(addedData.title).toBe('Test News');
		expect(addedData.text).toBe('This is test news');
		expect(addedData.author).toBe('Test Author');
		expect(addedData.publishdate).toBeNull();
		expect(addedData.createdate).toBeNull();
	});

	it('should return undefined if item does not exist', async () => {
		// Arrange
		const mockItemId = 'non-existent-id';
		const mockType = CollectionType.Events;

		const mockGetDoc = vi.mocked(getDoc);
		mockGetDoc.mockResolvedValue({
			exists: () => false,
		} as any);

		// Act
		const result = await duplicateItem(mockItemId, mockType);

		// Assert
		expect(result).toBeUndefined();
		expect(getDoc).toHaveBeenCalledTimes(1);
		expect(addDoc).not.toHaveBeenCalled();
	});

	it('should return undefined if Firebase throws an error', async () => {
		// Arrange
		const mockItemId = 'test-item-id';
		const mockType = CollectionType.News;

		const mockGetDoc = vi.mocked(getDoc);
		mockGetDoc.mockRejectedValue(new Error('Firebase error'));

		// Act
		const result = await duplicateItem(mockItemId, mockType);

		// Assert
		expect(result).toBeUndefined();
		expect(getDoc).toHaveBeenCalledTimes(1);
		expect(addDoc).not.toHaveBeenCalled();
	});

	it('should work with different collection types', async () => {
		// Arrange
		const mockItemId = 'event-id';
		const mockType = CollectionType.Events;
		const mockEventData = {
			title: 'Test Event',
			description: 'Test Description',
			startdate: '2024-01-01',
			enddate: '2024-01-02',
			location: 'Test Location',
		};
		const mockNewDocRef = { id: 'new-event-id' };

		const mockGetDoc = vi.mocked(getDoc);
		const mockAddDoc = vi.mocked(addDoc);

		mockGetDoc.mockResolvedValue({
			exists: () => true,
			data: () => mockEventData,
		} as any);

		mockAddDoc.mockResolvedValue(mockNewDocRef as any);

		// Act
		const result = await duplicateItem(mockItemId, mockType);

		// Assert
		expect(result).toBe('new-event-id');

		const addDocCall = mockAddDoc.mock.calls[0];
		const addedData = addDocCall[1] as Record<string, unknown>;

		expect(addedData.title).toBe('Test Event');
		expect(addedData.startdate).toBeNull();
		expect(addedData.enddate).toBeNull();
		expect(addedData.location).toBe('Test Location');
	});
});
