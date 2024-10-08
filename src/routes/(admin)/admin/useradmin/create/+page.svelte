<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { User } from '../../../../../lib/types';
	import { Button, Label, Input, Select } from 'flowbite-svelte';
	import { createNewUser } from '../../../../../lib/services/authService';

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
		role: ''
	};

	let errorObject = {
		emailErr: '',
		nameErr: ''
	};

	let password = '';
	let confirmPassword = '';
	let passwordError = false;

	const userRoles = [
		{ value: 'editor', name: 'Editor' },
		{ value: 'admin', name: 'Admin' }
	];

	let newUser = initUser;

	onMount(() => {
		document.getElementById('firstname').focus();
	});

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
	<div class="w-5/12 space-y-4 rounded-xl bg-white-primary p-6 shadow-xl sm:p-8 md:space-y-6">
		<form class="flex flex-col space-y-6" on:submit={create}>
			<h3 class="dark:text-white p-0 text-xl font-medium text-gray-900">Create an new account</h3>
			<Label class="space-y-2">
				<span><strong>First name *</strong></span>
				<Input
					type="text"
					name="firstname"
					id="firstname"
					placeholder="first name"
					bind:value={newUser.firstname}
					required
				/>
			</Label>
			<Label class="space-y-2">
				<span>Last name</span>
				<Input
					type="text"
					name="lastname"
					id="lastname"
					bind:value={newUser.lastname}
					placeholder="last name"
				/>
			</Label>
			<Label class="space-y-2">
				<span>Display Name</span>
				<Input
					type="text"
					name="displayName"
					id="displayname"
					bind:value={newUser.displayName}
					placeholder="display name"
				/>
			</Label>
			<Label class="space-y-2">
				<span><strong>Email *</strong></span>
				<Input
					type="email"
					name="email"
					id="email"
					placeholder="name@company.com"
					bind:value={newUser.email}
					required
				/>
			</Label>

			<div class="mb-6">
				<Label for="role" class="mb-2 block">User role</Label>
				<Select class="mt-2" items={userRoles} bind:value={newUser.role} />
			</div>

			<Button type="submit" class="w-full  bg-primary-80 text-white-primary">Create user</Button>
		</form>
	</div>
</div>

<style>
</style>
