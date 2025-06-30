<script lang="ts">
	import { goto } from '$app/navigation';

	import { createNewUser } from '$lib/services/authService';
	import { type User } from '$lib/stores/ObjectStore';
	import { notificationStore, Messages } from '$lib/stores/notifications';

	import UserForm from '$lib/components/UserForm.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	let working = $state(false);

	const createUser = async (newUser: User) => {
		working = true;
		try {
			await createNewUser(newUser);
			notificationStore.addToast('success', Messages.SAVESUCCESS, 3000);
			goto('/admin/useradmin');
		} catch (error) {
			console.error('Error creating user:', error);
			notificationStore.addToast('error', Messages.SAVERROR, 0);
		}
		working = false;
	};

	const handleCancel = () => {
		goto('/admin/useradmin');
	};
</script>

<UserForm onCreateNew={createUser} onCancel={handleCancel} />

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
