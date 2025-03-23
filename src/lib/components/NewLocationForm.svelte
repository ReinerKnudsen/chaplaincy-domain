<script>
	import { createEventDispatcher } from 'svelte';
	import { Button, Input, Label } from 'flowbite-svelte';
	import { LocationStore } from '$lib/stores/LocationsStore';

	export let showClose = true;

	const dispatch = createEventDispatcher();
</script>

<div class="py-2 text-sm">All fields marked with * are required</div>
<form autocomplete="off">
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="name">Name *</Label>
		<Input id="name" type="text" placeholder="Name" bind:value={$LocationStore.name} required />
	</div>
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="description">Description</Label>
		<Input
			id="description"
			type="text"
			placeholder="Description"
			bind:value={$LocationStore.description}
		/>
	</div>
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="street">Street *</Label>
		<Input
			id="street"
			type="text"
			placeholder="Street"
			bind:value={$LocationStore.street}
			required
		/>
	</div>
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="city">City *</Label>
		<Input id="city" type="text" placeholder="City" bind:value={$LocationStore.city} required />
	</div>
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="zip">Zip *</Label>
		<Input id="zip" type="text" placeholder="Zip" bind:value={$LocationStore.zip} required />
	</div>
	<div>
		<Label class="mb-2 mt-4 font-semibold" for="url"
			><a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">
				Open Street Map URL</a
			>:</Label
		>
		<Input
			id="url"
			type="url"
			placeholder="OpenStreetMap URL"
			bind:value={$LocationStore.openMapUrl}
		/>
	</div>
	<div class="mt-8 flex w-full flex-row justify-center gap-10">
		<Button
			class="min-w-32 bg-primary-100 text-white-primary disabled:bg-primary-40 disabled:text-slate-600"
			on:click={() => dispatch('save')}>Save</Button
		>
		{#if showClose}
			<Button
				class="min-w-32 bg-primary-100 text-white-primary disabled:bg-primary-40 disabled:text-slate-600"
				on:click={() => dispatch('close')}>Cancel</Button
			>
		{/if}
	</div>
</form>

<style>
</style>
