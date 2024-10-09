<script>
	import { authStore } from '$lib/stores/AuthStore';
	import { changeUserRole } from '$lib/services/authService';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	const isEnabled = import.meta.env.VITE_ENABLE_MAKEADMIN === 'true';
	console.log('isEnabled', isEnabled);
	if (!isEnabled) {
		goto('/');
	}

	let auth;

	$: authStore.subscribe((store) => {
		auth = store;
	});

	const setAdminRole = async (email) => {
		const response = await fetch(
			'https://us-central1-chaplaincy-website-bncgn.cloudfunctions.net/setAdminRole',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: email })
			}
		);
		const data = await response.text();
	};

	const makeadmin = () => {
		setAdminRole(auth.user.email);
	};
</script>

<div class="">
	<h1>Make admin</h1>

	{#if auth?.user?.email}
		<div>
			{`Hier kannst Du den User ${auth.user.email} (${auth.user.role}) zum Admin machen :) `}
		</div>
		<form on:submit|preventDefault={makeadmin}>
			<Button type="submit">Make admin</Button>
		</form>
	{:else}
		<div>Es ist kein Benutzer eingeloggt</div>
	{/if}
</div>
