<script>
	import { page } from '$app/stores';
	import { pathName } from '$lib/stores/NavigationStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { authStore } from '$lib/stores/AuthStore';

	let auth = getAuth();
	let role;

	$: authStore.subscribe((store) => {
		role = store.role;
	});

	onMount(() => {});
</script>

<div class="w-100 ml-3">
	<h1>Administration</h1>
	<div>
		<p>This page provides a list of available administration tasks.</p>
		<p>It is only visible to users with Admin or Editor role.</p>
		<h2 class="mb-4 mt-6 text-xl font-bold">
			<a href="/admin/eventsadmin">Activities Management</a>
		</h2>
		<div>Events list and management options go here.</div>

		<h2 class="mb-4 mt-6 text-xl font-bold"><a href="admin/newsadmin">News Management</a></h2>
		<div>Articles list and management options go here.</div>

		<h2 class="mb-4 mt-6 text-xl font-bold"><a href="admin/weeklysheet">Weekly Sheet Upload</a></h2>
		<div>List and upload weekly sheets</div>

		{#if role === 'admin'}
			<h2 class="mb-4 mt-6 text-xl font-bold"><a href="admin/useradmin">User Management</a></h2>
			<div>User list and management options go here.</div>
		{/if}
	</div>
</div>
