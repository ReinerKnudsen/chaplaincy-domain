import { writable } from 'svelte/store';
import { TOAST_DURATION } from '$lib/utils/constants';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
	id: string;
	type: NotificationType;
	message: string;
	isToast: boolean; // true = floating toast, false = inline alert
	duration?: number | null; // null = manual dismiss, number = auto-dismiss in ms
}

// Store for all notifications (both toasts and inline alerts)
function createNotificationStore() {
	const { subscribe, set, update } = writable<Notification[]>([]);

	return {
		subscribe,

		// Add a toast notification (floating)
		addToast: (type: NotificationType, message: string, duration?: number | null) => {
			const id = crypto.randomUUID();
			const notification: Notification = {
				id,
				type,
				message,
				isToast: true,
				duration: duration ?? (type === 'success' || type === 'info' ? TOAST_DURATION : null),
			};

			update((notifications) => [notification, ...notifications]);

			return id;
		},

		// Add an inline alert (for forms)
		addAlert: (type: NotificationType, message: string) => {
			const id = crypto.randomUUID();
			const notification: Notification = {
				id,
				type,
				message,
				isToast: false,
				duration: null,
			};

			update((notifications) => [notification, ...notifications]);
			return id;
		},

		// Remove specific notification
		remove: (id: string) => {
			update((notifications) => notifications.filter((n) => n.id !== id));
		},

		// Clear all notifications
		clear: () => {
			set([]);
		},

		// Clear only toasts
		clearToasts: () => {
			update((notifications) => notifications.filter((n) => !n.isToast));
		},

		// Clear only alerts
		clearAlerts: () => {
			update((notifications) => notifications.filter((n) => n.isToast));
		},
	};
}

export const notificationStore = createNotificationStore();

export enum Messages {
	SAVESUCCESS = 'I saved that item for you.',
	SAVERROR = 'I failed to save that item. Please try again.',
	UPDATESUCCESS = 'I updated that item for you.',
	UPDATEERROR = 'I failed to update that item. Please try again.',
	DELETESUCCESS = 'I deleted that item for you.',
	DELETEERROR = 'I failed to delete that item. Please try again.',
	DRAFTSUCCESS = 'I saved that draft for you.',
	DRAFTERROR = 'I failed to save that draft. Please try again.',
	DUPLICATESUCCESS = 'I created a duplicate for you.',
	DUPLICATEERROR = 'I failed to create a duplicate. Please try again.',
}
