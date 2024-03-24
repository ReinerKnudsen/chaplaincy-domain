<script>
	import '../app.pcss';
	import Navigation from '../lib/Navigation.svelte';
	import { onMount } from 'svelte';

	import { auth } from '../lib/firebase/firebaseConfig';
	import { authStore, unloadUser } from '../lib/stores/AuthStore';
	import { getUserRole, getCurrentUser } from '../lib/services/authService';

	onMount(() => {
		if (!authStore.user) {
			const unsubscribe = auth.onAuthStateChanged(async (user) => {
				if (user) {
					let role = await getUserRole(user);
					authStore.update((curr) => {
						return {
							...curr,
							user: user,
							isLoggedIn: !!user,
							isLoading: false,
							name: user.displayName,
							role: role
						};
					});
				} else {
					unloadUser();
				}
			});
		}
	});
</script>

<Navigation />

<div class="mb-10 ml-20 mt-10">
	<slot />
</div>

<style>
</style>
