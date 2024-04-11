<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { getAllUserProfiles, changeUserRole } from '$lib/services/authService';

	import { Label, Select, Input, Button } from 'flowbite-svelte';

	import { pathName } from '$lib/stores/NavigationStore';

	// onMount(() => {
	// 	$pathName = $page.url.pathname;
	// 	let allUsers = getAllUserProfiles();
	// 	console.log(allUsers);
	// });

	let role;
	let email;
	let roles = [
		{ value: 'user', name: 'User' },
		{ value: 'editor', name: 'Editor' },
		{ value: 'admin', name: 'Admin' }
	];

	const handleClick = async () => {
		console.log(email, role);
		changeUserRole(email, role);
	};
</script>

<div class="ml-11 flex w-6/12 flex-col justify-center">
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
