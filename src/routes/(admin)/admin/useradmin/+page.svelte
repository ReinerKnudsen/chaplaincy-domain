<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { changeUserRole, listAllUsers } from '$lib/services/authService';
	import { httpsCallable } from 'firebase/functions';

	import {
		Label,
		Select,
		Input,
		Button,
		Table,
		TableBody,
		TableHead,
		TableBodyRow,
		TableHeadCell,
		TableBodyCell
	} from 'flowbite-svelte';

	import { pathName } from '$lib/stores/NavigationStore';

	let role;
	let email;
	let roles = [
		{ value: 'user', name: 'User' },
		{ value: 'editor', name: 'Editor' },
		{ value: 'admin', name: 'Admin' }
	];
	let userList = [];
	let loading = true;

	onMount(async () => {
		userList = await listAllUsers();
		loading = false;
	});

	const handleClick = async () => {
		changeUserRole(email, role);
	};
</script>

{#if loading}
	<div class="text-xl font-semibold">Loading user data...</div>
{:else}
	<table>
		<thead>
			<tr>
				<th>Display Name</th>
				<th>email</th>
				<th>Role</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each userList as user}
				<tr>
					<td>{user.displayName}</td>
					<td>{user.email}</td>
					<td>
						{#if user.customClaims}
							{user.customClaims.role}
						{:else}
							-
						{/if}
					</td>
					<td>
						<a
							href="/admin/useradmin/{user.uid}"
							class="text-primary-600 dark:text-primary-500 font-medium hover:underline">Edit</a
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
<div class="ml-11 mt-20 flex w-6/12 flex-col justify-center">
	<Label class="mb-7">
		<span>Input email</span>
		<Input class="mt-2" type="email" placeholder="email" size="lg" bind:value={email} />
	</Label>
	<Label class="mb-7">
		Select a role to assign
		<Select class="mt-2" items={roles} bind:value={role} />
	</Label>
	<Button class="w-4/12" on:click={handleClick}>Set role</Button>
</div>

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
