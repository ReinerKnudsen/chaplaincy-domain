<script lang="ts">
	import { notificationStore } from '$lib/stores/notifications';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	function showSuccessToast() {
		notificationStore.addToast('success', 'Item saved successfully!');
	}

	function showErrorToast() {
		notificationStore.addToast('error', 'Failed to save item. Please try again.');
	}

	function showWarningToast() {
		notificationStore.addToast('warning', 'This action cannot be undone.');
	}

	function showInfoToast() {
		notificationStore.addToast('info', 'New features available!');
	}
</script>

<div class="content-container p-6">
	<h1 class="text-3xl font-bold mb-8">Notification System Test</h1>
	
	<div class="flex flex-row gap-4 mb-6">
		<button onclick={showSuccessToast} class="btn btn-success">
			Success Toast
		</button>
		
		<button onclick={showErrorToast} class="btn btn-error">
			Error Toast
		</button>
		
		<button onclick={showWarningToast} class="btn btn-warning">
			Warning Toast
		</button>
		
		<button onclick={showInfoToast} class="btn btn-custom btn-info">
			Info Toast
		</button>
	</div>
</div>

