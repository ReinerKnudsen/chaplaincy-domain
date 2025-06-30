<script lang="ts">
	import { addDoc, collection } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';
	import { notificationStore, TOAST_DURATION } from '$lib/stores/notifications';

	import {
		CurrentLocation,
		AllLocations,
		selectedLocation,
		fetchLocations,
		type Location,
	} from '$lib/stores/LocationsStore';

	import NewLocationForm from './NewLocationForm.svelte';

	const db = database;

	interface Props {
		onLocationAdded: (location: Location) => void;
		onClose: () => void;
	}

	let { onLocationAdded, onClose }: Props = $props();

	const handleSave = async () => {
		const { name, description, street, city, zip, locationUrl, online } = $CurrentLocation;
		try {
			const docRef = await addDoc(collection(db, 'location'), {
				name,
				description,
				street,
				city,
				zip,
				locationUrl,
				online,
			});
			await fetchLocations();
			const newLocation = $AllLocations.find((loc) => loc.id === docRef.id);
			if (newLocation) {
				selectedLocation.set(newLocation);
				onLocationAdded(newLocation);
				notificationStore.addToast('success', 'Location added successfully', TOAST_DURATION);
				onClose();
			}
		} catch (error) {
			notificationStore.addToast('error', "Couldn't add the new location. Please try again.", 0);
			console.error('Error adding document: ', error);
		}
	};
</script>

<div class="overlay">
	<div class="bg-white-smoke w-1/4 rounded-xl p-10">
		<h2>Add New Location</h2>
		<NewLocationForm onSave={handleSave} {onClose} showClose={true} mode="create" />
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
</style>
