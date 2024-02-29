<script>
	import { page } from '$app/stores';
	import { Label, Input, Select } from 'flowbite-svelte';
	import { userStore } from '$lib/stores/UserStore';
	import { doc, setDoc, getDoc } from 'firebase/firestore';
	import { userColRef } from '$lib/firebase/firebaseConfig';

	const userID = $page.params.userID;
	console.log('useradmin/[userID]: userID: ', userID);

	const userRoles = [
		{ value: 'admin', name: 'Admin' },
		{ value: 'user', name: 'User' },
		{ value: 'editor', name: 'Editor' }
	];

	const loadUser = async () => {
		const userDocRef = doc(userColRef, userID);
		const snapshot = await getDoc(userDocRef);
		if (snapshot.exists()) {
			// set the authUser store with the authenticated user
			console.log('Document data:', snapshot.data());
			userStore.set(snapshot.data());
		} else {
			console.log('No such document!');
		}
	};

	loadUser().then(() => {
		console.log('useradmin/[userID] Neuladen: userStore: ', $userStore);
	});
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
			<Label for="displayname" class="mb-2 block">Display Name</Label>
			<Input
				id="displayname"
				size="lg"
				placeholder="Display name"
				bind:value={$userStore.displayname}
			/>
		</div>
		<div class="mb-6">
			<Label for="email" class="mb-2 block">Email</Label>
			<Input id="email" size="lg" placeholder="Email" bind:value={$userStore.email} disabled />
		</div>
		<div class="mb-6">
			<Label for="city" class="mb-2 block">City</Label>
			<Input id="city" size="lg" placeholder="city" bind:value={$userStore.city} />
		</div>

		<div class="mb-6">
			<Label>
				Select an option
				<Select class="mt-2" items={userRoles} bind:value={$userStore.role} />
			</Label>
		</div>
	</div>
</form>

<style>
</style>
