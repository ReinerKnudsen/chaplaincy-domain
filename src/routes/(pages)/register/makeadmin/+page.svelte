<script>
	import { run, preventDefault } from 'svelte/legacy';

	import { goto } from '$app/navigation';

	import { authStore } from '$lib/stores/AuthStore';
	import { changeUserRole } from '$lib/services/authService';

	const isEnabled = import.meta.env.VITE_ENABLE_MAKEADMIN === 'true';

	if (!isEnabled) {
		goto('/');
	}

	let auth = $state();

	run(() => {
		authStore.subscribe((store) => {
			auth = store;
		});
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
		<form onsubmit={preventDefault(makeadmin)}>
			<button class="btn btn-custom btn-primary" type="submit">Make admin</button>
		</form>
	{:else}
		<div>Es ist kein Benutzer eingeloggt</div>
	{/if}
</div>
