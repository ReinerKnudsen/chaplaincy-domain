<script lang="ts">
	import { addDoc, collection } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';
	import { notificationStore, TOAST_DURATION } from '$lib/stores/notifications';
	import Icon from '@iconify/svelte';

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
	<div class="bg-white-smoke h-[90%] w-1/3 overflow-scroll rounded-xl p-6">
		<div class="flex flex-row items-center justify-between">
			<h2>Add New Location</h2>
			<button type="button" onclick={onClose} title="Close" class="cursor-pointer"
				><Icon icon="fa7-regular:xmark-circle" class="text-primary-100 h-8 w-8" />
			</button>
		</div>
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
