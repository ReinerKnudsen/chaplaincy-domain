<script>
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { doc, deleteDoc, getDocs } from 'firebase/firestore';
	import { eventsColRef } from '$lib/firebase/firebaseConfig';
	import { getFirestore, collection } from 'firebase/firestore';

	import { pathName } from '$lib/stores/NavigationStore';
	import { resetEventStore, EditMode } from '$lib/stores/FormStore';
	import { resetCurrentLocation } from '$lib/stores/LocationsStore';
	import { duplicateItem } from '$lib/services/fileService.js';

	import { Button, Modal } from 'flowbite-svelte';

	export let data;
	let events = data.events;
	let showModal = false;
	let showDuplicateModal = false;
	let deleteID = '';
	let dupeID = '';
	let loading;

	const db = getFirestore();
	let locationMap = {};

	async function fetchLocations() {
		const querySnapshot = await getDocs(collection(db, 'location'));
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			locationMap[doc.id] = `${data.name}, ${data.city}`;
		});
	}

	const loadData = async () => {
		let snapshot = await getDocs(eventsColRef);
		events = snapshot.docs.map((event) => {
			return {
				id: event.id,
				data: event.data(),
			};
		});
		sortTable($sortKey, false);
	};

	onMount(async () => {
		$pathName = $page.url.pathname;
		await fetchLocations();
		resetCurrentLocation();
	});

	// Sort table items
	const sortKey = writable('title'); // default sort key
	const sortDirection = writable(1); // default sort direction (ascending)
	$: sortItems = writable(events.slice()); // make a copy of the array

	// Define a function to sort the items
	const sortTable = (key, toggle) => {
		// If the same key is clicked, reverse the sort direction
		if ($sortKey === key) {
			sortDirection.update((val) => -val);
		} else {
			sortKey.set(key);
			if (toggle) {
				sortDirection.set(1);
			}
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
		//console.log(event.target.value);
	};

	const handleCreateNew = async () => {
		await resetEventStore();
		EditMode.set('new');
		goto('/admin/eventsadmin/create');
	};

	const handleDelete = async () => {
		showModal = false;
		await deleteDoc(doc(eventsColRef, deleteID));
		events = events.filter((event) => event.id !== deleteID);
		loading = true;
		await loadData();
		loading = false;
	};

	const handleOpenItem = (id) => {
		EditMode.set('update');
		goto(`/admin/eventsadmin/${id}`);
	};

	const handleDuplicate = async () => {
		const newEvent = await duplicateItem(dupeID, 'events');
		// docRef of the new Event
		showDuplicateModal = false;
		loading = true;
		await loadData();
		loading = false;
		EditMode.set('new');
		goto(`/admin/eventsadmin/${newEvent}`);
	};

	const openModal = (id) => {
		deleteID = id;
		showModal = true;
	};

	const openDuplicateModal = (id) => {
		dupeID = id;
		showDuplicateModal = true;
	};
</script>

<Modal bind:open={showModal} size="md" autoclose>
	<div class="rounded-xl bg-white-primary p-10 text-center">
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Deleting an item can not be undone.
			<p><strong>Do you really want to delete this item?</strong></p>
		</h3>
		<div class="flex justify-between px-36">
			<Button color="alternative">Cancel</Button>
			<Button color="red" class=" me-2 text-white-primary" on:click={() => handleDelete()}
				>Delete</Button
			>
		</div>
	</div>
</Modal>

<Modal bind:open={showDuplicateModal} size="md" autoclose>
	<div class="rounded-xl bg-white-primary p-10 text-center">
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Do you want to duplicate this event?
			<p>All information will be kept but all dates will be reset.</p>
		</h3>
		<div class="flex justify-between px-36">
			<Button color="alternative">Cancel</Button>
			<Button
				class="bg-primary-100 text-lg font-semibold text-white-primary"
				on:click={() => handleDuplicate()}>Confirm</Button
			>
		</div>
	</div>
</Modal>

<div>
	<h1>Events</h1>
	<div class="mb-6 grid grid-cols-12 items-center gap-2 lg:gap-20">
		<div class="col-span-9">
			<input
				class="w-full rounded-lg"
				placeholder="Search (not yet active)"
				type="text"
				on:input={handleSearchInput}
			/>
		</div>
		<div class="col-span-3 justify-self-end">
			<Button
				on:click={handleCreateNew}
				class="bg-primary-100 text-lg font-semibold text-white-primary">Create Event</Button
			>
		</div>
	</div>

	<div class="w-full">
		<table>
			<thead>
				<tr>
					<th on:click={() => sortTable('title', true)}>Title</th>
					<th on:click={() => sortTable('startdate', true)}>Date</th>
					<th on:click={() => sortTable('publishdate', true)}>Publish date</th>
					<th on:click={() => sortTable('location', true)}>Location</th>
					<th on:click={() => sortTable('author', true)}>Author</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#each $sortItems as item}
					<tr>
						<td
							><button class="underline" on:click={() => handleOpenItem(item.id)}
								>{item.data.title}</button
							></td
						>
						<td>{item.data.startdate}</td>
						<td>{item.data.publishdate}</td>
						<td>{locationMap[item.data.location]}</td>
						<td>{item.data.author}</td>
						<td>
							<!-- <select
								name="actions"
								id="actions"
								class="mr-4 max-h-8 max-w-28 rounded-md py-0 text-sm"
							>
								<option value="" disabled selected>Select</option>
								<option value="">Edit</option>
								<option value="">Delete</option>
								<option value="">Duplicate</option>
							</select> -->

							<div class="flex justify-between">
								<button
									class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
									on:click={() => openModal(item.id)}>Delete</button
								>
								|
								<button
									class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
									on:click={() => openDuplicateModal(item.id)}>Duplicate</button
								>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	table {
		display: grid;
		border-collapse: collapse;
		min-width: 100%;
		grid-template-columns:
			minmax(150px, 2.5fr)
			minmax(130px, 1fr)
			minmax(130px, 1fr)
			minmax(150px, 2fr)
			minmax(150px, 1fr)
			minmax(100px, 1fr);
	}
	thead,
	tbody,
	tr {
		display: contents;
	}

	th {
		cursor: pointer;
		background-color: white;
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-align: left;
		padding-top: 0.8rem;
		padding-bottom: 0.8rem;
		padding-left: 0.5rem;
	}
	th,
	td {
		font-size: 0.875rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		@apply text-slate-600;
	}

	td {
		padding-top: 1.2rem;
		padding-bottom: 1.2rem;
		padding-left: 0.5rem;
		@apply border-b border-slate-300;
	}
</style>
