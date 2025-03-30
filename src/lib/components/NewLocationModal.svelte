<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { addDoc, collection } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';

	import {
		CurrentLocation,
		AllLocations,
		selectedLocation,
		fetchLocations,
	} from '$lib/stores/LocationsStore';
	import NewLocationForm from './NewLocationForm.svelte';

	const db = database;
	const dispatch = createEventDispatcher();

	const handleSave = async () => {
		const { name, description, street, city, zip, openMapUrl } = $CurrentLocation;
		try {
			const docRef = await addDoc(collection(db, 'location'), {
				name,
				description,
				street,
				city,
				zip,
				openMapUrl,
			});
			await fetchLocations();
			const newLocation = $AllLocations.find((loc) => loc.id === docRef.id);
			if (newLocation) {
				selectedLocation.set(newLocation);
			}
			dispatch('locationAdded', { id: docRef.id, name });
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	};
</script>

<div class="overlay">
	<div class="modal">
		<h2>Add New Location</h2>
		<NewLocationForm on:save={handleSave} on:close={() => dispatch('close')} showClose={true} />
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background-color: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		width: 400px;
		max-width: 90%;
	}
</style>
