<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import {
		getFirestore,
		getDoc,
		addDoc,
		deleteDoc,
		doc,
		collection,
		updateDoc,
	} from 'firebase/firestore';
	import {
		CurrentLocation,
		resetCurrentLocation,
		AllLocations,
		updateAndSortLocations,
		fetchLocations,
		type Location,
	} from '$lib/stores/LocationsStore';

	import { database } from '$lib/firebase/firebaseConfig';

	import NewLocationForm from '$lib/components/NewLocationForm.svelte';
	import Icon from '$lib/components/Icon.svelte';

	const dispatch = createEventDispatcher();

	onMount(() => {
		fetchLocations();
	});

	let updateItem = true;
	let currentLocationId = 0;

	// Only set CurrentLocation when AllLocations has items
	$: if ($AllLocations.length > 0) {
		CurrentLocation.set($AllLocations[currentLocationId]);
	} else {
		resetCurrentLocation();
	}

	const handleLocationChange = (location: Location, index: number) => {
		CurrentLocation.set(location);
		currentLocationId = index;
	};

	const handleCreateNew = () => {
		resetCurrentLocation();
		updateItem = false;
	};

	const handleDelete = async (location: Location) => {
		try {
			const docRef = doc(database, 'location', location.id);
			await deleteDoc(docRef);
			updateAndSortLocations((locations) => locations.filter((loc) => loc.id !== location.id));
		} catch (e) {
			console.error('Error deleting document: ', e);
		}
	};

	const handleSave = async () => {
		const { id, name, description, street, city, zip, openMapUrl } = $CurrentLocation;

		if (updateItem) {
			// Updating existing location
			try {
				const docRef = doc(database, 'location', id);
				await updateDoc(docRef, {
					name,
					description,
					street,
					city,
					zip,
					openMapUrl,
				});

				updateAndSortLocations((locations) =>
					locations.map((loc) =>
						loc.id === id ? { id, name, description, street, city, zip, openMapUrl } : loc,
					),
				);
			} catch (e) {
				console.error('Error updating document: ', e);
			}
		} else {
			// Creating new location
			try {
				const docRef = await addDoc(collection(database, 'location'), {
					name,
					description,
					street,
					city,
					zip,
					openMapUrl,
				});

				updateAndSortLocations((locations) => [
					...locations,
					{ id: docRef.id, name, description, street, city, zip, openMapUrl },
				]);

				dispatch('locationAdded', { id: docRef.id, name });
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		}
	};
</script>

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
							on:click={() => handleLocationChange(location, index)}>{location.name}</button
						>
						<button class="icon-button" on:click={() => handleDelete(location)}>
							<Icon width={'1.5rem'} height={'1.5rem'} name="delete" />
						</button>
					</div>
				{/each}
			</ul>
			<div class="button-container">
				<Button
					class="min-w-32 bg-primary-100 text-white-primary disabled:bg-primary-40 disabled:text-slate-600"
					on:click={handleCreateNew}>Create new</Button
				>
			</div>
		</div>
		<div class="location-details">
			<h2>Location Details</h2>
			<NewLocationForm on:save={handleSave} showClose={false} />
		</div>
	</div>
</div>

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
		background-color: white;
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
