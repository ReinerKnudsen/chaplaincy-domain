<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	import { Timestamp } from 'firebase/firestore';

	import { Input, Checkbox, Textarea, Helper, Button, Tooltip } from 'flowbite-svelte';

	import { uploadImage } from '$lib/services/fileService';
	import { EditMode, EditModeStore, type Event } from '$lib/stores/ObjectStore';
	import { selectedLocation, AllLocations, fetchLocations } from '$lib/stores/LocationsStore';
	import { authStore } from '$lib/stores/AuthStore';

	import SlugText from './SlugText.svelte';
	import MarkdownHelp from './MarkdownHelp.svelte';
	import UploadImage from '$lib/components/UploadImage.svelte';
	import LocationDropdown from './LocationDropdown.svelte';
	import NewLocationModal from './NewLocationModal.svelte';
	import UploadPDF from '$lib/components/UploadPDF.svelte';
	import Label from './Label.svelte';

	const dispatch = createEventDispatcher();

	const defaultEvent: Event = {
		author: $authStore.name,
		title: '',
		subtitle: '',
		description: '',
		slug: '',
		startdate: '',
		starttime: '',
		enddate: '',
		endtime: '',
		location: '',
		condition: '',
		publishdate: '',
		publishtime: '',
		publishDateTime: '',
		unpublishdate: '',
		unpublishtime: '',
		unpublishDateTime: '',
		comments: '',
		image: '',
		imageAlt: '',
		tags: [],
	};

	export let thisEvent: Event = defaultEvent;

	let newEvent: Event = defaultEvent;
	let hasImage = writable(false);
	let selectedImage: File;
	let showModal = false;
	let locationAdded = false;
	let loading = true;

	let locations;

	onMount(async () => {
		await fetchLocations();
		if ($EditModeStore === EditMode.Update) {
			newEvent = thisEvent;
			const location = $AllLocations.find((loc) => loc.id === thisEvent.location);
			selectedLocation.set(
				location || {
					id: '',
					name: '',
					description: '',
					street: '',
					city: '',
					zip: '',
					openMapUrl: '',
				},
			);
		}
		loading = false;
	});

	const handleConditionChange = (e: Event) => {
		if (e.target.checked) {
			newEvent.condition = 'Entry is free, donations are welcome.';
		} else {
			newEvent.condition = '';
		}
	};

	const handleSlugChange = (e: CustomEvent) => {
		newEvent.slug = e.detail;
	};

	const handleSetPublishDate = (e: MouseEvent) => {
		e.preventDefault();
		if (newEvent.startdate) {
			const pubdate = new Date(newEvent.startdate);
			pubdate.setDate(pubdate.getDate() - 14);
			newEvent.publishdate = pubdate.toISOString().split('T')[0];
		}
	};
	const handleSetEndDate = (e: MouseEvent) => {
		e.preventDefault();
		if (newEvent.startdate) {
			const enddate = new Date(newEvent.startdate);
			newEvent.enddate = enddate.toISOString().split('T')[0];
		}
	};

	const handleImageChange = (e: CustomEvent) => {
		selectedImage = e.detail;
		hasImage.set(!!e.detail);
		console.log('Image changed: ', e.detail, $hasImage);
	};

	const handleLocationChange = (event: CustomEvent<{ value: string }>) => {
		if (event.detail.value === 'new') {
			showModal = true;
		} else {
			newEvent.location = event.detail.value;
			const newLocation = $AllLocations.find((loc) => loc.id === event.detail.value);
			if (newLocation) {
				selectedLocation.set(newLocation);
			}
		}
	};

	const handleLocationAddedModal = async (event: CustomEvent) => {
		await fetchLocations();
		selectedLocation.set(event.detail.id);
		newEvent.location = event.detail.id;
		showModal = false;
	};

	const assignPDF = (e: CustomEvent) => {
		newEvent.pdfFile = e.detail.url;
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		if (!newEvent.publishdate) {
			newEvent.publishdate = new Date().toISOString().split('T')[0];
			const currentTime = new Date();
			newEvent.publishtime = currentTime.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: false,
			});
		}
		!newEvent.publishtime && (newEvent.publishtime = '09:00');
		!newEvent.unpublishdate && (newEvent.unpublishdate = newEvent.startdate);
		!newEvent.unpublishtime && (newEvent.unpublishtime = newEvent.starttime!);
		const publishDateTime = new Date(newEvent.publishdate + 'T' + newEvent.publishtime);
		newEvent.publishDateTime = Timestamp.fromDate(publishDateTime!);
		const unpublishDateTime = new Date(newEvent.unpublishdate + 'T' + newEvent.unpublishtime);
		newEvent.unpublishDateTime = Timestamp.fromDate(unpublishDateTime);
		newEvent.image = await uploadImage(selectedImage);
		dispatch($EditModeStore, newEvent);
		newEvent = defaultEvent;
		goto('/admin/eventsadmin');
	};

	const handleReset = () => {
		newEvent = defaultEvent;
		EditModeStore.set('');
	};
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	<div class="form border-0 bg-white-primary">
		<h1 class="mx-10">{$EditModeStore === 'update' ? 'Edit event' : 'Create new event'}</h1>
	</div>

	<form enctype="multipart/form-data" on:submit={handleSubmit} on:reset={handleReset}>
		<!-- First block -->
		<div class="form my-4 bg-white-primary px-10 py-4">
			<h3 class="mb-8 text-2xl font-semibold text-primary-100">General Information</h3>
			<!-- Titel -->
			<div class="component-wrapper">
				<label class="form-label" for="title">Event Titel *</label>
				<input
					class="form-input"
					type="text"
					id="title"
					placeholder="Event Title"
					bind:value={newEvent.title}
					required
				/>
			</div>

			<!-- Sub Title -->
			<div class="component-wrapper">
				<label class="form-label" for="subtitle">Sub Title</label>
				<input
					class="form-input"
					type="text"
					id="subtitle"
					placeholder="Sub Title"
					bind:value={newEvent.subtitle}
				/>
			</div>

			<!-- Description -->
			<div class="component-wrapper">
				<label class="form-label items-start pt-4" for="description">Description *</label>
				<textarea
					class="form-input z-0"
					id="description"
					placeholder="Description text"
					rows="14"
					name="description"
					bind:value={newEvent.description}
					wrap="hard"
				/>
			</div>
			<p class="self-end text-right text-base">
				<strong>{newEvent.description.length}</strong> characters.
			</p>

			<MarkdownHelp text={newEvent.description} />

			<SlugText
				text={newEvent.description}
				slugText={newEvent.slug}
				on:slugChange={handleSlugChange}
			/>

			<!-- Location -->
			<div class="component-wrapper">
				<label class="form-label" for="Location">Location *</label>
				<LocationDropdown on:change={handleLocationChange} />

				<!-- Modal for new location -->
				{#if showModal}
					<NewLocationModal
						on:locationAdded={handleLocationAddedModal}
						on:close={() => (showModal = false)}
					/>
				{/if}
			</div>

			<!-- Conditions -->
			<div class="component-wrapper">
				<label class="form-label" for="conditions">Conditions</label>
				<div class="flex w-full flex-col">
					<input
						class="form-input"
						type="text"
						id="conditions"
						placeholder="Conditions"
						bind:value={newEvent.condition}
					/>
					<div class="mt-2 flex flex-row items-center gap-2 pl-4">
						<input
							type="checkbox"
							aria-describedby="helper-checkbox-text"
							id="condition"
							on:change={handleConditionChange}
						/>
						<label for="condition">Default: "Entry is free, donations are welcome"</label>
					</div>
				</div>
			</div>
		</div>

		<!-- Second block -->
		<div class="form my-4 bg-white-primary px-10 py-4">
			<h3 class="mb-6 text-2xl font-semibold text-primary-100">Dates and times for the event</h3>
			<p class="form-explanation mb-2">Please enter all dates as dd mm yyyy.</p>
			<!-- Start date -->
			<div class="component-wrapper">
				<label class="form-label" for="startdate">Start Date *</label>
				<input
					class="form-input"
					type="date"
					id="startdate"
					bind:value={newEvent.startdate}
					required
				/>
			</div>

			<!-- Start time -->
			<div class="component-wrapper">
				<label class="form-label {!newEvent.startdate ? 'disabled' : ''}" for="starttime"
					>Start Time *</label
				>
				{#if newEvent.startdate}
					<input
						class="form-input"
						type="time"
						id="starttime"
						bind:value={newEvent.starttime}
						required
					/>
				{:else}
					<input
						class="form-input"
						type="text"
						placeholder="Please select a start date "
						disabled
					/>
				{/if}
			</div>

			<!-- End date -->
			<div class="component-wrapper">
				<label class="form-label {!newEvent.startdate ? 'disabled' : ''}" for="enddate"
					>End Date</label
				>
				<div class="flex w-full flex-row items-center gap-4">
					{#if newEvent.startdate}
						<input class="form-input" type="date" id="enddate" bind:value={newEvent.enddate} />
					{:else}
						<input
							class="form-input"
							type="text"
							placeholder="Please select a start date "
							disabled
						/>
					{/if}
					<button
						class="btn btn-primary"
						on:click={handleSetEndDate}
						disabled={!newEvent.startdate}
						title="Sets the end date tothe start date"
						>Auto set
					</button>
				</div>
			</div>

			<!-- End time -->
			<div class="component-wrapper">
				<label class="form-label {!newEvent.enddate ? 'disabled' : ''}" for="endtime"
					>End Time</label
				>
				{#if newEvent.enddate}
					<input class="form-input" type="time" id="endtime" bind:value={newEvent.endtime} />
				{:else}
					<input class="form-input" type="text" placeholder="Please select an end date " disabled />
				{/if}
			</div>
		</div>

		<!-- Third block -->
		<div class="form my-4 bg-white-primary px-10 py-4">
			<h3 class="mb-6 text-2xl font-semibold text-primary-100">Dates and times for publication</h3>
			<p class="form-explanation mb-2">Please enter all dates as dd mm yyyy.</p>

			<!-- Publish date  -->
			<div class="component-wrapper mb-1">
				<label class="form-label" for="publishdate">Publish Date</label>
				<div class="flex w-full flex-row items-center gap-4">
					<input
						class="form-input"
						type="date"
						id="publishdate"
						bind:value={newEvent.publishdate}
					/>
					<button
						class="btn btn-primary"
						on:click={handleSetPublishDate}
						title="Sets the publish date to 14 days before the start date"
						>Auto set
					</button>
				</div>
			</div>
			<p class="form-explanation">
				If you don't select a publish date, the event will be published immediately.
			</p>

			<!-- Publish time  -->
			<div class="component-wrapper mb-1">
				<label class="form-label {!newEvent.publishdate ? 'disabled' : ''}" for="publishTime"
					>Publish Time</label
				>
				{#if newEvent.publishdate}
					<input
						class="form-input"
						type="time"
						id="publishtime"
						bind:value={newEvent.publishtime}
					/>
				{:else}
					<input
						class="form-input"
						type="text"
						placeholder="Please select a publish date "
						disabled
					/>
				{/if}
			</div>
			<p class="form-explanation {!newEvent.publishdate ? 'disabled' : ''}">
				If you don't select a publish time, it will be set to 09:00 of {newEvent.publishdate ||
					'publish date'}.
			</p>

			<!-- Unpublish Date -->
			<div class="component-wrapper mb-1">
				<label class="form-label {!newEvent.publishdate ? 'disabled' : ''}" for="unpublishdate"
					>Unpublish Date</label
				>
				{#if newEvent.publishdate}
					<input
						class="form-input"
						type="date"
						id="unpublishdate"
						title="Select a date when the event shall be unpublished (optional)"
						bind:value={newEvent.unpublishdate}
					/>
				{:else}
					<input
						class="form-input"
						type="text"
						placeholder="Please select a publish date "
						disabled
					/>
				{/if}
			</div>
			<p class="form-explanation {!newEvent.publishdate ? 'disabled' : ''}">
				If you don't select an unpublish date the event will automatically be unpublished on {newEvent.startdate ||
					'start date'} at {newEvent.starttime || 'start time'}.
			</p>

			<!-- Unpublish Time -->
			<div class="component-wrapper mb-1">
				<label class="form-label {!newEvent.unpublishdate ? 'disabled' : ''}" for="unpublishtime"
					>Unpublish Time</label
				>
				{#if newEvent.unpublishdate}
					<input
						class="form-input"
						type="time"
						id="unpublishtime"
						title="Select a time when the event shall be unpublished. (optional) "
						bind:value={newEvent.unpublishtime}
						disabled={!newEvent.unpublishdate}
					/>
				{:else}
					<input
						class="form-input"
						type="text"
						placeholder="Please select an unpublish date "
						disabled
					/>
				{/if}
			</div>
		</div>

		<!-- Fourth block -->
		<div class="form my-4 bg-white-primary px-10 py-4">
			<h3 class="mb-6 text-2xl font-semibold text-primary-100">Attachments</h3>

			<!-- Image -->
			<div>
				<label class="form-label" for="image">Image</label>
				<div class="flex items-center justify-center">
					{#if newEvent.image}
						<UploadImage imageUrl={newEvent.image} on:imageChange={handleImageChange} />
					{:else}
						<UploadImage imageUrl="" on:imageChange={handleImageChange} />
					{/if}
				</div>
			</div>
			<div class="imageMeta">
				<div class="imageAlt">
					<div class="component-wrapper mb-1">
						<label class="form-label {!$hasImage ? 'disabled' : ''}" for="imageAlt"
							>Image Alt text *</label
						>
						<input
							class="form-input"
							type="text"
							id="imageAlt"
							bind:value={newEvent.imageAlt}
							required={$hasImage}
							disabled={!$hasImage}
							placeholder={$hasImage ? 'Image Alt text' : 'Please select an image first'}
						/>
					</div>
					<p class="form-explanation {!$hasImage ? 'disabled' : ''}">
						This text helps interpreting the image for visually impaired users.
					</p>
				</div>

				<div class="imageCaption mb-10">
					<div class="component-wrapper mb-1">
						<label class="form-label {!$hasImage ? 'disabled' : ''}" for="imageCaption"
							>Image caption</label
						>
						<input
							class="form-input"
							type="text"
							id="imageCaption"
							bind:value={newEvent.imageCaption}
							disabled={!$hasImage}
							placeholder={$hasImage ? 'Image by ...' : 'Please select an image first'}
						/>
					</div>
					<p class="form-explanation {!$hasImage ? 'disabled' : ''}">
						This text will be displayed below the image.
					</p>
				</div>
			</div>

			<div>
				<label class="form-label" for="pdfFile">PDF Document</label>
				<div class="flex flex-col items-center justify-center">
					<UploadPDF fileUrl={newEvent.pdfFile} on:upload={assignPDF} />
					<p class="explanation {!$hasImage ? 'opacity-30' : 'opacity-100'}">
						Upload a PDF document that will be attached to this event (max 5MB).
					</p>
				</div>
			</div>
		</div>

		<!-- Fifth block -->
		<div class="form my-4 bg-white-primary px-10 py-4">
			<h3 class="mb-6 text-2xl font-semibold text-primary-100">Comments</h3>
			<!-- Comments -->
			<div class="component-wrapper">
				<label class="form-label items-start pt-4" for="comments">Comments</label>
				<textarea
					id="comments"
					class="form-input z-0"
					rows="10"
					name="comments"
					placeholder="If there is anything people should need to know about this event? Put it here. (Parking instructions, public transport connections...)"
					bind:value={newEvent.comments}
					wrap="hard"
				/>
			</div>
		</div>

		<!-- Buttons block -->
		<div class="form bg-white-primary p-10">
			<!-- Buttons -->
			<div class="s btn col-span-2">
				<button class="btn btn-secondary" type="reset" on:click={() => goto('/admin/eventsadmin')}
					>Cancel</button
				>
				<button class="btn btn-secondary" type="reset">Empty form</button>
				<button class="btn btn-primary" type="submit" disabled={newEvent.title.length === 0}
					>{$EditModeStore === 'update' ? 'Update' : 'Save'} event</button
				>
			</div>
		</div>
	</form>

	<div>&NonBreakingSpace;</div>
{/if}

<style>
	.form {
		max-width: 90%;
		border: 1px solid #eaeaea;
		border-radius: 20px;
	}

	.explanation {
		margin: 10px 4px;
		font-size: 0.8rem;
	}
	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 80px;
		padding: 0 50px;
		justify-content: space-between;
		width: 100%;
		padding: 0 50px;
	}
</style>
