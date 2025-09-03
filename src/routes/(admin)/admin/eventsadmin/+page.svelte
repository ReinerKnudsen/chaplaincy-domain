<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

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
		type DomainEvent,
		type DomainEventSortableFields,
	} from '$lib/stores/ObjectStore';
	import { AllLocations, fetchLocations } from '$lib/stores/LocationsStore';

	import { Button } from '$lib/components/ui/button';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	let showDeleteDialog = $state(false);
	let showDuplicateDialog = $state(false);
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
	const sortKey: Writable<DomainEventSortableFields> = writable(initialKey);
	const sortDirection: Writable<number> = writable(initialDirection);

	// Update sessionStorage when sort settings change
	const sortTable = (key: DomainEventSortableFields) => {
		if ($sortKey === key) {
			sortDirection.update((val) => -val);
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

	// Update sorting and sessionStorage when sort settings or items change
	$effect(() => {
		// Update sessionStorage
		if (typeof window !== 'undefined') {
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ key: $sortKey, direction: $sortDirection }));
		}

		// Sort items if available
		if ($EventsStore?.length) {
			const sorted = [...$EventsStore].sort((a, b) => {
				const aVal = a.data[$sortKey];
				const bVal = b.data[$sortKey];
				if (aVal < bVal) {
					return -$sortDirection;
				} else if (aVal > bVal) {
					return $sortDirection;
				}
				return 0;
			});
			sortItems.set(sorted);
		}
	});

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
		EventStore.set(selectedEvent.data as DomainEvent);
		EditModeStore.set(EditMode.Update);
		goto(`/admin/eventsadmin/${id}`);
	};

	const handleDuplicate = async () => {
		if (!dupeID) return;

		const newEvent = await duplicateItem(dupeID, CollectionType.Events);
		if (!newEvent) {
			return;
		}
		loading = true;
		await loadData();
		loading = false;
		EditModeStore.set(EditMode.Update);
		showDuplicateDialog = false;
		dupeID = '';
		goto(`/admin/eventsadmin/${newEvent}`);
	};

	const handleDelete = async () => {
		if (!deleteID) return;

		await deleteDoc(doc(eventsColRef, deleteID));
		await loadData();
		showDeleteDialog = false;
		deleteID = '';
	};

	const openDeleteModal = (id: string) => {
		deleteID = id;
		showDeleteDialog = true;
	};

	const openDuplicateModal = (id: string) => {
		dupeID = id;
		showDuplicateDialog = true;
	};

	const printLocation = (id: string) => {
		const location = $AllLocations.find((location) => location.id === id);
		if (!location) {
			return;
		}
		return `${location.name}, ${location.city}`;
	};
</script>

<ConfirmDialog
	open={showDeleteDialog}
	title="Confirm Delete"
	message="Deleting an item can not be undone. <br>Are you sure you want to delete this item?"
	confirmText="Delete"
	confirmVariant="destructive"
	cancelText="Cancel"
	onConfirm={() => handleDelete()}
	onCancel={() => (showDeleteDialog = false)}
/>
<ConfirmDialog
	open={showDuplicateDialog}
	title="Confirm Duplicate"
	message="Do you want to duplicate this event? All information will be kept but all dates will be reset."
	confirmText="Duplicate"
	confirmVariant="primary"
	cancelText="Cancel"
	onConfirm={() => handleDuplicate()}
	onCancel={() => (showDuplicateDialog = false)}
/>

<div>
	<h1>Events</h1>
	<div class="mb-6 grid grid-cols-12 items-center gap-2 lg:gap-20">
		<div class="col-span-9">
			<input class="w-full rounded-lg" placeholder="Search (not yet active)" type="text" />
		</div>
		<div class="col-span-3 justify-self-end py-2">
			<Button variant="primary" size="lg" onclick={handleCreateNew}>Create Event</Button>
		</div>
	</div>

	{#if loading}
		<div class="w-full">Loading...</div>
	{:else}
		<div class="w-full">
			<table class="admin-table events-table">
				<thead class="table-row">
					<tr class="table-row">
						<th class="table-header table-cell" onclick={() => sortTable('title')}>Title</th>
						<th class="table-header table-cell" onclick={() => sortTable('startdate')}>Start Date</th>
						<th class="table-header table-cell" onclick={() => sortTable('enddate')}>End Date</th>
						<th class="table-header table-cell" onclick={() => sortTable('location')}>Location</th>
						<th class="table-header table-cell" onclick={() => sortTable('publishdate')}>Publish Date</th>
						<th class="table-header table-cell">Actions</th>
					</tr>
				</thead>
				<tbody class="table-row">
					{#each $sortItems as item}
						<tr class="table-row">
							<td class="table-data table-cell">
								<Button variant="listItem" onclick={() => handleOpenItem(item.id)}>
									{item.data.title}
								</Button>
							</td>
							<td class="table-data table-cell">{item.data.startdate}</td>
							<td class="table-data table-cell">{item.data.enddate}</td>
							<td class="table-data table-cell">{printLocation(item.data.location)}</td>
							<td class="table-data table-cell">{item.data.publishdate}</td>
							<td class="table-data table-cell">
								<div class="flex flex-row gap-2">
									<Button variant="destructive" class="min-w-0" onclick={() => openDeleteModal(item.id)}>Delete</Button>
									<Button
										variant="default"
										class="min-w-0"
										color="alternative"
										onclick={() => openDuplicateModal(item.id)}>Duplicate</Button
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

<ToastContainer />

<style>
	.events-table {
		display: grid;
		grid-template-columns:
			minmax(150px, 2.5fr)
			minmax(130px, 1fr)
			minmax(130px, 1fr)
			minmax(150px, 2fr)
			minmax(150px, 1fr)
			minmax(100px, 1.5fr);
	}
</style>
