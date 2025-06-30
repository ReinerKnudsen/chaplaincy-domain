<script lang="ts">
	import {
		CurrentLocation,
		resetCurrentLocation,
		type Location,
		initialLocationState,
	} from '$lib/stores/LocationsStore';
	import { createHashableString, EditMode, EditModeStore } from '$lib/stores/ObjectStore';

	import { Button } from '$lib/components/ui/button';
	import Checkbox from './Checkbox.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';

	type Mode = 'create' | 'update';

	interface Props {
		showClose?: boolean;
		mode?: Mode;
		onSave: () => void;
		onClose?: () => void;
		onUnsavedChangesUpdate?: (hasUnsavedChanges: boolean) => void;
	}

	let { showClose = true, mode = 'create', onSave, onClose, onUnsavedChangesUpdate }: Props = $props();

	let thisLocation: Location = $state(mode === 'update' ? $CurrentLocation : { ...initialLocationState });
	let originalHash = $state('');
	let hasUnsavedChanges = $state(false);

	onMount(() => {
		if (mode === 'update') {
			originalHash = createHashableString($CurrentLocation);
		} else {
			originalHash = createHashableString(initialLocationState);
		}
	});

	$effect(() => {
		if (mode === 'update') {
			thisLocation = { ...$CurrentLocation };
		} else if (mode === 'create' && thisLocation.id !== '') {
			// Only reset if we're switching to create mode and have existing data
			thisLocation = { ...initialLocationState };
		}
	});

	const checkForChanges = () => {
		const currentHash = createHashableString(thisLocation);
		if (currentHash !== originalHash) {
			hasUnsavedChanges = true;
		} else {
			hasUnsavedChanges = false;
		}
		if (onUnsavedChangesUpdate) onUnsavedChangesUpdate(hasUnsavedChanges);
	};

	const handleOnlineChange = (checked: boolean) => {
		thisLocation.online = checked;
		if (checked) {
			thisLocation.street = '';
			thisLocation.city = '';
			thisLocation.zip = '';
		}
		checkForChanges();
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
			<Input
				id="name"
				type="text"
				placeholder="Name"
				bind:value={thisLocation.name}
				required
				onblur={checkForChanges}
			/>
		</fieldset>
		<fieldset>
			<Label for="description">Description</Label>
			<Input
				id="description"
				type="text"
				placeholder="Description"
				bind:value={thisLocation.description}
				onblur={checkForChanges}
			/>
		</fieldset>
		<fieldset>
			<Label for="isonline">Location type</Label>
			<div class="text-sm">Defines this location as a physical location or an online service</div>
			<Checkbox label="Online" id="isonline" bind:checked={thisLocation.online} onChange={handleOnlineChange} />
		</fieldset>
		{#if !thisLocation.online}
			<fieldset>
				<Label for="street">Street</Label>
				<Input id="street" type="text" placeholder="Street" bind:value={thisLocation.street} onblur={checkForChanges} />
			</fieldset>
			<fieldset>
				<Label for="city">City</Label>
				<Input id="city" type="text" placeholder="City" bind:value={thisLocation.city} onblur={checkForChanges} />
			</fieldset>
			<fieldset>
				<Label for="zip">Zip</Label>
				<Input id="zip" type="text" placeholder="Zip" bind:value={thisLocation.zip} onblur={checkForChanges} />
			</fieldset>
		{/if}
		<fieldset>
			<Label for="url">URL</Label>
			<Input
				id="url"
				type="url"
				placeholder="OpenStreetMap Url or service Url"
				bind:value={thisLocation.locationUrl}
				onblur={checkForChanges}
			/>
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
