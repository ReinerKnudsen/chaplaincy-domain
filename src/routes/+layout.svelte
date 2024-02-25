<script>
	import '../app.pcss';
	import Navigation from '../lib/Navigation.svelte';
	import { onMount } from 'svelte';
	import { isLoggedIn } from '../lib/stores/AuthStore';
	import { auth } from '../lib/firebase/firebaseConfig';

	onMount(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				isLoggedIn.set(true);
			} else {
				isLoggedIn.set(false);
			}
		});
	});
</script>

<Navigation />

<slot />

<style>
</style>
