<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { auth } from '$lib/firebase/firebaseConfig';
	import { confirmPasswordReset } from 'firebase/auth';
	import { requestPasswordReset } from '$lib/services/authService';

	import Label from '$lib/components/Label.svelte';
	import Alert from '$lib/components/Alert.svelte';

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
	<div class="bg-white-primary w-5/12 space-y-4 rounded-xl p-6 shadow-xl sm:p-8 md:space-y-6">
		{#if oobCode}
			<!-- Reset Password Form -->
			<form class="flex flex-col" on:submit={resetUserPassword}>
				<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Reset your password</h3>
				<Label child="new-password">New Password</Label>
				<input
					class="input input-bordered input-lg w-full"
					type="password"
					name="new-password"
					id="new-password"
					bind:value={newPassword}
					on:change={setErrorState}
					on:input={verifyInput}
					required
				/>
				<Label child="check-password">Confirm Password</Label>
				<input
					class="input input-bordered input-lg w-full"
					type="password"
					name="check-password"
					id="check-password"
					bind:value={checkPassword}
					on:change={setErrorState}
					on:input={verifyInput}
					required
				/>
				{#if isError}
					<Alert role="error" message={errorMessage} />
				{/if}
				<button type="submit" class="btn btn-custom btn-primary">Change password</button>
			</form>
		{:else}
			<!-- Request Reset Form -->
			<form class="flex flex-col" on:submit={requestReset}>
				<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Reset your password</h3>
				<p class="text-sm text-gray-600">
					Enter your email address and we'll send you a link to reset your password.
				</p>
				<div class="mb-6">
					<Label child="email">Email</Label>
					<input
						class="input input-bordered input-lg w-full"
						type="email"
						name="email"
						id="email"
						placeholder="name@company.com"
						bind:value={email}
						required
					/>
				</div>
				{#if isSuccess}
					<Alert role="success" message="Check your email for a link to reset your password." />
				{/if}
				{#if isError}
					<Alert role="error" message={errorMessage} />
				{/if}
				<button type="submit" class="btn btn-custom btn-primary">Send reset link</button>
			</form>
		{/if}
	</div>
</div>
