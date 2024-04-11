<script>
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { doc, deleteDoc, getDocs } from 'firebase/firestore';

	import { pathName } from '$lib/stores/NavigationStore';
	import { resetEventStore } from '$lib/stores/FormStore';
	import { eventsColRef } from '$lib/firebase/firebaseConfig';

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		Search,
		Button,
		Modal
	} from 'flowbite-svelte';

	export let data;
	let events = data.events;
	let showModal = false;
	let deleteID = '';

	onMount(() => {
		$pathName = $page.url.pathname;
	});

	// Sort table items
	const sortKey = writable('title'); // default sort key
	const sortDirection = writable(1); // default sort direction (ascending)
	const sortItems = writable(events.slice()); // make a copy of the news array

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

	const handleSearchInput = (event) => {
		console.log(event.target.value);
	};

	const handleClick = async () => {
		console.log('Resetting store');
		await resetEventStore();
		goto('/admin/eventsadmin/create');
	};

	const handleDelete = async () => {
		showModal = false;
		await deleteDoc(doc(eventsColRef, deleteID));
		events = events.filter((event) => event.id !== deleteID);

		// Refactor: Enforce reload of list
	};

	const openModal = (id) => {
		deleteID = id;
		showModal = true;
	};
</script>

<Modal bind:open={showModal} size="md" autoclose>
	<div class="text-center">
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Do you really want to delete this item?
		</h3>
		<Button color="alternative">Cancel</Button>
		<Button color="red" class="me-2" on:click={() => handleDelete()}>Delete</Button>
	</div>
</Modal>

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
			<TableHeadCell class="!p-4" hidden>
				<Checkbox />
			</TableHeadCell>
			<TableHeadCell class="cursor-pointer px-2" on:click={() => sortTable('title')}
				>Title</TableHeadCell
			>
			<TableHeadCell class="cursor-pointer px-2" on:click={() => sortTable('startdate')}
				>Date</TableHeadCell
			>
			<!-- <TableHeadCell class="px-2 ">Description</TableHeadCell> -->
			<TableHeadCell class="cursor-pointer px-2" on:click={() => sortTable('publishdate')}
				>Publish date</TableHeadCell
			>
			<TableHeadCell class="cursor-pointer px-2" on:click={() => sortTable('location')}
				>Location</TableHeadCell
			>

			<TableHeadCell class="px-2 ">Author</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $sortItems as item}
				<TableBodyRow class="align-top">
					<TableBodyCell class="!p-4" hidden>
						<Checkbox />
					</TableBodyCell>
					<TableBodyCell class="px-2 font-normal">{item.data.title}</TableBodyCell>
					<TableBodyCell class="px-2 font-normal">{item.data.startdate}</TableBodyCell>
					<TableBodyCell class="px-2 font-normal">{item.data.publishdate}</TableBodyCell>
					<TableBodyCell class="px-2 font-normal">{item.data.location}</TableBodyCell>
					<!--<TableBodyCell class="text-wrap px-2 font-normal">{item.data.slug}</TableBodyCell>-->

					<TableBodyCell class="px-2 font-normal">{item.data.author}</TableBodyCell>
					<TableBodyCell>
						<a
							href="/admin/eventsadmin/{item.id}"
							class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a
						>
						|
						<button
							class="font-medium text-primary-600 hover:underline dark:text-primary-500"
							on:click={() => openModal(item.id)}>Delete</button
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

<style>
</style>
