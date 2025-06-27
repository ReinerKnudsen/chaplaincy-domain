<script lang="ts">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher, onMount } from 'svelte';
	import { selectedLocation, AllLocations, fetchLocations } from '$lib/stores/LocationsStore';

	const dispatch = createEventDispatcher();
	let selectedId = $state($selectedLocation?.id || '');

	interface Props {
		onLocationChange: (value: string) => void;
		onNewLocation: () => void;
	}

	let { onLocationChange, onNewLocation }: Props = $props();

	onMount(async () => {
		await fetchLocations();
	});

	// Make selectedId reactive to selectedLocation changes
	run(() => {
		if ($selectedLocation && $selectedLocation.id) {
			selectedId = $selectedLocation.id;
		}
	});

	const handleChange = async (event: Event) => {
		const value = (event.target as HTMLSelectElement).value;
		if (value === 'new') {
			onNewLocation();
		} else {
			const location = $AllLocations.find((loc) => loc.id === value);
			if (location) {
				selectedId = location.id;
				selectedLocation.set(location);
				onLocationChange(value);
			}
		}
	};
</script>

<select
	class="mb-2 min-h-12 w-full rounded-md border-1 border-slate-300 px-6"
	value={selectedId}
	onchange={handleChange}
>
	<option value="" disabled>Select a location</option>
	{#each $AllLocations as location}
		<option value={location.id}>{location.name}</option>
	{/each}
	<option value="new">Create new location...</option>
</select>
