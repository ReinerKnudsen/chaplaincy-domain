<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { CurrentLocation, resetCurrentLocation } from '$lib/stores/LocationsStore';

	export let showClose = true;

	const dispatch = createEventDispatcher<{
		save: void;
		close: void;
	}>();

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		dispatch('save');
	}

	function resetForm() {
		resetCurrentLocation();
	}

	$: openStreetUrl = `https://www.openstreetmap.org/search?query=${$CurrentLocation.street}+${$CurrentLocation.city}`;
</script>

<div class="py-2 text-sm">All fields marked with * are required</div>
<form autocomplete="off" on:submit={handleSubmit}>
	<div class="component-wrapper">
		<label class="form-label" for="name">Name *</label>
		<input
			class="form-input"
			id="name"
			type="text"
			placeholder="Name"
			bind:value={$CurrentLocation.name}
			required
		/>
	</div>
	<div class="component-wrapper">
		<label class="form-label" for="description">Description</label>
		<input
			class="form-input"
			id="description"
			type="text"
			placeholder="Description"
			bind:value={$CurrentLocation.description}
		/>
	</div>
	<div class="component-wrapper">
		<label class="form-label" for="street">Street *</label>
		<input
			class="form-input"
			id="street"
			type="text"
			placeholder="Street"
			bind:value={$CurrentLocation.street}
			required
		/>
	</div>
	<div class="component-wrapper">
		<label class="form-label" for="city">City *</label>
		<input
			class="form-input"
			id="city"
			type="text"
			placeholder="City"
			bind:value={$CurrentLocation.city}
			required
		/>
	</div>
	<div class="component-wrapper">
		<label class="form-label" for="zip">Zip *</label>
		<input
			class="form-input"
			id="zip"
			type="text"
			placeholder="Zip"
			bind:value={$CurrentLocation.zip}
			required
		/>
	</div>
	<div class="component-wrapper">
		<label class="form-label" for="url"
			><a href={openStreetUrl} target="_blank" rel="noopener noreferrer"> URL</a>:</label
		>
		<input
			class="form-input"
			id="url"
			type="url"
			placeholder="OpenStreetMap URL"
			bind:value={$CurrentLocation.openMapUrl}
		/>
	</div>
	<div class="mt-8 flex w-full flex-row justify-center gap-10">
		{#if showClose}
			<button class="button btn-secondary" on:click={() => dispatch('close')}>Cancel</button>
		{/if}
		<button class="button btn-primary" on:click={() => dispatch('save')}>Save</button>
	</div>
</form>

<style>
</style>
