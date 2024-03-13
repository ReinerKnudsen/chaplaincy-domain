<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import { auth } from '../../lib/firebase/firebaseConfig';
	import { authStore } from '$lib/stores/AuthStore.js';
	import { unloadUser } from '../../lib/stores/AuthStore';

	import Sidebar from '$lib/components/Sidebar.svelte';

	onMount(() => {
		// Check if user is authenticated
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
		if (!authStore.user && !authStore.isLoading && window.location.pathname !== '/') {
			window.location.href = '/login'; // Redirect to login page if not logged in
		}
	});
</script>

{#if !!authStore.user}
	<div class="page-container">
		<div class="sidebar col-span-1 ml-2 mt-8">
			<Sidebar />
		</div>
		<div class="main-content col-span-11 p-5">
			<slot />
		</div>
	</div>
{/if}

<style>
	.page-container {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
	}
</style>
