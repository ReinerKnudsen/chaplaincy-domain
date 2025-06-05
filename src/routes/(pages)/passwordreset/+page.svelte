<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Label, Input, Helper, Alert } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { requestPasswordReset } from '$lib/services/authService';
	import { auth } from '$lib/firebase/firebaseConfig';
	import { confirmPasswordReset } from 'firebase/auth';

	let email = '';
	let newPassword = '';
	let checkPassword = '';
	let oobCode: string | null = null;
	let isError = false;
	let errorMessage = '';
	let isSuccess = false;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		oobCode = urlParams.get('oobCode');
	});

	const requestReset = async (e: Event) => {
		e.preventDefault();
		try {
			await requestPasswordReset(email);
			isSuccess = true;
			errorMessage = '';
		} catch (error: unknown) {
			isError = true;
			errorMessage = 'Failed to send password reset email. Please try again.';
		}
	};

	const resetPassword = async () => {
		if (!oobCode) return;
		try {
			await confirmPasswordReset(auth, oobCode, newPassword);
			await goto('/login');
		} catch (error: unknown) {
			isError = true;
			errorMessage = 'Could not reset password. The link may have expired.';
		}
	};

	const setErrorState = () => {
		if (newPassword && checkPassword && newPassword !== checkPassword) {
			isError = true;
			errorMessage = 'Passwords do not match';
		} else {
			isError = false;
			errorMessage = '';
		}
	};

	const resetUserPassword = (e: Event) => {
		e.preventDefault();
		if (newPassword && checkPassword && newPassword !== checkPassword) {
			isError = true;
			errorMessage = 'Passwords do not match';
			return;
		}
		isError = false;
		errorMessage = '';
		resetPassword();
	};

	const verifyInput = () => {
		if (isError) {
			isError = false;
			errorMessage = '';
		}
	};
</script>

<div class="flex flex-row justify-center">
	<div class="w-5/12 space-y-4 rounded-xl bg-white-primary p-6 shadow-xl sm:p-8 md:space-y-6">
		{#if oobCode}
			<!-- Reset Password Form -->
			<form class="flex flex-col space-y-6" on:submit={resetUserPassword}>
				<h3 class="dark:text-white p-0 text-xl font-medium text-gray-900">Reset your password</h3>
				<Label class="space-y-2" for="new-password">
					<span>New Password</span>
					<Input
						type="password"
						name="new-password"
						id="new-password"
						bind:value={newPassword}
						on:change={setErrorState}
						on:input={verifyInput}
						required
					/>
				</Label>
				<Label class="space-y-2" for="check-password">
					<span>Confirm Password</span>
					<Input
						type="password"
						name="check-password"
						id="check-password"
						bind:value={checkPassword}
						on:change={setErrorState}
						on:input={verifyInput}
						required
					/>
				</Label>
				{#if isError}
					<Alert color="red" class="mt-2">{errorMessage}</Alert>
				{/if}
				<Button type="submit" class="w-full bg-primary-80 text-white-primary">Change password</Button>
			</form>
		{:else}
			<!-- Request Reset Form -->
			<form class="flex flex-col space-y-6" on:submit={requestReset}>
				<h3 class="dark:text-white p-0 text-xl font-medium text-gray-900">Reset your password</h3>
				<p class="text-sm text-gray-600">
					Enter your email address and we'll send you a link to reset your password.
				</p>
				<Label class="space-y-2" for="email">
					<span>Email</span>
					<Input
						type="email"
						name="email"
						id="email"
						placeholder="name@company.com"
						bind:value={email}
						required
					/>
				</Label>
				{#if isSuccess}
					<Alert color="green" class="mt-2">
						Check your email for a link to reset your password.
					</Alert>
				{/if}
				{#if isError}
					<Alert color="red" class="mt-2">{errorMessage}</Alert>
				{/if}
				<Button type="submit" class="w-full bg-primary-80 text-white-primary">Send reset link</Button>
			</form>
		{/if}
	</div>
</div>
