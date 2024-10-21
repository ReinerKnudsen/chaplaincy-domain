<script>
	import { authStore } from '$lib/stores/AuthStore';
	import { changeUserRole } from '$lib/services/authService';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	const isEnabled = import.meta.env.VITE_ENABLE_MAKEADMIN === 'true';

	if (!isEnabled) {
		goto('/');
	}

	let auth;

	$: authStore.subscribe((store) => {
		auth = store;
		console.log(auth.user);
	});

	const setAdminRole = async (email) => {
		result = await changeUserRole(email, 'admin');
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
