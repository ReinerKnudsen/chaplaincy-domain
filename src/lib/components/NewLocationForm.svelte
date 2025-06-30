<script lang="ts">
	import {
		CurrentLocation,
		resetCurrentLocation,
		type Location,
		initialLocationState,
	} from '$lib/stores/LocationsStore';

	import { Button } from '$lib/components/ui/button';
	import Checkbox from './Checkbox.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	type Mode = 'create' | 'update';

	interface Props {
		showClose?: boolean;
		mode?: Mode;
		onSave: () => void;
		onClose?: () => void;
	}

	let { showClose = true, mode = 'create', onSave, onClose }: Props = $props();

	let thisLocation: Location = $state({ ...initialLocationState });

	$effect(() => {
		if (mode === 'update') {
			thisLocation = { ...$CurrentLocation };
		} else if (mode === 'create' && thisLocation.id !== '') {
			// Only reset if we're switching to create mode and have existing data
			thisLocation = { ...initialLocationState };
		}
	});

	const handleOnlineChange = (checked: boolean) => {
		thisLocation.online = checked;
		if (checked) {
			thisLocation.street = '';
			thisLocation.city = '';
			thisLocation.zip = '';
		}
	};

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		$CurrentLocation = thisLocation;
		onSave();
	};

	const handleCancel = () => {
		resetCurrentLocation();
		onClose && onClose();
	};
</script>

<div id="newlocationform">
	<div class="py-2 text-sm">All fields marked with * are required</div>
	<form autocomplete="off" onsubmit={handleSubmit}>
		<fieldset>
			<Label for="name">Name *</Label>
			<Input id="name" type="text" placeholder="Name" bind:value={thisLocation.name} required />
		</fieldset>
		<fieldset>
			<Label for="description">Description</Label>
			<Input id="description" type="text" placeholder="Description" bind:value={thisLocation.description} />
		</fieldset>
		<fieldset>
			<Label for="isonline">Location type</Label>
			<div class="text-sm">Defines this location as a physical location or an online service</div>
			<Checkbox label="Online" id="isonline" bind:checked={thisLocation.online} onChange={handleOnlineChange} />
		</fieldset>
		{#if !thisLocation.online}
			<fieldset>
				<Label for="street">Street</Label>
				<Input id="street" type="text" placeholder="Street" bind:value={thisLocation.street} />
			</fieldset>
			<fieldset>
				<Label for="city">City</Label>
				<Input id="city" type="text" placeholder="City" bind:value={thisLocation.city} />
			</fieldset>
			<fieldset>
				<Label for="zip">Zip</Label>
				<Input id="zip" type="text" placeholder="Zip" bind:value={thisLocation.zip} />
			</fieldset>
		{/if}
		<fieldset>
			<Label for="url">URL</Label>
			<Input id="url" type="url" placeholder="OpenStreetMap Url or service Url" bind:value={thisLocation.locationUrl} />
			{#if thisLocation.locationUrl}
				<div class="text-md mt-2 flex flex-row justify-end">
					<Button variant="outline">
						<a href={thisLocation.locationUrl} class="link no-underline" target="_blank" rel="noopener noreferrer"
							>Check URL
						</a>
					</Button>
				</div>
			{/if}
		</fieldset>
		<div class="mt-8 flex w-full flex-row justify-center gap-10">
			{#if showClose}
				<Button variant="outline" onclick={handleCancel}>Cancel</Button>
			{/if}
			<Button variant="primary" type="submit">Save</Button>
		</div>
	</form>
</div>

<style>
</style>
