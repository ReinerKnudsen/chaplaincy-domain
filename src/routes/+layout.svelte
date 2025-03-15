<script>
	import '/src/app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onDestroy, onMount } from 'svelte';

	import '@fontsource/inter';

	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { firebaseApp } from '$lib/firebase/firebaseConfig';
	import { authStore, unloadUser } from '$lib/stores/AuthStore';
	import { getUserRole } from '$lib/services/authService';

	let unsubscribe;

	export let data;
	const routes = data.routes;

	const auth = getAuth();

	const clearUser = () => {
		unloadUser();
	};

	/** Wir initialisieren den AuthStateListener */
	onMount(() => {
		if (!authStore.user) {
			unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					sessionStorage.setItem('accessToken', user.accessToken);
					const role = await getUserRole(user);
					authStore.update((curr) => {
						return {
							...curr,
							user: user,
							isLoggedIn: !!user,
							isLoading: false,
							name: user.displayName || 'no-name',
							role: role,
						};
					});
				} else {
					unloadUser();
				}
			});
		}
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<Navigation />

<div class="main-layout md:my-10 xl:my-10">
	<slot />
</div>

<Footer />
