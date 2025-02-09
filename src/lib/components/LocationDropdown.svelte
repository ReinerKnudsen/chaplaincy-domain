<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { getFirestore, collection, getDocs } from 'firebase/firestore';
	import { writable } from 'svelte/store';

	const db = getFirestore();
	export let locationAdded = false;

	const dispatch = createEventDispatcher();

	// Parent component should handle locationAdded event and set locationAdded to true

	export let selectedLocationId = '';
	export let locations;

	function handleChange(event) {
		dispatch('change', { value: event.target.value });
	}
</script>

<select
	class="mb-2 min-h-12 w-full rounded-md border-slate-300 bg-slate-50"
	bind:value={selectedLocationId}
	on:change={handleChange}
>
	<option value="" disabled>Select a location</option>
	{#each $locations as location}
		<option value={location.id}>{location.name}</option>
	{/each}
	<option value="new">Create new location...</option>
</select>
