<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { selectedLocation, AllLocations } from '$lib/stores/LocationsStore';

	const dispatch = createEventDispatcher();

	function handleChange(event: Event) {
		dispatch('change', { value: (event.target as HTMLSelectElement).value });
	}
</script>

<select
	class="mb-2 min-h-12 w-full rounded-md border-slate-300 bg-slate-50"
	bind:value={$selectedLocation}
	on:change={handleChange}
>
	<option value="" disabled>Select a location</option>
	{#each $AllLocations as location}
		<option value={location.id}>{location.name}</option>
	{/each}
	<option value="new">Create new location...</option>
</select>
