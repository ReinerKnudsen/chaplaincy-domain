<script>
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { doc, deleteDoc, getDocs } from 'firebase/firestore';

	import { pathName } from '$lib/stores/NavigationStore';
	import { resetEventStore } from '$lib/stores/FormStore';
	import { eventsColRef } from '$lib/firebase/firebaseConfig';

	import { Button, Modal } from 'flowbite-svelte';

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
	<div class="mb-6 grid grid-cols-12 gap-2 lg:gap-20">
		<div class="col-span-9">
			<input
				class="w-full rounded-lg"
				placeholder="Search (not yet active)"
				type="text"
				on:input={handleSearchInput}
			/>
		</div>
		<div class="col-span-3 justify-self-end">
			<Button on:click={handleClick} class="bg-primary-100 text-lg font-semibold text-white-primary"
				>Create Event</Button
			>
		</div>
	</div>
	<div class="w-full overflow-scroll">
		<table class="z-0 w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead
				class="bg-white-primary text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
			>
				<tr>
					<th class="cursor-pointer px-2 py-3" onclick={() => sortTable('title')}>Title</th>
					<th class="cursor-pointer px-2 py-3" onclick={() => sortTable('startdate')}>Date</th>
					<!-- <th class="py-3 ">Description</th> -->
					<th class="cursor-pointer px-2 py-3" onclick={() => sortTable('publishdate')}
						>Publish date</th
					>
					<th class="cursor-pointer px-2 py-3" onclick={() => sortTable('location')}>Location</th>
					<th class="cursor-pointer px-2 py-3">Author</th>
					<th class="px-2 py-3">Edit</th>
				</tr>
			</thead>
			<tbody>
				{#each $sortItems as item}
					<tr
						class="bg-white border-b last:border-b-0 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
						on:click={goto(`/admin/eventsadmin/${item.id}`)}
					>
						<td class="!p-4" hidden>
							<input type="checkbox" />
						</td>
						<td class="dark:text-white whitespace-nowrap px-2 py-4 font-normal text-gray-900"
							>{item.data.title}</td
						>
						<td class="dark:text-white whitespace-nowrap px-2 py-4 font-normal text-gray-900"
							>{item.data.startdate}</td
						>
						<td class="dark:text-white whitespace-nowrap px-2 py-4 font-normal text-gray-900"
							>{item.data.publishdate}</td
						>
						<td class="dark:text-white whitespace-nowrap px-2 py-4 font-normal text-gray-900"
							>{item.data.location}</td
						>
						<td class="dark:text-white whitespace-nowrap px-2 py-4 font-normal text-gray-900"
							>{item.data.author}</td
						>
						<td class="dark:text-white whitespace-nowrap px-2 py-4 font-medium text-gray-900">
							<button
								class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
								on:click={() => goto('/admin/eventsadmin/' + item.id)}>Edit</button
							>
							|
							<button
								class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
								on:click={() => openModal(item.id)}>Delete</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
</style>
