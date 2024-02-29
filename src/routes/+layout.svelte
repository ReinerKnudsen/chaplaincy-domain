<script>
	import '../app.pcss';
	import Navigation from '../lib/Navigation.svelte';
	import { onMount } from 'svelte';
	import { authStore } from '../lib/stores/AuthStore';
	import { auth } from '../lib/firebase/firebaseConfig';
</script>

<Navigation />

<slot />

<style>
</style>
