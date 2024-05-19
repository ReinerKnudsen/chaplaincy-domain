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

	onMount(async () => {
		userList = await listAllUsers();
	});

	const handleClick = async () => {
		changeUserRole(email, role);
	};
</script>

<Table hoverable={true}>
	<TableHead>
		<TableHeadCell>Display Name</TableHeadCell>
		<TableHeadCell>email</TableHeadCell>
		<TableHeadCell>Role</TableHeadCell>
		<TableHeadCell>Actions</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each userList as user}
			<TableBodyRow class="align-top">
				<TableBodyCell class="font-normal">{user.displayName}</TableBodyCell>
				<TableBodyCell class="font-normal">{user.email}</TableBodyCell>
				<TableBodyCell class="font-normal"
					>{#if user.customClaims}
						{user.customClaims.role}
					{:else}
						-
					{/if}</TableBodyCell
				>
				<TableBodyCell>...</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

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
