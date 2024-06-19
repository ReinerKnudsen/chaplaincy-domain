<script>
	import { page } from '$app/stores';
	import { Label, Input, Select, Button } from 'flowbite-svelte';
	import { userStore } from '$lib/stores/UserStore';
	import { goto } from '$app/navigation';
	import { setUserRole, updateUserProfile } from '$lib/services/authService';
	import { onMount } from 'svelte';

	const userID = $page.params.userID;
	export let data;
	const user = { ...data };

	const userRoles = [
		{ value: 'user', name: 'User' },
		{ value: 'editor', name: 'Editor' },
		{ value: 'admin', name: 'Admin' }
	];

	let loading = false;

	onMount(() => {
		let separator;
		user.displayName.includes('_') ? (separator = '_') : (separator = ' ');
		console.log('separtor: ', separator);
		[user.firstname, user.lastname] = user.displayName.split(separator);
	});

	const handleSave = async () => {
		const result = await updateUserProfile(user);
		console.log(result);
		goto('/admin/useradmin');
	};

	const handleSetRole = async () => {
		setUserRole(userID, 'admin');
	};
</script>

{#if loading}
	<div class="text-xl font-semibold">Loading...</div>
{:else}
	<form>
		<div class="mb-6 grid gap-6 md:grid-cols-2">
			<div class="mb-6">
				<Label for="firstname" class="mb-2 block">First Name</Label>
				<Input id="firstname" size="lg" placeholder="First name" bind:value={user.firstname} />
			</div>
			<div class="mb-6">
				<Label for="lastname" class="mb-2 block">Last Name</Label>
				<Input id="lastname" size="lg" placeholder="Last name" bind:value={user.lastname} />
			</div>
			<div class="mb-6">
				<Label for="displayname" class="mb-2 block">Display Name *</Label>
				<Input
					id="displayname"
					size="lg"
					placeholder="Display name"
					bind:value={user.displayName}
					required
				/>
			</div>
			<div class="mb-6">
				<Label for="email" class="mb-2 block">Email</Label>
				<Input id="email" size="lg" placeholder="Email" bind:value={user.email} disabled />
			</div>
			<div class="mb-6">
				<Label for="role" class="mb-2 block">User role</Label>
				<Select class="mt-2" items={userRoles} bind:value={user.role} />
			</div>
		</div>
		<div class="mb-6 grid">
			<Button type="submit" class=" w-40 justify-self-center align-middle" on:click={handleSave}
				>Save</Button
			>
		</div>
	</form>
{/if}

<style>
</style>
