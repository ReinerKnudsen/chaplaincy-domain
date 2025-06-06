<script>
	import { authStore } from '$lib/stores/AuthStore';
	import { changeUserRole } from '$lib/services/authService';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const isEnabled = import.meta.env.VITE_ENABLE_MAKEADMIN === 'true';

	if (!isEnabled) {
		goto('/');
	}

	let auth;

	$: authStore.subscribe((store) => {
		auth = store;
	});

	const makeadmin = async () => {
		if (!auth.user) {
			return;
		} else {
			let result = await changeUserRole(auth.user.email, 'admin');
			if (result) {
				console.info('Benutzer ist nun Admin');
				goto('/');
			}
		}
	};
</script>

<div class="">
	<h1>Make admin</h1>

	{#if auth?.user?.email}
		<div>
			{`Hier kannst Du den User ${auth.user.email} zum Admin machen :) `}
		</div>
		<form on:submit|preventDefault={makeadmin}>
			<Button type="submit">Make admin</Button>
		</form>
	{:else}
		<div>Es ist kein Benutzer eingeloggt</div>
	{/if}
</div>
