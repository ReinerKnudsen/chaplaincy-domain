<script lang="ts">
	import { onMount } from 'svelte';

	import type { Notification } from '$lib/stores/notifications';
	import { notificationStore } from '$lib/stores/notifications';

	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		notification: Notification;
	}

	let { notification }: Props = $props();

	// Configuration for each notification type
	const typeConfig = {
		success: {
			icon: 'heroicons-outline:check-circle',
			background: 'bg-green-500',
			color: 'text-white',
		},
		warning: {
			icon: 'heroicons-outline:exclamation',
			background: 'bg-yellow-500',
			color: 'text-gray-900',
		},
		error: {
			icon: 'heroicons-outline:x-circle',
			background: 'bg-red-500',
			color: 'text-white',
		},
		info: {
			icon: 'heroicons-outline:information-circle',
			background: 'bg-blue-500',
			color: 'text-white',
		},
	};

	const config = typeConfig[notification.type];

	const duration = notification.duration;

	// Animation state
	let isVisible = $state(false);

	// Handle slide-in animation on mount
	onMount(() => {
		// Small delay to ensure DOM is ready, then trigger slide-in
		setTimeout(() => {
			isVisible = true;
		}, 10);

		// Set up auto-dismiss with animation if duration is specified
		if (notification.duration) {
			setTimeout(() => {
				dismiss(); // Use the same dismiss function for consistent animation
			}, notification.duration);
		}
	});

	// Handle manual dismiss
	function dismiss() {
		isVisible = false;
		// Wait for slide-out animation to complete before removing from store
		setTimeout(() => {
			notificationStore.remove(notification.id);
		}, 300); // Match animation duration
	}
</script>

<div
	class="toast-container relative right-4 z-50 w-80 transform-gpu transition-transform duration-300 ease-out sm:w-96 {isVisible
		? 'translate-x-0'
		: 'translate-x-full'}"
	role="alert"
	aria-live="polite"
>
	<div class="toast-content border-opacity-50 rounded-lg border-l-4 shadow-lg {config.background} {config.color} p-4">
		<div class="flex items-start justify-between gap-3">
			<div class="flex flex-1 items-center gap-3">
				<Icon icon={config.icon} class="mt-0.5 h-6 w-6 flex-shrink-0" />
				<div class="text-sm leading-5 font-medium">
					{notification.message}
				</div>
			</div>
			{#if !duration}
				<Button variant="ghost" onclick={dismiss} aria-label="Dismiss notification">
					<Icon icon="heroicons-outline:x-mark" class="h-4 w-4" />
				</Button>
			{/if}
		</div>
	</div>
</div>
