<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { getDoc, doc, updateDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';

	import { Label, Input, Select, Button } from 'flowbite-svelte';
	import { updateUserProfile } from '$lib/services/authService';
	import { onMount } from 'svelte';

	const userID = $page.params.userID;
	export let data;
	const user = data.user;
	const docRef = doc(database, 'users', userID);

	const userRoles = [
		{ value: 'user', name: 'User' },
		{ value: 'editor', name: 'Editor' },
		{ value: 'admin', name: 'Admin' }
	];

	onMount(() => {
		// get userdoc from firestore
		getDoc(docRef).then((doc) => {
			user.firstname = doc.data().firstname;
			user.lastname = doc.data().lastname;
		});
	});

	const handleSave = async () => {
		const result = await updateUserProfile(user);
		if (result) {
			updateDoc(docRef, {
				firstname: user.firstname,
				lastname: user.lastname,
				displayName: user.displayName
			});
		}
		goto('/admin/useradmin');
	};

	const handleCancel = () => {
		goto('/admin/useradmin');
	};

	const handleSetRole = async () => {};
</script>

<form on:submit|preventDefault={handleSave}>
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
	<div class="mx-[25%] mb-6 flex flex-row justify-between">
		<Button
			type="button"
			class="w-40 justify-self-center bg-primary-100 align-middle text-white-primary"
			on:click={handleCancel}>Cancel</Button
		>
		<Button
			type="submit"
			class="w-40 justify-self-center bg-primary-100 align-middle text-white-primary">Save</Button
		>
	</div>
</form>

<style>
</style>
