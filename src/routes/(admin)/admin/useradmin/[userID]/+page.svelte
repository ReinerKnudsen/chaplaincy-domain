<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { getDoc, doc, updateDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';

	import { updateUserProfile, countAdmins } from '$lib/services/authService';

	import Label from '$lib/components/Label.svelte';
	import { userRoles } from '$lib/utils/constants';

	const userID = $page.params.userID;
	export let data;
	let currentUser = data.user;
	const docRef = doc(database, 'users', userID);
	let numberOfAdmins;

	const errorObject = {
		emailErr: '',
		roleErr: '',
	};

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
			<Label class="mb-2 block" child="firstname">First Name</Label>
			<input
				id="firstname"
				class="input input-bordered input-lg w-full"
				placeholder="First name"
				bind:value={currentUser.firstname}
			/>
		</div>
		<div class="mb-6">
			<Label child="lastname" class="mb-2 block">Last Name</Label>
			<input
				id="lastname"
				class="input input-bordered input-lg w-full"
				placeholder="Last name"
				bind:value={currentUser.lastname}
			/>
		</div>
		<div class="mb-6">
			<Label child="displayname" class="mb-2 block">Display Name *</Label>
			<input
				id="displayname"
				class="input input-bordered input-lg w-full"
				placeholder="Display name"
				bind:value={currentUser.displayName}
				required
			/>
		</div>
		<div class="mb-6">
			<Label child="email" class="mb-2 block">Email</Label>
			<input
				id="email"
				class="input input-bordered input-lg w-full"
				placeholder="Email"
				bind:value={currentUser.email}
				disabled
			/>
		</div>
		<div class="mb-6">
			<Label child="role" class="mb-2 block">User role</Label>
			<select class="select select-bordered select-lg w-full" d bind:value={currentUser.role}>
				{#each userRoles as role}
					<option value={role.value}>{role.name}</option>
				{/each}
			</select>
		</div>
		{#if errorObject.roleErr}
			<div class="mb-6 flex w-full items-center justify-center font-semibold text-red-800">
				{errorObject.roleErr}
			</div>
		{/if}
	</div>

	<div class="mx-[25%] mb-6 flex flex-row justify-between">
		<button type="button" class="btn-custom btn-custom-secondary" on:click={handleCancel}
			>Cancel</button
		>
		<button type="submit" class="btn-custom btn btn-primary">Save</button>
	</div>
</form>

<style>
</style>
