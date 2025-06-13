<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Label from './Label.svelte';

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
		<Label class="mt-4 mb-2 font-semibold" child="name">Name *</Label>
		<input
			id="name"
			class="input input-bordered w-full"
			type="text"
			placeholder="Name"
			bind:value={thisLocation.name}
			required
		/>
	</div>
	<div>
		<Label class="mt-4 mb-2 font-semibold" child="description">Description</Label>
		<input
			class="input input-bordered w-full"
			id="description"
			type="text"
			placeholder="Description"
			bind:value={thisLocation.description}
		/>
	</div>
	<div>
		<Label class="mt-4 mb-2 font-semibold" child="street">Street *</Label>
		<input
			id="street"
			type="text"
			class="input input-bordered w-full"
			placeholder="Street"
			bind:value={thisLocation.street}
			required
		/>
	</div>
	<div>
		<Label class="mt-4 mb-2 font-semibold" child="city">City *</Label>
		<input
			id="city"
			type="text"
			class="input input-bordered w-full"
			placeholder="City"
			bind:value={thisLocation.city}
			required
		/>
	</div>
	<div>
		<Label class="mt-4 mb-2 font-semibold" child="zip">Zip *</Label>
		<input
			id="zip"
			type="text"
			class="input input-bordered w-full"
			placeholder="Zip"
			bind:value={thisLocation.zip}
			required
		/>
	</div>
	<div>
		<Label class="mt-4 mb-2 font-semibold" child="url">Open Street Map URL</Label>
		<input
			id="url"
			type="url"
			class="input input-bordered w-full"
			placeholder="OpenStreetMap URL"
			bind:value={thisLocation.openMapUrl}
		/>
		<div class="text-md mt-2 flex flex-row justify-end">
			<a href={openStreetUrl} class="link no-underline" target="_blank" rel="noopener noreferrer"
				>Check OpenStreetMap URL</a
			>
		</div>
	</div>
	<div class="mt-8 flex w-full flex-row justify-center gap-10">
		{#if showClose}
			<button class="btn-custom btn-custom-secondary" on:click={() => dispatch('close')}
				>Cancel</button
			>
		{/if}
		<button class="btn-custom btn-custom-primary" type="submit">Save</button>
	</div>
</form>

<style>
</style>
