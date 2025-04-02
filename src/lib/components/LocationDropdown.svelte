<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { selectedLocation, AllLocations } from '$lib/stores/LocationsStore';

	const dispatch = createEventDispatcher();
	let selectedId = $selectedLocation?.id || '';

	$: {
		if ($selectedLocation) {
			selectedId = $selectedLocation.id;
		}
	}

	function handleChange(event: Event) {
		const value = (event.target as HTMLSelectElement).value;
		if (value === 'new') {
			dispatch('change', { value });
		} else {
			const location = $AllLocations.find((loc) => loc.id === value);
			if (location) {
				selectedId = location.id;
				selectedLocation.set(location);
				dispatch('change', { value } as { value: string });
			}
		}
	}
</script>

<select class="form-input" value={selectedId} on:change={handleChange}>
	<option value="" disabled>Select a location</option>
	{#each $AllLocations as location}
		<option value={location.id}>{location.name}</option>
	{/each}
	<option value="new">Create new location...</option>
</select>
