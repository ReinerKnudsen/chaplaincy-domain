<script>
	import '../app.pcss';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { doc, getDoc } from 'firebase/firestore';

	import { userColRef, auth } from '../lib/firebase/firebaseConfig';
	import { authStore, unloadUser } from '../lib/stores/AuthStore';
	import { getUserDoc, getUserRole } from '../lib/services/authService';
	import Navigation from '../lib/Navigation.svelte';

	onMount(() => {
		if (!authStore.user) {
			console.log('User laden');
			const unsubscribe = auth.onAuthStateChanged(async (user) => {
				if (user) {
					let role = await getUserRole(user);
					let doc = await getUserDoc(user.uid);
					authStore.update((curr) => {
						return {
							...curr,
							user: user,
							isLoggedIn: !!user,
							isLoading: false,
							firstname: doc.firstname,
							lastname: doc.lastname,
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
