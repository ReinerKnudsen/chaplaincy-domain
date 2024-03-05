<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	import { pathName } from '$lib/stores/NavigationStore';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		Search,
		Button
	} from 'flowbite-svelte';

	onMount(() => {
		$pathName = $page.url.pathname;
	});

	export let data;
	const users = data.users;

	// Sort table items
	const sortKey = writable('displayname'); // default sort key
	const sortDirection = writable(1); // default sort direction (ascending)
	const sortItems = writable(users.slice()); // make a copy of the news array

	// Define a function to sort the items
	const sortTable = (key) => {
		// If the same key is clicked, reverse the sort direction
		if ($sortKey === key) {
			sortDirection.update((val) => -val);
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

	$: {
		const key = $sortKey;
		const direction = $sortDirection;
		const sorted = [...$sortItems].sort((a, b) => {
			// since the data sits deeper in the news object we must dig deeper here
			const aVal = a.data[key];
			const bVal = b.data[key];
			if (aVal < bVal) {
				return -direction;
			} else if (aVal > bVal) {
				return direction;
			}
			return 0;
		});
		sortItems.set(sorted);
	}

	const handleClick = async () => {
		return;
	};
</script>

<div>
	<h1>User</h1>
	<div class="mb-6 grid grid-cols-12 gap-20">
		<!-- <div class="col-span-9"><Search on:input={handleSearchInput} /></div> -->
		<!-- <div class="col-span-3 justify-self-end">
			<Button on:click={handleClick}>Create Event</Button>
		</div> -->
	</div>

	<Table hoverable={true}>
		<TableHead>
			<TableHeadCell class="!p-4">
				<Checkbox />
			</TableHeadCell>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('lastname')}
				>Last Name</TableHeadCell
			>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('firstname')}
				>First Name</TableHeadCell
			>
			<TableHeadCell>Email</TableHeadCell>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('displayname')}
				>Display Name</TableHeadCell
			>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('role')}>Role</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $sortItems as user}
				<TableBodyRow>
					<TableBodyCell class="!p-4">
						<Checkbox />
					</TableBodyCell>
					<TableBodyCell class="font-normal">{user.data.lastname}</TableBodyCell>
					<TableBodyCell class="font-normal">{user.data.firstname}</TableBodyCell>
					<TableBodyCell class="font-normal">{user.data.email}</TableBodyCell>
					<TableBodyCell class="font-normal">{user.data.displayname}</TableBodyCell>
					<TableBodyCell class="font-normal">{user.data.role}</TableBodyCell>
					<TableBodyCell>
						<a
							href="/admin/useradmin/{user.id}"
							class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

<style>
</style>
