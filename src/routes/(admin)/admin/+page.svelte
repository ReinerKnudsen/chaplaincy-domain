<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/AuthStore';

	let role: string | null = null;

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
		<div class="item">
			<h2 class="w-60 text-xl font-bold">
				<a href="/admin/eventsadmin">Events Management</a>
			</h2>
			<div>Create, edit, list, duplicate and delete events</div>
		</div>
		<div class="item">
			<h2 class="w-60 text-xl font-bold"><a href="admin/newsadmin">News Management</a></h2>
			<div>Create, edit, list and delete news articles</div>
		</div>
		<div class="item">
			<h2 class="w-60 text-xl font-bold">
				<a href="admin/locationsadmin">Locations Management</a>
			</h2>
			<div>Create, edit, list and delete locations</div>
		</div>
		<div class="item">
			<h2 class="w-60 text-xl font-bold"><a href="admin/weeklysheet">Weekly Sheet Upload</a></h2>
			<div>Upload and list weekly sheets</div>
		</div>
		{#if role === 'admin'}
			<div class="item">
				<h2 class="w-60 text-xl font-bold"><a href="admin/useradmin">User Management</a></h2>
				<div>Create, edit, list and delete users</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.item {
		margin: 16px 0 16px 0;
		display: flex;
		flex-direction: row;
		gap: 80px;
		align-items: center;
		justify-items: space-between;
	}
</style>
