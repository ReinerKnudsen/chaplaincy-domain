<script>
	import { page } from '$app/stores';
	import { Label, Input, Select, Button } from 'flowbite-svelte';
	import { userStore } from '$lib/stores/UserStore';
	import { goto } from '$app/navigation';
	import { setUserRole, getUserByID } from '$lib/services/authService';
	import { onMount } from 'svelte';

	const userID = $page.params.userID;

	const userRoles = [
		{ value: 'user', name: 'User' },
		{ value: 'editor', name: 'Editor' },
		{ value: 'admin', name: 'Admin' }
	];

	// if a new role is set in the form
	let newRole = $userStore.role;

	const handleClick = async () => {
		goto('/admin/useradmin');
	};

	const handleSetRole = async () => {
		setUserRole(userID, 'admin');
	};
</script>

<form>
	<div class="mb-6 grid gap-6 md:grid-cols-2">
		<div class="mb-6">
			<Label for="firstname" class="mb-2 block">First Name</Label>
			<Input id="firstname" size="lg" placeholder="First name" bind:value={$userStore.firstname} />
		</div>
		<div class="mb-6">
			<Label for="lastname" class="mb-2 block">Last Name</Label>
			<Input id="lastname" size="lg" placeholder="Last name" bind:value={$userStore.lastname} />
		</div>
		<div class="mb-6">
			<Label for="displayname" class="mb-2 block">Display Name *</Label>
			<Input
				id="displayname"
				size="lg"
				placeholder="Display name"
				bind:value={$userStore.displayname}
				required
			/>
		</div>
		<div class="mb-6">
			<Label for="email" class="mb-2 block">Email</Label>
			<Input id="email" size="lg" placeholder="Email" bind:value={$userStore.email} disabled />
		</div>
		<div class="mb-6">
			<Label>
				User role
				<Select class="mt-2" items={userRoles} bind:value={newRole} />
			</Label>
		</div>
	</div>
	<div class="mb-6 grid">
		<Button type="submit" class=" w-40 justify-self-center align-middle" on:click={handleClick}
			>Save</Button
		>
	</div>
</form>

<style>
</style>
