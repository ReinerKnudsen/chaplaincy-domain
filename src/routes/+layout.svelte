<script lang="ts">
	import '../app.css';
	import { onDestroy, onMount } from 'svelte';
	import '@fontsource/inter';

	import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
	
	import { authStore, unloadUser, type AuthState } from '$lib/stores/AuthStore';
	import { stopListening } from '$lib/stores/ScreenSizeStore';
	import { getUserRole } from '$lib/services/authService';
	
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let unsubscribe: () => void;

	const auth = getAuth();

	const clearUser = () => {
		unloadUser();
	};

	/** Initialize the AuthStateListener */
	onMount(() => {
		if (!$authStore.user) {
			unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
				if (user) {
					const token = await user.getIdToken();
					sessionStorage.setItem('accessToken', token);
					const role = await getUserRole(user);
					authStore.update((curr: AuthState) => {
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
		return () => {
			if (unsubscribe) unsubscribe();
			stopListening();
		};
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
