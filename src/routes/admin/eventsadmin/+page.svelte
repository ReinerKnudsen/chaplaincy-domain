<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { pathName } from '$lib/stores/NavigationStore';
	import { resetEventStore } from '$lib/stores/FormStore';
	import { goto } from '$app/navigation';

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

	export let data;
	const events = data.events;

	onMount(() => {
		$pathName = $page.url.pathname;
	});

	const handleSearchInput = (event) => {
		console.log(event.target.value);
	};

	const handleClick = async () => {
		console.log('Resetting store');
		await resetEventStore();
		goto('/admin/eventsadmin/create');
	};
</script>

<div>
	<h1>Events</h1>
	<div class="mb-6 grid grid-cols-12 gap-20">
		<div class="col-span-9"><Search on:input={handleSearchInput} /></div>
		<div class="col-span-3 justify-self-end">
			<Button on:click={handleClick}>Create Event</Button>
		</div>
	</div>

	<Table hoverable={true}>
		<TableHead>
			<TableHeadCell class="!p-4">
				<Checkbox />
			</TableHeadCell>
			<TableHeadCell>Title</TableHeadCell>
			<TableHeadCell>Date</TableHeadCell>
			<TableHeadCell>Location</TableHeadCell>
			<TableHeadCell>Description</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each events as event}
				<TableBodyRow>
					<TableBodyCell class="!p-4">
						<Checkbox />
					</TableBodyCell>
					<TableBodyCell>{event.data.title}</TableBodyCell>
					<TableBodyCell>{event.data.startdate}</TableBodyCell>
					<TableBodyCell>{event.data.location}</TableBodyCell>
					<TableBodyCell>{event.data.slug}</TableBodyCell>
					<TableBodyCell>
						<a
							href="/admin/eventsadmin/{event.id}"
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
