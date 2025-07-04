<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	import { database } from '$lib/firebase/firebaseConfig';
	import { addDoc, deleteDoc, doc, collection, updateDoc } from 'firebase/firestore';

	import Icon from '@iconify/svelte';

	import { notificationStore, TOAST_DURATION } from '$lib/stores/notifications';

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

	import { EditMode, EditModeStore } from '$lib/stores/ObjectStore';

	import NewLocationForm from '$lib/components/NewLocationForm.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import { Button } from '$lib/components/ui/button';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	let currentLocationId = $state(0);
	let showDeleteDialog = $state(false);
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
		if (!location) return;
		deleteLocation = location;
		showDeleteDialog = true;
	};

	const handleDelete = async () => {
		if (deleteLocation) {
			try {
				const docRef = doc(database, 'location', deleteLocation.id);
				await deleteDoc(docRef);
				updateAndSortLocations((locations) => locations.filter((loc) => loc.id !== deleteLocation!.id));
				showDeleteDialog = false;
				deleteLocation = null;
				notificationStore.addToast('success', 'Location deleted successfully', TOAST_DURATION);
			} catch (e) {
				notificationStore.addToast('error', 'Error deleting location. Try again later.', TOAST_DURATION);
				console.error('Error deleting document: ', e);
			}
		} else {
			return;
		}
	};

	const handleCancel = () => {
		showDeleteDialog = false;
		deleteLocation = null;
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
				updateAndSortLocations((locations) => locations.map((loc) => (loc.id === id ? { id, ...dataToSave } : loc)));
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

<ConfirmDialog
	open={showDeleteDialog}
	title="Confirm Delete"
	message="Deleting a location document can not be undone.\nDo you really want to delete this item?"
	confirmText="Delete"
	confirmVariant="destructive"
	cancelText="Cancel"
	onConfirm={() => handleDelete()}
	onCancel={() => handleCancel()}
/>

<div class="w-full gap-2">
	<h1>Locations</h1>
	<div class="locations-container">
		<div class="locations-list-container">
			<h2>Locations List</h2>
			<ul class="locations-list">
				{#each $AllLocations as location, index}
					<div class="flex w-full flex-row items-center gap-2">
						<Button
							variant={$CurrentLocation.id === location.id ? 'active' : 'inactive'}
							class="py-6"
							onclick={() => handleLocationChange(location, index)}>{location.name}</Button
						>
						<Button variant="destructive" class="min-w-0" onclick={() => openDeleteModal(location)}>
							<Icon icon="proicons:delete" class="h-8 w-8" />
						</Button>
					</div>
				{/each}
			</ul>
			<div class="button-container">
				<Button variant="primary" size="wide" onclick={handleCreateNew}>Create new</Button>
			</div>
		</div>

		<div class="location-details">
			<h2>Location Details</h2>
			<NewLocationForm onSave={handleSave} showClose={false} mode={updateItem ? 'update' : 'create'} />
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
