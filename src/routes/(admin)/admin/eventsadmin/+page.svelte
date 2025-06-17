<script lang="ts">
	import { run, preventDefault } from 'svelte/legacy';

	import { page } from '$app/state';
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

	let deleteDialog: HTMLDialogElement|undefined = $state();
	let duplicateDialog: HTMLDialogElement|undefined = $state();
	let deleteID: string = '';
	let dupeID: string = '';
	let loading: boolean = $state(true);
	let sortItems: Writable<CollectionItem[]> = writable([]);

	const loadData = async () => {
		await loadItems(CollectionType.Events);
	};

	onMount(async () => {
		$pathName = page.url.pathname;
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
	run(() => {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ key: $sortKey, direction: $sortDirection }),
			);
		}
	});

	run(() => {
		if ($EventsStore) sortItems.set($EventsStore.slice());
	}); // make a copy of the array

	const sortTable = (key: EventSortableFields) => {
		if ($sortKey === key) {
			sortDirection.update((val) => -val);
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

	run(() => {
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
	});

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
		loading = true;
		await loadData();
		loading = false;
		EditModeStore.set(EditMode.Update);
		goto(`/admin/eventsadmin/${newEvent}`);
	};

	const handleDelete = async () => {
		await deleteDoc(doc(eventsColRef, deleteID));
		await loadData();
		deleteDialog?.close();
	};

	const openModal = (id: string) => {
		deleteID = id;
		deleteDialog?.showModal();
	};

	const openDuplicateModal = (id: string) => {
		dupeID = id;
		duplicateDialog?.showModal();
	};

	const printLocation = (id: string) => {
		const location = $AllLocations.find((location) => location.id === id);
		if (!location) {
			return;
		}
		return `${location.name}, ${location.city}`;
	};
</script>

<dialog bind:this={deleteDialog} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Confirm Delete</h3>
		<hr class="py-2" />
		<p class="py-4">
			Deleting an item can not be undone.<br /><strong
				>Do you really want to delete this item?</strong
			>
		</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-default mr-2">Cancel</button>
				<button class="btn btn-error" onclick={preventDefault(() => handleDelete())}>Delete</button>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>Cancel</button>
	</form>
</dialog>

<dialog bind:this={duplicateDialog} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Duplicate Event</h3>
		<p class="py-4">
			Do you want to duplicate this event?<br />All information will be kept but all dates will be
			reset.
		</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-default mr-2">Cancel</button>
				<button class="btn btn-primary" onclick={preventDefault(() => handleDuplicate())}
					>Duplicate</button
				>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>Cancel</button>
	</form>
</dialog>

<div>
	<h1>Events</h1>
	<div class="mb-6 grid grid-cols-12 items-center gap-2 lg:gap-20">
		<div class="col-span-9">
			<input class="w-full rounded-lg" placeholder="Search (not yet active)" type="text" />
		</div>
		<div class="col-span-3 justify-self-end py-2">
			<button onclick={handleCreateNew} class="btn btn-primary btn-lg">Create Event</button>
		</div>
	</div>

	{#if loading}
		<div class="w-full">Loading...</div>
	{:else}
		<div class="w-full">
			<table class="admin-table">
				<thead class="table-row">
					<tr class="table-row">
						<th class="table-header table-cell" onclick={() => sortTable('title')}>Title</th>
						<th class="table-header table-cell" onclick={() => sortTable('startdate')}
							>Start Date</th
						>
						<th class="table-header table-cell" onclick={() => sortTable('enddate')}>End Date</th>
						<th class="table-header table-cell" onclick={() => sortTable('location')}>Location</th>
						<th class="table-header table-cell" onclick={() => sortTable('publishdate')}
							>Publish Date</th
						>
						<th class="table-header table-cell">Actions</th>
					</tr>
				</thead>
				<tbody class="table-row">
					{#each $sortItems as item}
						<tr class="table-row">
							<td class="table-data table-cell">
								<button class="btn btn-link px-0" onclick={() => handleOpenItem(item.id)}>
									{item.data.title}
								</button>
							</td>
							<td class="table-data table-cell">{item.data.startdate}</td>
							<td class="table-data table-cell">{item.data.enddate}</td>
							<td class="table-data table-cell">{printLocation(item.data.location)}</td>
							<td class="table-data table-cell">{item.data.publishdate}</td>
							<td class="table-data table-cell">
								<div class="flex flex-row gap-2">
									<button class="btn-sm btn-custom-delete" onclick={() => openModal(item.id)}
										>Delete</button
									>
									<button
										class="btn btn-active btn-sm btn-default"
										color="alternative"
										onclick={() => openDuplicateModal(item.id)}>Duplicate</button
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
	.admin-table {
		display: grid;
		border-collapse: collapse;
		min-width: 100%;
		grid-template-columns:
			minmax(150px, 2.5fr) minmax(130px, 1fr) minmax(130px, 1fr) minmax(150px, 2fr)
			minmax(150px, 1fr) minmax(100px, 1fr);
	}

	.table-row {
		display: contents;
	}

	.table-header {
		background-color: white;
		cursor: pointer;
		padding: 0.75rem 0.5rem;
		text-align: left;
		font-size: 0.875rem;
		font-weight: 600;
		color: rgb(17 24 39);
		text-transform: uppercase;
	}

	.table-cell {
		font-size: 0.875rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: rgb(71 85 105);
	}

	.table-data {
		padding: 1.25rem 0.5rem;
		border-bottom: 1px solid rgb(203 213 225);
		align-content: center;
	}
</style>
