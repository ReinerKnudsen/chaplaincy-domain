import { describe, it, vi, expect } from 'vitest';
import { validateEmptyInput, validateEventData } from './validateForm';
import { notificationStore } from '$lib/stores/notifications';

// Mock the notification store
vi.mock('$lib/stores/notifications', () => ({
	notificationStore: {
		addToast: vi.fn(),
		addAlert: vi.fn(),
		// ... other methods if needed
	},
}));

describe('validateEmptyInput', () => {
	it('ok: all required fields have values', () => {
		const formData = {
			target: {
				feld1: { name: 'feld1', required: true, value: 'feld1value' },
				feld2: { name: 'feld2', required: true, value: 'feld2value' },
			},
		};
		expect(validateEmptyInput(formData)).toEqual([]);
	});

	it('error: required field without value', () => {
		const formData = {
			target: {
				feld1: { name: 'feld1', required: true, value: 'feld1value' },
				feld2: { name: 'feld2', required: true, value: '' },
			},
		};
		expect(validateEmptyInput(formData)).toEqual(['feld2']);
	});

	it('ok: one optional field without value', () => {
		const formData = {
			target: {
				feld1: { name: 'feld1', required: true, value: 'feld1value' },
				feld2: { name: 'feld2', required: false, value: '' },
			},
		};
		expect(validateEmptyInput(formData)).toEqual([]);
	});

	it('ok: optional field with value && required field without value', () => {
		const formData = {
			target: {
				feld1: { name: 'feld1', required: true, value: '' },
				feld2: { name: 'feld2', required: false, value: 'feld2value' },
			},
		};
		expect(validateEmptyInput(formData)).toEqual(['feld1']);
	});
	it('ok: one optional field with value', () => {
		const formData = {
			target: {
				feld1: { name: 'feld1', required: true, value: 'feld1value' },
				feld2: { name: 'feld2', required: false, value: 'feld2value' },
			},
		};
		expect(validateEmptyInput(formData)).toEqual([]);
	});
	it('ok: no required fields in the form', () => {
		const formData = {
			target: {
				feld1: { name: 'feld1', required: false, value: 'feld1value' },
				feld2: { name: 'feld2', required: false, value: '' },
			},
		};
		expect(validateEmptyInput(formData)).toEqual([]);
	});
	it('ok: empty form', () => {
		const formData = {
			target: {},
		};
		expect(validateEmptyInput(formData)).toEqual([]);
	});
});

describe('validDateEventData', () => {
	it('ok: happy flow, no problem', () => {
		const event = {
			startdate: '2025-09-09',
			starttime: '13:00',
			enddate: '2025-09-09',
			endtime: '18:00',
			publishdate: '2025-07-09',
			publishtime: '09:00',
			unpublishDate: '2025-09-09',
			unpublishTime: '18:00',
		};
		// @ts-expect-error - Testing with incomplete event object
		const result = validateEventData(event);
		expect(notificationStore.addToast).not.toHaveBeenCalled();
		expect(result).toEqual([]); // Still returns empty array for no errors
	});

	it('error: no startdate for event', () => {
		const event = {
			startdate: '',
			starttime: '13:00',
		};
		// @ts-expect-error - Testing with incomplete event object
		validateEventData(event);
		expect(notificationStore.addToast).toHaveBeenCalledWith(
			'error',
			'Mandatory start date is empty'
		);
		expect(notificationStore.addToast).toHaveBeenCalledTimes(1);
	});

	it('error: no starttime for event', () => {
		const event = {
			startdate: '2025-08-09',
			starttime: '',
		};
		// @ts-expect-error - Testing with incomplete event object
		validateEventData(event);
		expect(notificationStore.addToast).toHaveBeenCalledWith(
			'error',
			'Mandatory start time is empty'
		);
	});

	it('error: startdate before today', () => {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		const yesterdayString = yesterday.toISOString().split('T')[0];
		const event = {
			startdate: yesterdayString,
			starttime: '13:00',
		};
		// @ts-expect-error - Testing with incomplete event object
		validateEventData(event);
		expect(notificationStore.addToast).toHaveBeenCalledWith(
			'error',
			'The start date cannot be in the past'
		);
	});

	it('error: endDateTime before startDateTime based on enddate', () => {
		const event = {
			startdate: '2025-09-09',
			starttime: '13:00',
			enddate: '2025-01-01',
			endtime: '18:00',
		};
		// @ts-expect-error - Testing with incomplete event object
		validateEventData(event);
		expect(notificationStore.addToast).toHaveBeenCalledWith(
			'error',
			'The event end cannot be before the event starts'
		);
	});

	it('error: endDateTime before startDateTime based on endtime', () => {
		const event = {
			startdate: '2025-09-09',
			starttime: '13:00',
			enddate: '2025-09-09',
			endtime: '03:00',
		};
		// @ts-expect-error - Testing with incomplete event object
		validateEventData(event);
		expect(notificationStore.addToast).toHaveBeenCalledWith(
			'error',
			'The event end cannot be before the event starts'
		);
	});

	it('error: publishDateTime after startDateTime based on publishDate', () => {
		const event = {
			startdate: '2025-09-08',
			starttime: '13:00',
			publishdate: '2025-10-01',
			publishtime: '13:00',
		};
		// @ts-expect-error - Testing with incomplete event object
		validateEventData(event);
		expect(notificationStore.addToast).toHaveBeenCalledWith(
			'error',
			'The publish date cannot be after the start date'
		);
	});

	it('error: publishDateTime after startDateTime based on publishtime', () => {
		const event = {
			startdate: '2025-09-08',
			starttime: '13:00',
			publishdate: '2025-09-08',
			publishtime: '18:00',
		};
		// @ts-expect-error - Testing with incomplete event object
		validateEventData(event);
		expect(notificationStore.addToast).toHaveBeenCalledWith(
			'error',
			'The publish date cannot be after the start date'
		);
	});
});
