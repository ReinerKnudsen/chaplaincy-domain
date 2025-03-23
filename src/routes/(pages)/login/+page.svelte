<script>
	import { Button, Label, Input } from 'flowbite-svelte';
	import { signInExistingUser } from '$lib/services/authService';
	import { authStore } from '$lib/stores/AuthStore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let thisPassword = '';
	let thisEmail = '';
	let error = '';

	onMount(() => {
		document.getElementById('email').focus();
	});
	$: error = authStore.error;

	async function handleSubmit(event) {
		event.preventDefault();
		let response = await signInExistingUser(thisEmail, thisPassword);
		if (!!response) {
			$authStore.isEditor ? goto('/admin') : goto('/');
		} else {
			error = 'Invalid email or password';
		}
	}
</script>

<div class="flex flex-row justify-center">
	<div
		class="w-[80%] space-y-4 rounded-xl bg-white-primary p-6 shadow-xl sm:p-8 md:space-y-6 lg:w-5/12"
	>
		<form class="flex flex-col space-y-6" action="/" on:submit={handleSubmit}>
			<h3 class="dark:text-white p-0 text-xl font-medium text-gray-900">Login</h3>
			<Label class="space-y-2">
				<span>Your email</span>
				<Input
					type="email"
					name="email"
					id="email"
					placeholder="name@company.com"
					autocomplete="username"
					bind:value={thisEmail}
					required
				/>
			</Label>
			<Label class="space-y-2">
				<span>Your password</span>
				<Input
					type="password"
					name="password"
					placeholder="•••••"
					autocomplete="current-password"
					required
					bind:value={thisPassword}
				/>
			</Label>
			<div class="error text-base font-semibold text-red-700" hidden={!error}>
				{error}
			</div>
			<div class="flex items-start">
				<a href="/" class="border-b-2 border-b-purple-100 pb-1">Forgot password?</a>
			</div>
			<Button type="submit" class="w-full bg-primary-80 text-white-primary">Sign in</Button>
			<!--<p class="text-sm font-light text-gray-500 dark:text-gray-400">
				Don’t have an account yet? <a
					href="/register"
					class="text-primary-600 dark:text-primary-500 font-medium hover:underline">Sign up</a
				>
			</p> -->
		</form>
	</div>
</div>
