<script lang="ts">
	import { goto } from '$app/navigation';

	import { signInExistingUser } from '$lib/services/authService';
	import { authStore } from '$lib/stores/AuthStore';
	import { notificationStore } from '$lib/stores/notifications';

	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let thisPassword = $state('');
	let thisEmail = $state('');
	let error = $state('');

	let isValid = $derived(!!thisEmail && !!thisPassword);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		let response = await signInExistingUser(thisEmail, thisPassword);
		if (!!response) {
			$authStore.role === 'admin' || $authStore.role === 'editor' ? goto('/admin') : goto('/');
		} else {
			notificationStore.addToast('error', 'Whoops. Signing you in I could not. Again try you may want.');
			error = 'Invalid email or password';
		}
	};
</script>

<div class="flex flex-row justify-center">
	<div class="bg-white-primary w-[80%] space-y-4 rounded-xl p-6 shadow-xl sm:p-8 md:space-y-6 lg:w-5/12">
		<form class="flex flex-col space-y-6" action="/" onsubmit={handleSubmit}>
			<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Login</h3>
			<div class="form-control w-full">
				<Label for="email">Your email</Label>
				<Input type="email" id="email" placeholder="name@company.com" autocomplete="username" bind:value={thisEmail} />
			</div>

			<div class="form-control w-full">
				<Label for="password">Your password</Label>
				<Input type="password" placeholder="•••••" autocomplete="current-password" bind:value={thisPassword} />
			</div>
			<div class="flex items-start">
				<a href="/passwordreset" class="link">Forgot password?</a>
			</div>

			<Button variant="primary" disabled={!isValid} type="submit">Sign in</Button>
		</form>
	</div>
</div>

<ToastContainer />
