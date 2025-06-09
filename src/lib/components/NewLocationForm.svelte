<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { Button, Input, Label } from 'flowbite-svelte';
	import {
		CurrentLocation,
		resetCurrentLocation,
		type Location,
		initialLocationState,
	} from '$lib/stores/LocationsStore';

	type Mode = 'create' | 'update';

	export let showClose = true;
	export let mode: Mode = 'create';

	let thisLocation: Location = { ...initialLocationState };

	$: if (mode === 'update') {
		thisLocation = { ...$CurrentLocation };
	} else if (mode === 'create' && thisLocation.id !== '') {
		// Only reset if we're switching to create mode and have existing data
		thisLocation = { ...initialLocationState };
	}

	const dispatch = createEventDispatcher<{
		save: void;
		close: void;
	}>();

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		$CurrentLocation = thisLocation;
		dispatch('save');
	}

	function resetForm() {
		resetCurrentLocation();
	}

	$: openStreetUrl = `https://www.openstreetmap.org/search?query=${thisLocation.street}+${thisLocation.city}`;
</script>

<div class="py-2 text-sm">All fields marked with * are required</div>
<form autocomplete="off" on:submit={handleSubmit}>
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="name">Name *</Label>
		<Input id="name" type="text" placeholder="Name" bind:value={thisLocation.name} required />
	</div>
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="description">Description</Label>
		<Input
			id="description"
			type="text"
			placeholder="Description"
			bind:value={thisLocation.description}
		/>
	</div>
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="street">Street *</Label>
		<Input id="street" type="text" placeholder="Street" bind:value={thisLocation.street} required />
	</div>
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="city">City *</Label>
		<Input id="city" type="text" placeholder="City" bind:value={thisLocation.city} required />
	</div>
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="zip">Zip *</Label>
		<Input id="zip" type="text" placeholder="Zip" bind:value={thisLocation.zip} required />
	</div>
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="url"
			><a href={openStreetUrl} target="_blank" rel="noopener noreferrer">
				Open Street Map URL</a
			>:</Label
		>
		<Input
			id="url"
			type="url"
			placeholder="OpenStreetMap URL"
			bind:value={thisLocation.openMapUrl}
		/>
	</div>
	<div class="mt-8 flex w-full flex-row justify-center gap-10">
		{#if showClose}
			<Button
				class="min-w-32 bg-secondary-100 text-primary-text disabled:bg-primary-40 disabled:text-slate-600"
				on:click={() => dispatch('close')}>Cancel</Button
			>
		{/if}
		<Button
			class="min-w-32 bg-primary-100 text-white-primary disabled:bg-primary-40 disabled:text-slate-600"
			type="submit">Save</Button
		>
	</div>
</form>

<style>
</style>
