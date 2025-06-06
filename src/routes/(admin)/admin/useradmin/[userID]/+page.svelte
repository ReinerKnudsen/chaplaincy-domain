<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { getDoc, doc, updateDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';

	import { Label, Input, Select, Button } from 'flowbite-svelte';
	import { updateUserProfile, countAdmins } from '$lib/services/authService';
	import { onMount } from 'svelte';

	const userID = $page.params.userID;
	export let data;
	let currentUser = data.user;
	const docRef = doc(database, 'users', userID);
	let numberOfAdmins;

	const errorObject = {
		emailErr: '',
		roleErr: '',
	};

	const userRoles = [
		{ value: 'editor', name: 'Editor' },
		{ value: 'admin', name: 'Admin' },
	];

	onMount(async () => {
		const doc = await getDoc(docRef);
		currentUser = {
			...currentUser,
			firstname: doc.data().firstname,
			lastname: doc.data().lastname,
		};
		numberOfAdmins = await countAdmins();
	});

	const handleSave = async () => {
		/** we must prevent to have the final admin being changed */
		if (data.user.role === 'admin' && currentUser.role !== 'admin' && numberOfAdmins === 1) {
			currentUser.role = 'admin';
			errorObject.roleErr = 'You can not override the only admin.';
			return;
		} else {
			errorObject.roleErr = '';
			try {
				const result = await updateUserProfile(currentUser);
				if (result) {
					updateDoc(docRef, {
						firstname: currentUser.firstname,
						lastname: currentUser.lastname,
						displayName: currentUser.displayName,
					});
				}
			} catch (error) {
				console.error("Couldn't update user profile: ", error);
			}
			goto('/admin/useradmin');
		}
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
			<Input id="firstname" size="lg" placeholder="First name" bind:value={currentUser.firstname} />
		</div>
		<div class="mb-6">
			<Label for="lastname" class="mb-2 block">Last Name</Label>
			<Input id="lastname" size="lg" placeholder="Last name" bind:value={currentUser.lastname} />
		</div>
		<div class="mb-6">
			<Label for="displayname" class="mb-2 block">Display Name *</Label>
			<Input
				id="displayname"
				size="lg"
				placeholder="Display name"
				bind:value={currentUser.displayName}
				required
			/>
		</div>
		<div class="mb-6">
			<Label for="email" class="mb-2 block">Email</Label>
			<Input id="email" size="lg" placeholder="Email" bind:value={currentUser.email} disabled />
		</div>
		<div class="mb-6">
			<Label for="role" class="mb-2 block">User role</Label>
			<Select class="mt-2" items={userRoles} bind:value={currentUser.role} />
		</div>
		{#if errorObject.roleErr}
			<div class="mb-6 flex w-full items-center justify-center font-semibold text-red-800">
				{errorObject.roleErr}
			</div>
		{/if}
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
