<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	import { database } from '$lib/firebase/firebaseConfig';
	import { addDoc, deleteDoc, doc, collection, updateDoc } from 'firebase/firestore';

	import { notificationStore } from '$lib/stores/notifications';
	import { TOAST_DURATION } from '$lib/utils/constants';
	import {
		CurrentLocation,
		initialLocationState,
		resetCurrentLocation,
		AllLocations,
		updateAndSortLocations,
		fetchLocations,
		type Location,
	} from '$lib/stores/LocationsStore';

	import { pathName } from '$lib/stores/NavigationStore';
	import NewLocationForm from '$lib/components/NewLocationForm.svelte';

	import Icon from '@iconify/svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	let currentLocationId = $state(0);
	let deleteDialog: HTMLDialogElement | null = $state(null);
	let deleteLocation: Location | null = $state(null);
	let updateItem = $state(true);

	onMount(() => {
		pathName.set(page.url.pathname);
		fetchLocations();
	});

	// Only set CurrentLocation when AllLocations has items
	$effect(() => {
		if ($AllLocations.length > 0) {
			CurrentLocation.set($AllLocations[currentLocationId]);
		} else {
			resetCurrentLocation();
		}
	});

	const handleLocationChange = (location: Location, index: number) => {
		updateItem = true;
		CurrentLocation.set(location);
		currentLocationId = index;
	};

	const handleCreateNew = () => {
		CurrentLocation.set({ ...initialLocationState });
		updateItem = false;
	};

	const openDeleteModal = (location: Location) => {
		if (!deleteDialog || !location) return;
		deleteLocation = location;
		deleteDialog.showModal();
	};

	const handleDelete = async () => {
		if (deleteLocation) {
			try {
				const docRef = doc(database, 'location', deleteLocation.id);
				await deleteDoc(docRef);
				updateAndSortLocations((locations) =>
					locations.filter((loc) => loc.id !== deleteLocation!.id)
				);
				deleteDialog!.close();
				deleteLocation = null;
				notificationStore.addToast('success', 'Location deleted successfully', TOAST_DURATION);
			} catch (e) {
				notificationStore.addToast(
					'error',
					'Error deleting location. Try again later.',
					TOAST_DURATION
				);
				console.error('Error deleting document: ', e);
			}
		} else {
			return;
		}
	};

	const handleSave = async () => {
		// Use destructuring to separate the id from the rest of the data
		const { id, ...dataToSave } = $CurrentLocation;

		if (updateItem) {
			// Updating existing location
			try {
				const docRef = doc(database, 'location', id);
				await updateDoc(docRef, dataToSave);

				// Update the local store with the new data
				updateAndSortLocations((locations) =>
					locations.map((loc) => (loc.id === id ? { id, ...dataToSave } : loc))
				);
				notificationStore.addToast('success', 'Location updated successfully', TOAST_DURATION);
			} catch (e) {
				notificationStore.addToast('error', "Couldn't update the location. Please try again.", 0);
				console.error('Error updating document: ', e);
			}
		} else {
			// Creating new location
			try {
				const docRef = await addDoc(collection(database, 'location'), dataToSave);
				updateAndSortLocations((locations) => [...locations, { id: docRef.id, ...dataToSave }]);
				notificationStore.addToast('success', 'Location added successfully', TOAST_DURATION);
			} catch (e) {
				notificationStore.addToast('error', "Couldn't add the new location. Please try again.", 0);
				console.error('Error adding document: ', e);
			}
		}
	};
</script>

<dialog bind:this={deleteDialog} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Confirm location delete</h3>
		<hr class="py-2" />
		<p class="py-4">
			Deleting a location document can not be undone.<br /><strong
				>Do you really want to delete this item?</strong
			>
		</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-default mr-2">Cancel</button>
				<button class="btn btn-error" onclick={() => handleDelete()}>Delete</button>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>Cancel</button>
	</form>
</dialog>

<div class="w-full gap-2">
	<h1>Locations</h1>
	<div class="locations-container">
		<div class="locations-list-container">
			<h2>Locations List</h2>
			<ul class="locations-list">
				{#each $AllLocations as location, index}
					<div class="flex w-full flex-row items-center gap-2">
						<button
							class={$CurrentLocation.id === location.id
								? 'active list-item flex-1'
								: 'list-item flex-1'}
							onclick={() => handleLocationChange(location, index)}>{location.name}</button
						>
						<button class="icon-button" onclick={() => openDeleteModal(location)}>
							<Icon icon="proicons:delete" class="h-6 w-6" />
						</button>
					</div>
				{/each}
			</ul>
			<div class="button-container">
				<button class="btn btn-primary" onclick={handleCreateNew}>Create new</button>
			</div>
		</div>

		<div class="location-details">
			<h2>Location Details</h2>
			<NewLocationForm
				onSave={handleSave}
				showClose={false}
				mode={updateItem ? 'update' : 'create'}
			/>
		</div>
	</div>
</div>

<ToastContainer />

<style>
	.locations-container {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		gap: 50px;
	}
	.locations-list-container {
		flex: 0.3;
		background-color: white;
		border-radius: 30px;
		padding: 20px;
	}

	.list-item {
		padding: 0.5rem 1rem;
		border: none;
		background-color: transparent;
		border-radius: 5px;
		width: 100%;
		text-align: left;
	}

	.active {
		background-color: #d3d3d3;
	}
	.active:hover {
		background-color: #a3a3a3;
		color: white;
	}

	.icon-button {
		padding: 0.5rem;
		border: none;
		background-color: transparent;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 2.5rem;
	}

	.icon-button:hover {
		background-color: var(--color-primary-40);
	}

	.location-details {
		flex: 0.5;
		background-color: whitesmoke;
		border-radius: 20px;
		padding: 20px 30px;
	}

	.button-container {
		margin: 30px 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
