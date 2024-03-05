<script>
	import '../app.pcss';
	import Navigation from '../lib/Navigation.svelte';
	import { onMount } from 'svelte';
	import { authStore } from '../lib/stores/AuthStore';
	import { auth } from '../lib/firebase/firebaseConfig';
</script>

<Navigation />

<div class="mb-10 ml-20 mt-10">
	<slot />
</div>

<style>
</style>
