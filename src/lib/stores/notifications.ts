import { writable } from 'svelte/store';

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
				duration: duration ?? (type === 'success' || type === 'info' ? 4000 : null)
			};
			
			update(notifications => [notification, ...notifications]);
			
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
				duration: null
			};
			
			update(notifications => [notification, ...notifications]);
			return id;
		},
		
		// Remove specific notification
		remove: (id: string) => {
			update(notifications => notifications.filter(n => n.id !== id));
		},
		
		// Clear all notifications
		clear: () => {
			set([]);
		},
		
		// Clear only toasts
		clearToasts: () => {
			update(notifications => notifications.filter(n => !n.isToast));
		},
		
		// Clear only alerts
		clearAlerts: () => {
			update(notifications => notifications.filter(n => n.isToast));
		}
	};
}

export const notificationStore = createNotificationStore();
