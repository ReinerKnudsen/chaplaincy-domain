<script lang="ts">
	import { goto } from '$app/navigation';

	import { userRoles } from '$lib/utils/constants';

	import { createNewUser } from '$lib/services/authService';
	import Label from '$lib/components/Label.svelte';

	type User = {
		firstname: string;
		lastname: string;
		email: string;
		displayName: string;
		uid: string;
		role: string;
	};

	let initUser: User = {
		firstname: '',
		lastname: '',
		email: '',
		displayName: '',
		uid: '',
		role: '',
	};

	let newUser = $state(initUser);

	const resetForm = () => {
		newUser = initUser;
	};

	const create = async (e) => {
		e.preventDefault();
		const user = await createNewUser(newUser);
		goto('/admin/useradmin');
	};
</script>

<div class="flex flex-row justify-center">
	<div class="bg-white-primary w-5/12 space-y-4 rounded-xl p-6 shadow-xl sm:p-8 md:space-y-6">
		<form class="flex flex-col space-y-6" onsubmit={create}>
			<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Create an new account</h3>
			<Label child="firstname">First name *</Label>
			<input
				type="text"
				class="input input-bordered input-lg w-full"
				name="firstname"
				id="firstname"
				placeholder="first name"
				bind:value={newUser.firstname}
				required
			/>
			<Label child="lastname">Last name</Label>
			<input
				type="text"
				name="lastname"
				class="input input-bordered input-lg w-full"
				id="lastname"
				bind:value={newUser.lastname}
				placeholder="last name"
			/>

			<Label child="displayname">Display Name</Label>
			<input
				type="text"
				name="displayName"
				class="input input-bordered input-lg w-full"
				id="displayname"
				bind:value={newUser.displayName}
				placeholder="display name"
			/>
			<Label child="email">Email *</Label>
			<input
				type="email"
				name="email"
				class="input input-bordered input-lg w-full"
				id="email"
				placeholder="name@company.com"
				bind:value={newUser.email}
				required
			/>

			<div class="mb-6">
				<Label child="roles">User role</Label>
				<select class="select select-bordered select-lg w-full" bind:value={newUser.role}>
					{#each userRoles as role}
						<option value={role.value}>{role.name}</option>
					{/each}
				</select>
			</div>

			<button type="submit" class="btn-custom btn btn-primary">Create user</button>
		</form>
	</div>
</div>

<style>
</style>
