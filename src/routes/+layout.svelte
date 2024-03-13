<script>
	import '../app.pcss';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { doc, getDoc } from 'firebase/firestore';

	import { userColRef, auth } from '../lib/firebase/firebaseConfig';
	import { authStore, authUser, unloadUser } from '../lib/stores/AuthStore';
	import { getUserDoc } from '../lib/services/authService';
	import Navigation from '../lib/Navigation.svelte';

	onMount(() => {
		if (!authStore.user) {
			const unsubscribe = auth.onAuthStateChanged((user) => {
				if (user) {
					console.log('User is logged in');
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
					console.log('AuthStore: ', $authStore);
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
