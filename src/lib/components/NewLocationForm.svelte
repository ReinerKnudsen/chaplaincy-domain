<script lang="ts">
	import Label from './Label.svelte';
	import Checkbox from './Checkbox.svelte';

	import {
		CurrentLocation,
		resetCurrentLocation,
		type Location,
		initialLocationState,
	} from '$lib/stores/LocationsStore';

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
			<Label class="mt-4 mb-2 font-semibold" child="isonline">Location type</Label>
			<div class="text-sm">Defines this location as a physical location or an online service</div>
			<Checkbox
				label="Online"
				id="isonline"
				bind:checked={thisLocation.online}
				onChange={handleOnlineChange}
			/>
		</div>
		{#if !thisLocation.online}
			<div>
				<Label class="mt-4 mb-2 font-semibold" child="street">Street</Label>
				<input
					id="street"
					type="text"
					class="input input-bordered w-full"
					placeholder="Street"
					bind:value={thisLocation.street}
				/>
			</div>
			<div>
				<Label class="mt-4 mb-2 font-semibold" child="city">City</Label>
				<input
					id="city"
					type="text"
					class="input input-bordered w-full"
					placeholder="City"
					bind:value={thisLocation.city}
				/>
			</div>
			<div>
				<Label class="mt-4 mb-2 font-semibold" child="zip">Zip</Label>
				<input
					id="zip"
					type="text"
					class="input input-bordered w-full"
					placeholder="Zip"
					bind:value={thisLocation.zip}
				/>
			</div>
		{/if}
		<div>
			<Label class="mt-4 mb-2 font-semibold" child="url">URL</Label>
			<input
				id="url"
				type="url"
				class="input input-bordered w-full"
				placeholder="OpenStreetMap Url or service Url"
				bind:value={thisLocation.locationUrl}
			/>
			{#if thisLocation.locationUrl}
				<div class="text-md mt-2 flex flex-row justify-end">
					<a
						href={thisLocation.locationUrl}
						class="link no-underline"
						target="_blank"
						rel="noopener noreferrer"
						>Check OpenStreetMap URL
					</a>
				</div>
			{/if}
		</div>
		<div class="mt-8 flex w-full flex-row justify-center gap-10">
			{#if showClose}
				<button class="btn-custom btn-custom-secondary" onclick={handleCancel}>Cancel</button>
			{/if}
			<button class="btn btn-primary min-w-28" type="submit">Save</button>
		</div>
	</form>
</div>

<style>
</style>
