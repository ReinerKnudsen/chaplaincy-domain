<script>
	import { createEventDispatcher } from 'svelte';

	import { getFirestore, addDoc, collection } from 'firebase/firestore';
	import { LocationStore } from '$lib/stores/LocationsStore';

	import NewLocationForm from './NewLocationForm.svelte';

	const db = getFirestore();
	const dispatch = createEventDispatcher();

	const { name, description, street, city, zip, openMapUrl } = $LocationStore;

	const handleSave = async () => {
		try {
			const docRef = await addDoc(collection(db, 'location'), {
				name,
				description,
				street,
				city,
				zip,
				openMapUrl,
			});
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

	.anzeige {
		margin-top: 20px;
		margin-bottom: 10px;
		font-size: 1.5rem;
		font-weight: 700;
	}
</style>
