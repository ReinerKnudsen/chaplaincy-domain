<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getFirestore, addDoc, collection } from 'firebase/firestore';
	import { writable } from 'svelte/store';
	import { Button, Input, Label } from 'flowbite-svelte';

	const db = getFirestore();
	const dispatch = createEventDispatcher();

	let name = '';
	let description = '';
	let street = '';
	let city = '';
	let zip = '';
	let openMapUrl = '';

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
		<div class="py-2 text-sm">All fields marked with * are required</div>
		<div>
			<Label class="mb-2 mt-4 font-semibold" for="name">Name *</Label>
			<Input id="name" type="text" placeholder="Name" bind:value={name} required />
		</div>
		<div>
			<Label class="mb-2 mt-4 font-semibold" for="description">Description *</Label>
			<Input
				id="description"
				type="text"
				placeholder="Description"
				bind:value={description}
				required
			/>
		</div>
		<div>
			<Label class="mb-2 mt-4 font-semibold" for="street">Street *</Label>
			<Input id="street" type="text" placeholder="Street" bind:value={street} required />
		</div>
		<div>
			<Label class="mb-2 mt-4 font-semibold" for="city">City *</Label>
			<Input id="city" type="text" placeholder="City" bind:value={city} required />
		</div>
		<div>
			<Label class="mb-2 mt-4 font-semibold" for="zip">Zip *</Label>
			<Input id="zip" type="text" placeholder="Zip" bind:value={zip} required />
		</div>
		<div>
			<Label class="mb-2 mt-4 font-semibold" for="url">Open Street Map URL:</Label>
			<Input id="url" type="url" placeholder="OpenStreetMap URL" bind:value={openMapUrl} />
		</div>
		<div class="mt-8 flex w-full flex-row justify-center gap-10">
			<Button
				class="min-w-32 bg-primary-100 text-white-primary disabled:bg-primary-40 disabled:text-slate-600"
				on:click={handleSave}>Save</Button
			>
			<Button
				class="min-w-32 bg-primary-100 text-white-primary disabled:bg-primary-40 disabled:text-slate-600"
				on:click={() => dispatch('close')}>Cancel</Button
			>
		</div>
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
