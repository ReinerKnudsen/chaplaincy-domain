<script lang="ts">
	import { onMount } from 'svelte';
	import { Section, Register } from 'flowbite-svelte-blocks';
	import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
	import { registerUser } from '../../lib/services/authService';
	import { goto } from '$app/navigation';

	onMount(() => {
		document.getElementById('firstname').focus();
	});

	let errorObject = {
		emailErr: '',
		passwordErr: '',
		confirmPasswordErr: '',
		nameErr: ''
	};

	let password: string = '';
	let confirmPassword: string = '';
	let passwordError: boolean = false;

	let newUser = {
		firstname: '',
		lastname: '',
		email: '',
		displayname: ''
	};

	const register = async (e) => {
		e.preventDefault();

		// match password validation
		if (confirmPassword === password) {
			let response = await registerUser(newUser, password);
			if (response) {
				goto('/');
			}
		} else {
			passwordError = true;
		}
	};
</script>

<Section name="register">
	<Register href="/">
		<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
			<form class="flex flex-col space-y-6" on:submit={register}>
				<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Create an new account</h3>
				<Label class="space-y-2">
					<span><strong>Your firstname *</strong></span>
					<Input
						type="text"
						name="firstname"
						id="firstname"
						placeholder="your first name"
						autocomplete="current-name"
						bind:value={newUser.firstname}
						required
					/>
				</Label>
				<Label class="space-y-2">
					<span>Your last name</span>
					<Input
						type="text"
						name="lastname"
						id="lastname"
						bind:value={newUser.lastname}
						placeholder="your last name"
						autocomplete="family-name"
					/>
				</Label>
				<Label class="space-y-2">
					<span><strong>Your email *</strong></span>
					<Input
						type="email"
						name="email"
						id="email"
						placeholder="name@company.com"
						bind:value={newUser.email}
						autocomplete="email"
						required
					/>
				</Label>

				<Label class="space-y-2">
					<span><strong>Your password * </strong></span>
					<Input
						type="password"
						name="password"
						id="password"
						placeholder="•••••"
						bind:value={password}
						autocomplete="new-password"
						required
					/>
					{#if passwordError}
						<p class="error text-sm font-semibold text-red-700">The passwords don't match</p>
					{/if}
				</Label>
				<Label class="space-y-2">
					<span><strong>Confirm password *</strong></span>
					<Input
						type="password"
						name="confirm-password"
						id="confirm-password"
						placeholder="•••••"
						bind:value={confirmPassword}
						required
						autocomplete="new-password"
					/>
				</Label>
				<div class="flex items-start">
					<Checkbox required
						>I accept the <a
							class="font-medium text-primary-600 hover:underline dark:text-primary-500"
							href="/"
						>
							Terms and Conditions</a
						></Checkbox
					>
				</div>
				<Button type="submit" class="w-full1">Create an account</Button>
				<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
					Already have an account? <a
						href="/login"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a
					>
				</div>
			</form>
		</div>
	</Register>
</Section>

<style>
</style>
