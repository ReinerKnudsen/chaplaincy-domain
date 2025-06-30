<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { auth } from '$lib/firebase/firebaseConfig';
	import { confirmPasswordReset } from 'firebase/auth';
	import { requestPasswordReset } from '$lib/services/authService';
	import { notificationStore } from '$lib/stores/notifications';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	let email = $state('');
	let newPassword = $state('');
	let checkPassword = $state('');
	let oobCode: string | null = $state(null);

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		oobCode = urlParams.get('oobCode');
	});

	const requestReset = async () => {
		try {
			await requestPasswordReset(email);
			notificationStore.addToast('success', 'Password reset email sent successfully', 3000);
			await goto('/login');
		} catch (error: unknown) {
			notificationStore.addToast('error', 'Could not the password reset email. Please try again later.');
			console.error('Could not the password reset email. ', error);
		}
	};

	const resetPassword = async () => {
		if (!oobCode) return;
		try {
			await confirmPasswordReset(auth, oobCode, newPassword);
			notificationStore.addToast('success', 'Changed your password successfully. You can login now.', 3000);
			await goto('/login');
		} catch (error: unknown) {
			notificationStore.addToast('error', 'Could not reset password. The link may have expired.');
			console.error('Could not reset password. The link may have expired.');
		}
	};

	const checkPasswords = () => {
		if (newPassword && checkPassword && newPassword !== checkPassword) {
			notificationStore.addToast('error', 'Passwords do not match. Please try again.');
			return;
		} else {
			resetPassword();
		}
	};
</script>

<div class="flex flex-row justify-center">
	<div class="bg-white-primary w-5/12 space-y-4 rounded-xl p-6 shadow-xl sm:p-8 md:space-y-6">
		{#if oobCode}
			<!-- Reset Password Form -->
			<form class="flex flex-col" onsubmit={checkPasswords}>
				<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Reset your password</h3>
				<div class="my-6">
					<Label>New Password</Label>
					<Input type="password" name="new-password" id="new-password" bind:value={newPassword} required />
					<Label>Confirm Password</Label>
					<Input type="password" name="check-password" id="check-password" bind:value={checkPassword} required />
					<Button type="submit" variant="primary">Change password</Button>
				</div>
			</form>
		{:else}
			<!-- Request Reset Form -->
			<form class="flex flex-col" onsubmit={requestReset}>
				<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Reset your password</h3>
				<p class="text-sm text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
				<div class="my-6">
					<Label>Email</Label>
					<Input type="email" name="email" id="email" placeholder="name@company.com" bind:value={email} required />
				</div>
				<Button type="submit" variant="primary">Send reset link</Button>
			</form>
		{/if}
	</div>
</div>

<ToastContainer />
