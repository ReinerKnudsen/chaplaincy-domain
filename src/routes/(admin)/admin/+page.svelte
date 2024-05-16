<script>
	import { page } from '$app/stores';
	import { pathName } from '$lib/stores/NavigationStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';

	let auth = getAuth();

	onMount(() => {
		$pathName = $page.url.pathname;

		onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdTokenResult().then((idTokenResult) => {
					if (!['admin', 'editor'].includes(idTokenResult.claims.role)) {
						goto('/');
					}
				});
			} else {
				goto('/');
			}
		});
	});
</script>

<div class="w-100 ml-3">
	<h1>Administration</h1>
	<div>
		<p>This page provides a list of available administration tasks.</p>
		<p>It is only visible to users with Admin or Editor role.</p>
		<h2 class="mb-4 mt-6 text-xl font-bold">Event Management</h2>
		<div>Events list and management options go here.</div>

		<h2 class="mb-4 mt-6 text-xl font-bold">Article Management</h2>
		<div>Articles list and management options go here.</div>

		<h2 class="mb-4 mt-6 text-xl font-bold">User Management</h2>
		<div>User list and management options go here.</div>
	</div>
</div>
