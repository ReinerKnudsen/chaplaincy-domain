<script>
	import { createEventDispatcher } from 'svelte';

	import { Button } from 'flowbite-svelte';

	import { getFirestore, getDoc, addDoc, deleteDoc, doc, collection } from 'firebase/firestore';
	import {
		LocationStore,
		resetLocationStore,
		LocationsStore,
		updateAndSortLocations,
	} from '$lib/stores/LocationsStore';

	import NewLocationForm from '$lib/components/NewLocationForm.svelte';
	import Icon from '$lib/components/Icon.svelte';

	export let data;
	const locations = data.locations;

	$: LocationsStore.set(
		locations.sort((a, b) => {
			if (a.data.name < b.data.name) return -1;
			if (a.data.name > b.data.name) return 1;
			return 0;
		}),
	);

	const db = getFirestore();
	const dispatch = createEventDispatcher();
	let updateItem = true;
	let currentLocationId = 0;

	$LocationStore = locations[0].data;

	$: $LocationStore = locations[currentLocationId].data;

	const handleLocationChange = (location, index) => {
		$LocationStore = location.data;
		currentLocationId = index;
	};

	const handleCreateNew = () => {
		resetLocationStore();
		updateItem = false;
	};

	const handleDelete = async (location) => {
		try {
			const docRef = doc(db, 'location', location.id);
			await deleteDoc(docRef);
			updateAndSortLocations((locations) => locations.filter((loc) => loc.id !== location.id));
		} catch (e) {
			console.error('Error deleting document: ', e);
		}
	};

	const handleSave = async () => {
		const { name, description, street, city, zip, openMapUrl } = $LocationStore;
		if (currentLocationId) {
			updateAndSortLocations((locations) => {
				locations[currentLocationId].data = { name, description, street, city, zip, openMapUrl };
			});
		}
		if (!updateItem) {
			try {
				const docRef = await addDoc(collection(db, 'location'), {
					name,
					description,
					street,
					city,
					zip,
					openMapUrl,
				});
				updateAndSortLocations((locations) => [
					...locations,
					{ id: docRef.id, data: { name, description, street, city, zip, openMapUrl } },
				]);
				dispatch('locationAdded', { id: docRef.id, name });
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		} else {
			console.log('edit');
		}
	};
</script>

<div>
	<h1>Locations</h1>
	<div class="locations-container">
		<div class="locations-list-container">
			<h2>Locations List</h2>
			<ul class="locations-list">
				{#each $LocationsStore as location, index}
					<div class="flex flex-row items-center justify-between">
						<li>
							<button
								class={$LocationStore.id === location.id ? 'active list-item' : 'list-item'}
								key={location.id}
								on:click={() => handleLocationChange(location, index)}>{location.data.name}</button
							>
						</li>
						<button on:click={() => handleDelete(location)}>
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

	.locations-list {
	}

	.list-item {
		padding: 10px;
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
