<script lang="ts">
	import { notificationStore } from '$lib/stores/notifications';
	import Toast from './Toast.svelte';

	// Subscribe to notifications and filter for toasts only
	const toasts = $derived(
		$notificationStore.filter(notification => notification.isToast)
	);
</script>

<div class="toast-container fixed top-[75vh] right-4 z-50 pointer-events-none">
	<div class="space-y-3">
		{#each toasts as notification (notification.id)}
			<div class="pointer-events-auto">
				<Toast {notification} />
			</div>
		{/each}
	</div>
</div>