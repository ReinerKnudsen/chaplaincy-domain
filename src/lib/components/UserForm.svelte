<script lang="ts">
	import { type User, initUser, EditMode, EditModeStore } from '$lib/stores/ObjectStore';

	import { userRoles } from '$lib/utils/constants';

	import Label from './Label.svelte';
	import { Button } from './ui/button';

	interface Props {
		user?: User;
		onCreateNew?: (user: User) => Promise<void>;
		onUpdate?: (user: User) => Promise<void>;
		onCancel?: () => void;
	}

	let { user, onCreateNew, onUpdate, onCancel }: Props = $props();

	let thisUser = $state(user || initUser);
	if (user) {
		EditModeStore.set(EditMode.Update);
	} else {
		EditModeStore.set(EditMode.New);
	}

	const isValid = $derived(!!thisUser.firstname && !!thisUser.lastname && !!thisUser.email);

	const handleCancel = () => {
		thisUser = initUser;
		onCancel && onCancel();
	};

	const handleSubmit = async () => {
		if ($EditModeStore === EditMode.New && onCreateNew) {
			await onCreateNew(thisUser);
		} else if ($EditModeStore === EditMode.Update && onUpdate) {
			await onUpdate(thisUser);
		}
	};
</script>

<div class="flex flex-row justify-center">
	<div class="bg-white-primary w-5/12 space-y-4 rounded-xl p-6 shadow-xl sm:p-8 md:space-y-6">
		<form class="flex flex-col space-y-6" onsubmit={handleSubmit}>
			<h3 class="p-0 text-xl font-medium text-gray-900 dark:text-white">Create an new account</h3>
			<div class="text-sm">All fields marked with * are mandatory.</div>
			<Label child="firstname">First name *</Label>
			<input
				type="text"
				class="input input-bordered input-lg w-full"
				name="firstname"
				id="firstname"
				placeholder="first name"
				bind:value={thisUser.firstname}
				required
			/>
			<Label child="lastname">Last name *</Label>
			<input
				type="text"
				name="lastname"
				class="input input-bordered input-lg w-full"
				id="lastname"
				bind:value={thisUser.lastname}
				placeholder="last name"
				required
			/>

			<Label child="displayname">Display Name</Label>
			<input
				type="text"
				name="displayName"
				class="input input-bordered input-lg w-full"
				id="displayname"
				bind:value={thisUser.displayName}
				placeholder="display name"
			/>
			<Label child="email">Email *</Label>
			<input
				type="email"
				name="email"
				class="input input-bordered input-lg w-full"
				id="email"
				placeholder="name@domain.com"
				bind:value={thisUser.email}
				required
			/>

			<div class="mb-6">
				<Label child="roles">User role</Label>
				<select class="select select-bordered select-lg w-full" bind:value={thisUser.role}>
					{#each userRoles as role}
						<option value={role.value}>{role.name}</option>
					{/each}
				</select>
			</div>
			<div id="buttons" class="flex flex-row justify-between gap-10">
				<Button type="button" variant="secondary" onclick={handleCancel}>Cancel</Button>
				<Button type="submit" variant="primary" disabled={!isValid}
					>{$EditModeStore === EditMode.New ? 'Create ' : 'Update '} user</Button
				>
			</div>
		</form>
	</div>
</div>
