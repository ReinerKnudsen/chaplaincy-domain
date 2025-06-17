<script>
	import { run } from 'svelte/legacy';

	import { signInExistingUser } from '$lib/services/authService';
	import { authStore } from '$lib/stores/AuthStore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let thisPassword = $state('');
	let thisEmail = $state('');
	let error = $state('');

	onMount(() => {
		document.getElementById('email').focus();
	});
	run(() => {
		error = authStore.error;
	});

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
		class="bg-white-primary w-[80%] space-y-4 rounded-xl p-6 shadow-xl sm:p-8 md:space-y-6 lg:w-5/12"
	>
		<form class="flex flex-col space-y-6" action="/" onsubmit={handleSubmit}>
			<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Login</h3>
			<div class="form-control w-full">
				<label for="email" class="label">
					<span class="label-text">Your email</span>
				</label>
				<input
					type="email"
					id="email"
					placeholder="name@company.com"
					class="input input-bordered w-full"
					autocomplete="username"
					bind:value={thisEmail}
					required
				/>
			</div>

			<div class="form-control w-full">
				<label for="password" class="label">
					<span class="label-text">Your password</span>
				</label>
				<input
					type="password"
					placeholder="•••••"
					class="input input-bordered w-full"
					autocomplete="current-password"
					bind:value={thisPassword}
					required
				/>
			</div>
			{#if error}
				<div class="text-error font-semibold">{error}</div>
			{/if}

			<div class="flex items-start">
				<a href="/passwordreset" class="link">Forgot password?</a>
			</div>

			<button type="submit" class="btn btn-primary w-full">Sign in</button>
		</form>
	</div>
</div>
