<script>
	import '/src/app.pcss';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	import '@fontsource-variable/raleway';

	import { auth, firebaseApp } from '$lib/firebase/firebaseConfig';
	import { authStore, unloadUser } from '$lib/stores/AuthStore';
	import { getUserRole } from '$lib/services/authService';

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

<div class="my-5 lg:my-10 xl:my-10">
	<slot />
</div>

<Footer />

<style>
</style>
