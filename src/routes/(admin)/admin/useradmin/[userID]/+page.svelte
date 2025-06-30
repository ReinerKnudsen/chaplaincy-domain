<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import { getDoc, doc, updateDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';
	import { type User } from '$lib/stores/ObjectStore';
	import { notificationStore, Messages, TOAST_DURATION } from '$lib/stores/notifications';

	import { updateUserProfile, countAdmins } from '$lib/services/authService';
	import UserForm from '$lib/components/UserForm.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	const userID = page.params.userID;
	/** @type {{data: any}} */
	let { data } = $props();
	// data.user is a Firebase Auth User, not our custom User type
	let firebaseUser = data.user;
	let loading = $state(true);

	// Create our custom User object from Firebase user data
	let currentUser = $state<User>({
		firstname: '',
		lastname: '',
		email: firebaseUser?.email || '',
		displayName: firebaseUser?.displayName || '',
		uid: firebaseUser?.uid || '',
		role: firebaseUser?.role || '',
	});

	const docRef = doc(database, 'users', userID);
	let numberOfAdmins = 0;
	let working = $state(false);

	onMount(async () => {
		const doc = await getDoc(docRef);
		currentUser = {
			...currentUser,
			firstname: doc.data()?.firstname || '',
			lastname: doc.data()?.lastname || '',
		};
		/**
		 * TODO: Hash and compare objects for changes
		 */
		numberOfAdmins = await countAdmins();
		loading = false;
	});

	const handleSave = async () => {
		/** we must prevent to have the final admin being changed */
		if (data.user.role === 'admin' && currentUser.role !== 'admin' && numberOfAdmins === 1) {
			currentUser.role = 'admin';
			notificationStore.addToast('error', 'You can not override the only admin.', 0);
			return;
		} else {
			try {
				await updateUserProfile(currentUser);
				updateDoc(docRef, {
					firstname: currentUser.firstname,
					lastname: currentUser.lastname,
					displayName: currentUser.displayName,
				});
				notificationStore.addToast('success', Messages.UPDATESUCCESS, TOAST_DURATION);
				goto('/admin/useradmin');
			} catch (error) {
				console.error("Couldn't update user profile: ", error);
				notificationStore.addToast('error', Messages.UPDATEERROR, 0);
			}
		}
	};

	const handleCancel = () => {
		goto('/admin/useradmin');
	};
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	<UserForm user={currentUser} onUpdate={handleSave} onCancel={handleCancel} />
{/if}

{#if working}
	<div class=" fixed inset-0 z-50 flex items-center justify-center">
		<div class="scale-150">
			<Spinner />
		</div>
	</div>
{/if}

<ToastContainer />

<style>
</style>
