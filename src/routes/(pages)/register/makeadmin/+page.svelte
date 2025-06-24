<script lang="ts">
	import { goto } from '$app/navigation';

	import { authStore, type AuthState } from '$lib/stores/AuthStore';
	import { changeUserRole } from '$lib/services/authService';

	const isEnabled = import.meta.env.VITE_ENABLE_MAKEADMIN === 'true';

	if (!isEnabled) {
		goto('/');
	}

	let auth = $state<AuthState>({
		user: null,
		loading: false,
		error: null,
		isLoggedIn: false,
		role: '',
		name: '',
	});

	$effect(() => {
		auth = $authStore;
	});

	const makeadmin = async (e: Event) => {
		e.preventDefault();
		if (!auth.user || !auth.user.email) {
			return;
		}
		await changeUserRole(auth.user.email, 'admin');
		console.info('Benutzer ist nun Admin');
		goto('/');
	};
</script>

<div class="">
	<h1>Make admin</h1>

	{#if auth?.user?.email}
		<div>
			{`Hier kannst Du den User ${auth.user.email} zum Admin machen :) `}
		</div>
		<form onsubmit={makeadmin}>
			<button class="btn btn-custom btn-primary" type="submit">Make admin</button>
		</form>
	{:else}
		<div>Es ist kein Benutzer eingeloggt</div>
	{/if}
</div>
