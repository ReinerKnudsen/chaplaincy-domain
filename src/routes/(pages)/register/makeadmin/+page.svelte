<script lang="ts">
	import { goto } from '$app/navigation';

	import { authStore, type AuthState } from '$lib/stores/AuthStore';
	import { changeUserRole, countAdmins } from '$lib/services/authService';
	import { notificationStore } from '$lib/stores/notifications';

	import { Button } from '$lib/components/ui/button';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import { onMount } from 'svelte';

	const isEnabled = import.meta.env.VITE_ENABLE_MAKEADMIN === 'true';
	let loading = $state(true);

	onMount(async () => {
		if (await checkNoOfAdmins()) {
			goto('/');
			loading = false;
		}
	});

	const checkNoOfAdmins = async () => {
		const numberOfAdmins = await countAdmins();
		if (numberOfAdmins && numberOfAdmins === 0) {
			return false; // we have no admin
		} else {
			return true; // we have an admin
		}
	};

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

	const makeadmin = async () => {
		if (!auth.user || !auth.user.email) {
			return;
		}
		try {
			await changeUserRole(auth.user.email, 'admin');
			notificationStore.addToast('success', 'The user is now Admin', 3000);
		} catch (error) {
			notificationStore.addToast('error', 'Something went wrong. Please try again.', 0);
			console.error(error);
		}
	};
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	<div class="">
		<h1>Make admin</h1>
		{#if auth?.user?.email}
			<div class="py-5">
				{`Hier kannst Du den User ${auth.user.email} zum Admin machen :) `}
			</div>
			<form onsubmit={makeadmin}>
				<Button variant="primary" type="submit">Make admin</Button>
			</form>
		{:else}
			<div>Es ist kein Benutzer eingeloggt</div>
		{/if}
	</div>
{/if}

<ToastContainer />
