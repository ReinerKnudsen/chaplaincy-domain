<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import { auth } from '../../lib/firebase/firebaseConfig';
	import { unloadUser, authStore } from '../../lib/stores/AuthStore';
	import { getUserDoc } from '../../lib/services/authService';

	import Sidebar from '$lib/components/Sidebar.svelte';

	onMount(() => {
		// Check if user is authenticate
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				getUserDoc(user.uid).then((doc) => {
					authStore.update((curr) => {
						return {
							...curr,
							isLoggedIn: !!user,
							isLoading: false,
							firstname: doc.firstname,
							lastname: doc.lastname,
							role: doc.role,
							isEditor: doc.role === 'editor' || doc.role === 'admin',
							user: user
						};
					});
				});
			} else {
				unloadUser();
			}
		});
		console.log($authStore.user, '  /  ', $authStore.loading, '  /  ', window.location.pathname);
		if (!$authStore.user && !$authStore.loading && window.location.pathname !== '/admin') {
			window.location.href = '/login'; // Redirect to login page if not logged in
		}
	});
</script>

<div class="page-container">
	<div class="sidebar col-span-1 ml-2 mt-8">
		<Sidebar />
	</div>
	<div class="main-content col-span-11 p-5">
		<slot />
	</div>
</div>

<style>
	.page-container {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
	}
</style>
