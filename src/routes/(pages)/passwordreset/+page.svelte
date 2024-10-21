<script>
	import { getAuth, confirmPasswordReset } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { Button, Label, Input, Helper } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let newPassword = '';
	let checkPassword = '';
	let oobCode;
	let isError = false;

	onMount(() => {
		// Extrahiere den Token aus der URL
		const urlParams = new URLSearchParams(window.location.search);
		oobCode = urlParams.get('oobCode');
	});

	// Funktion zum Zurücksetzen des Passworts

	/**
	 * TODO: An dieser Stelle könnte noch eine Confirmation kommen
	 */
	const resetPassword = async () => {
		const auth = getAuth();
		try {
			await confirmPasswordReset(auth, oobCode, newPassword);
			goto('/login');
		} catch (error) {
			console.log('Error - could not reset password: ', error.message);
		}
	};

	const setErrorState = () => {
		if (newPassword && checkPassword && newPassword !== checkPassword) {
			isError = true;
			return;
		} else {
			isError = false;
		}
	};

	const resetUserPassword = (e) => {
		e.preventDefault();
		if (newPassword && checkPassword && newPassword !== checkPassword) {
			isError = true;
			return;
		} else {
			isError = false;
			resetPassword();
		}
	};

	const verifyInput = () => {
		if (isError) {
			isError = false;
			return;
		}
	};
</script>

<div class="flex flex-row justify-center">
	<div class="w-5/12 space-y-4 rounded-xl bg-white-primary p-6 shadow-xl sm:p-8 md:space-y-6">
		<form class="flex flex-col space-y-6" on:submit={resetUserPassword}>
			<h3 class="dark:text-white p-0 text-xl font-medium text-gray-900">
				Set or reset your password
			</h3>
			<Label class="space-y-2" for="new-password">
				<span><strong>Password *</strong></span>
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
				<span><strong>Repeat Password *</strong></span>
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
				<Helper class="mt-2" color="red">
					<span class="font-medium">Whoops!</span>
					The passwords don't match..
				</Helper>
			{/if}
			<Button type="submit" class="w-full  bg-primary-80 text-white-primary">Change password</Button
			>
		</form>
	</div>
</div>
