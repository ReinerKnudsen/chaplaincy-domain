<script>
	import { page } from '$app/stores';
	import { Label, Input, Select, Button } from 'flowbite-svelte';
	import { userStore } from '$lib/stores/UserStore';
	import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
	import { userColRef } from '$lib/firebase/firebaseConfig';
	import { goto } from '$app/navigation';
	import { setUserRole } from '$lib/services/authService';

	const userID = $page.params.userID;

	const userRoles = [
		{ value: 'user', name: 'User' },
		{ value: 'editor', name: 'Editor' },
		{ value: 'admin', name: 'Admin' }
	];

	const loadUser = async () => {
		const userDocRef = doc(userColRef, userID);
		const snapshot = await getDoc(userDocRef);
		if (snapshot.exists()) {
			await userStore.set(snapshot.data());
		} else {
			console.log('No such document!');
		}
	};

	loadUser();

	const handleClick = async () => {
		const userDocRef = doc(userColRef, userID);
		await setDoc(userDocRef, {
			firstname: $userStore.firstname,
			lastname: $userStore.lastname,
			displayname: $userStore.displayname,
			email: $userStore.email,
			role: $userStore.role
		});
		goto('/admin/useradmin');
	};

	const handleMakeAdmin = async () => {
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

		<Button on:click={handleMakeAdmin} class="h-12 w-40 justify-self-center align-middle"
			>Make Admin</Button
		>
		<!-- <div class="mb-6">
			<Label>
				User role *
				<Select class="mt-2" items={userRoles} bind:value={$userStore.role} required />
			</Label>
		</div> -->
	</div>
	<div class="mb-6 grid">
		<Button type="submit" class=" w-40 justify-self-center align-middle" on:click={handleClick}
			>Save</Button
		>
	</div>
</form>

<style>
</style>
