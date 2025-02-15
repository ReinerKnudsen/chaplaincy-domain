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

	import { getFirestore, collection } from 'firebase/firestore';

	export let data;
	let events = data.events;
	let showModal = false;
	let deleteID = '';

	const db = getFirestore();
	let locationMap = {};

	async function fetchLocations() {
		const querySnapshot = await getDocs(collection(db, 'location'));
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			locationMap[doc.id] = `${data.name}, ${data.city}`;
		});
	}

	onMount(async () => {
		$pathName = $page.url.pathname;
		await fetchLocations();
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
		//console.log(event.target.value);
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
			<Button on:click={handleClick} class="bg-primary-100 text-lg font-semibold text-white-primary"
				>Create Event</Button
			>
		</div>
	</div>

	<div class="w-full">
		<table>
			<thead>
				<tr>
					<th on:click={() => sortTable('title')}>Title</th>
					<th on:click={() => sortTable('startdate')}>Date</th>
					<th on:click={() => sortTable('publishdate')}>Publish date</th>
					<th on:click={() => sortTable('location')}>Location</th>
					<th on:click={() => sortTable('author')}>Author</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
				{#each $sortItems as item}
					<tr>
						<td>{item.data.title}</td>
						<td>{item.data.startdate}</td>
						<td>{item.data.publishdate}</td>
						<td>{locationMap[item.data.location] || item.data.location}</td>
						<td>{item.data.author}</td>
						<td>
							<div class="flex justify-between">
								<button
									class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
									on:click={() => goto('/admin/eventsadmin/' + item.id)}>Edit</button
								>
								|
								<button
									class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
									on:click={() => openModal(item.id)}>Delete</button
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
