<script lang="ts">
	import { page } from '$app/stores';
	import { writable, type Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { doc, deleteDoc } from 'firebase/firestore';
	import { eventsColRef } from '$lib/firebase/firebaseConfig';

	import { pathName } from '$lib/stores/NavigationStore';
	import {
		CollectionType,
		EditMode,
		EditModeStore,
		EventsStore,
		EventStore,
		resetEventStore,
		loadItems,
		duplicateItem,
		type CollectionItem,
		type Event,
		type EventSortableFields,
	} from '$lib/stores/ObjectStore';
	import { AllLocations, fetchLocations } from '$lib/stores/LocationsStore';

	import { Button, Modal } from 'flowbite-svelte';

	let showModal = false;
	let showDuplicateModal = false;
	let deleteID: string = '';
	let dupeID: string = '';
	let loading: boolean = true;
	let sortItems: Writable<CollectionItem[]> = writable([]);

	let locationMap: Record<string, string> = {};

	const loadData = async () => {
		await loadItems(CollectionType.Events);
	};

	onMount(async () => {
		$pathName = $page.url.pathname;
		await loadData();
		await fetchLocations();
		loading = false;
	});

	// Sort table items
	const STORAGE_KEY = 'events_sort';

	// Initialize sort settings from sessionStorage or defaults
	const getStoredSortSettings = () => {
		if (typeof window === 'undefined') return { key: 'title', direction: 1 };

		const stored = sessionStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch (e) {
				console.error('Failed to parse sort settings:', e);
				return { key: 'title', direction: 1 };
			}
		}
		return { key: 'title', direction: 1 };
	};

	const { key: initialKey, direction: initialDirection } = getStoredSortSettings();
	const sortKey: Writable<EventSortableFields> = writable(initialKey);
	const sortDirection: Writable<number> = writable(initialDirection);

	// Update sessionStorage when sort settings change
	$: {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ key: $sortKey, direction: $sortDirection }),
			);
		}
	}

	$: {
		if ($EventsStore) sortItems.set($EventsStore.slice());
	} // make a copy of the array

	const sortTable = (key: EventSortableFields) => {
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

	const handleSearchInput = (event: CustomEvent) => {
		//console.log(event.target.value);
	};

	const handleCreateNew = () => {
		resetEventStore();
		EditModeStore.set(EditMode.New);
		goto('/admin/eventsadmin/create');
	};

	const handleOpenItem = (id: string) => {
		const selectedEvent = $EventsStore && $EventsStore.find((item) => item.id === id);
		if (!selectedEvent) {
			return;
		}
		EventStore.set(selectedEvent.data as Event);
		EditModeStore.set(EditMode.Update);
		goto(`/admin/eventsadmin/${id}`);
	};

	const handleDuplicate = async () => {
		const newEvent = await duplicateItem(dupeID, CollectionType.Events);
		if (!newEvent) {
			return;
		}
		showDuplicateModal = false;
		loading = true;
		await loadData();
		loading = false;
		EditModeStore.set(EditMode.Update);
		goto(`/admin/eventsadmin/${newEvent}`);
	};

	const handleDelete = async () => {
		showModal = false;
		await deleteDoc(doc(eventsColRef, deleteID));
		await loadData();
	};

	const openModal = (id: string) => {
		deleteID = id;
		showModal = true;
	};

	const openDuplicateModal = (id: string) => {
		dupeID = id;
		showDuplicateModal = true;
	};

	const printLocation = (id: string) => {
		const location = $AllLocations.find((location) => location.id === id);
		if (!location) {
			return;
		}
		return `${location.name}, ${location.city}`;
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
			<input class="w-full rounded-lg" placeholder="Search (not yet active)" type="text" />
		</div>
		<div class="col-span-3 justify-self-end">
			<Button
				on:click={handleCreateNew}
				class="bg-primary-100 text-lg font-semibold text-white-primary">Create Event</Button
			>
		</div>
	</div>

	{#if loading}
		<div class="w-full">Loading...</div>
	{:else}
		<div class="w-full">
			<table>
				<thead>
					<tr>
						<th on:click={() => sortTable('title')}>Title</th>
						<th on:click={() => sortTable('startdate')}>Date</th>
						<th on:click={() => sortTable('publishdate')}>Publish date</th>
						<th on:click={() => sortTable('location')}>Location</th>
						<th on:click={() => sortTable('author')}>Author</th>
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
							<td>{printLocation(item.data.location)}</td>
							<td>{item.data.author}</td>
							<td>
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
	{/if}
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
