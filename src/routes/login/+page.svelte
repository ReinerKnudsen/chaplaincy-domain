<script>
	import { Section, Register } from 'flowbite-svelte-blocks';
	import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
	import { signInExistingUser } from '../../lib/services/authService';
	import { authStore } from '../../lib/stores/AuthStore';
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

<Section name="login">
	<Register href="/">
		<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
			<form class="flex flex-col space-y-6" action="/" on:submit={handleSubmit}>
				<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Login</h3>
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
					<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
						>Forgot password?</a
					>
				</div>
				<Button type="submit" class="w-full1">Sign in</Button>
				<p class="text-sm font-light text-gray-500 dark:text-gray-400">
					Don’t have an account yet? <a
						href="/register"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a
					>
				</p>
			</form>
		</div>
	</Register>
</Section>
