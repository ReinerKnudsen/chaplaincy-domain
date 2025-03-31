<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import { listAllUsers, type AdminUserData } from '$lib/services/authService';

	let userList: AdminUserData[] = [];
	let loading = true;

	onMount(async () => {
		try {
			userList = await listAllUsers();
		} catch (error) {
			console.error('Error loading users:', error);
		} finally {
			loading = false;
		}
	});

	const handleCreateUser = () => {
		goto('/admin/useradmin/create');
	};
</script>

{#if loading}
	<div class="text-xl font-semibold">Loading user data...</div>
{:else}
	<div class="relative overflow-x-auto">
		<h1>User Management</h1>
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3">Display Name</th>
					<th scope="col" class="px-6 py-3">Email</th>
					<th scope="col" class="px-6 py-3">Role</th>
					<th scope="col" class="px-6 py-3">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each userList as user}
					<tr class="bg-white border-b dark:border-gray-700 dark:bg-gray-800">
						<td class="px-6 py-4">{user.displayName}</td>
						<td class="px-6 py-4">{user.email}</td>
						<td class="px-6 py-4">
							{#if user.customClaims}
								{user.customClaims.role || '-'}
							{:else}
								-
							{/if}
						</td>
						<td class="px-6 py-4">
							<a
								href="/admin/useradmin/{user.uid}"
								class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
							>
								Edit
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="mt-10">
		<Button
			type="button"
			class="w-3/12 bg-primary-80 text-white-primary"
			on:click={handleCreateUser}
		>
			Create user
		</Button>
	</div>
{/if}

<style>
	table {
		display: grid;
		border-collapse: collapse;
		min-width: 100%;
		grid-template-columns:
			minmax(150px, 1fr)
			minmax(150px, 1fr)
			minmax(150px, 1fr)
			minmax(150px, 1fr);
	}
	thead,
	tbody,
	tr {
		display: contents;
	}

	th {
		cursor: pointer;
		background-color: white;
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-align: left;
		padding-top: 0.8rem;
		padding-bottom: 0.8rem;
		padding-left: 0.5rem;
	}
	th,
	td {
		font-size: 0.875rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		@apply text-slate-600;
	}

	td {
		padding-top: 1.2rem;
		padding-bottom: 1.2rem;
		padding-left: 0.5rem;
		@apply border-b border-slate-300;
	}
</style>
