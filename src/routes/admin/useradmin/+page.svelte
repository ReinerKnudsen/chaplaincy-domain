<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
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
	console.log(users);
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
			<TableHeadCell>Email</TableHeadCell>
			<TableHeadCell>First Name</TableHeadCell>
			<TableHeadCell>Last Name</TableHeadCell>
			<TableHeadCell>Display Name</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each users as user}
				<TableBodyRow>
					<TableBodyCell class="!p-4">
						<Checkbox />
					</TableBodyCell>
					<TableBodyCell>{user.data.email}</TableBodyCell>
					<TableBodyCell>{user.data.firstname}</TableBodyCell>
					<TableBodyCell>{user.data.lastname}</TableBodyCell>
					<TableBodyCell>{user.data.displayname}</TableBodyCell>
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
