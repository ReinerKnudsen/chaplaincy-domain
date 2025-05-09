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
	<div class="form bg-white-primary">
		<h1 class="mx-10">{$EditModeStore === 'update' ? 'Edit event' : 'Create new event'}</h1>
	</div>

	<form enctype="multipart/form-data" on:submit={handleSubmit} on:reset={handleReset}>
		<!-- First block -->
		<div class="form my-8 bg-white-primary p-10">
			<!-- Titel -->
			<div>
				<Label child="title">Event Titel *</Label>
				<Input
					type="text"
					id="title"
					placeholder="Event Title"
					bind:value={newEvent.title}
					required
				/>
			</div>

			<!-- Sub Title -->
			<div>
				<Label child="subtitle">Sub Title</Label>
				<Input type="text" id="subtitle" placeholder="Sub Title" bind:value={newEvent.subtitle} />
			</div>

			<!-- Description -->
			<div>
				<div class="flex-rows flex justify-between">
					<Label child="description">Description *</Label>
					<p class="self-end text-right text-base">
						<strong>{newEvent.description.length}</strong> characters.
					</p>
				</div>
				<Textarea
					id="description"
					placeholder="Description text"
					rows="14"
					name="description"
					bind:value={newEvent.description}
					wrap="hard"
					class="z-0"
				/>
			</div>

			<MarkdownHelp text={newEvent.description} />
			<SlugText
				text={newEvent.description}
				slugText={newEvent.slug}
				on:slugChange={handleSlugChange}
			/>

			<!-- Location -->
			<div class="form-area">
				<div>
					<Label child="Location">Location *</Label>
					<LocationDropdown on:change={handleLocationChange} />

					<!-- Modal for new location -->
					{#if showModal}
						<NewLocationModal
							on:locationAdded={handleLocationAddedModal}
							on:close={() => (showModal = false)}
						/>
					{/if}
				</div>
			</div>

			<!-- Conditions -->
			<div>
				<Label child="conditions">Conditions</Label>
				<Input type="text" id="conditions" bind:value={newEvent.condition} />
				<div class="mt-1 p-1">
					<Checkbox
						aria-describedby="helper-checkbox-text"
						id="condition"
						on:change={handleConditionChange}>Default</Checkbox
					>
					<Helper id="helper-checkbox-text" class="ps-6"
						>"Entry is free, donations are welcome"</Helper
					>
				</div>
			</div>
		</div>

		<!-- Second block -->
		<div class="form my-8 bg-white-primary p-10">
			<!-- Start date -->
			<div>
				<Label child="startdate">Start Date *</Label>
				<Input type="date" id="startdate" bind:value={newEvent.startdate} required />
			</div>
			<p class="explanation">Please enter all dates as dd mm yyyy.</p>

			<!-- Start time -->
			<div>
				<Label child="starttime" disabled={!newEvent.startdate}>Start Time *</Label>
				<Input
					type="time"
					id="starttime"
					bind:value={newEvent.starttime}
					required
					disabled={!newEvent.startdate}
				/>
			</div>

			<!-- End date -->
			<div class="flex-1">
				<Label child="enddate" disabled={!newEvent.startdate}>End Date</Label>
				<div class="flex w-full flex-row items-center gap-4">
					<Input
						type="date"
						id="enddate"
						bind:value={newEvent.enddate}
						disabled={!newEvent.startdate}
					/>
					<Button
						class="min-w-32 bg-primary-100 text-white-primary disabled:bg-primary-40 disabled:text-slate-600"
						on:click={handleSetEndDate}
						disabled={!newEvent.startdate}
						>Auto set
					</Button>
					<Tooltip type="light">Sets the end date tothe start date</Tooltip>
				</div>
			</div>

			<!-- End time -->
			<div>
				<Label child="endtime" disabled={!newEvent.enddate}>End Time</Label>
				<Input
					type="time"
					id="endtime"
					bind:value={newEvent.endtime}
					disabled={!newEvent.enddate}
				/>
			</div>
		</div>

		<!-- Third block -->
		<div class="form my-8 bg-white-primary p-10">
			<!-- Publish date  -->
			<div>
				<Label child="publishdate">Publish Date</Label>
				<div class="flex w-full flex-row items-center gap-4">
					<Input type="date" id="publishdate" bind:value={newEvent.publishdate} />
					<Button
						class="min-w-32 bg-primary-100 text-white-primary disabled:bg-primary-40 disabled:text-slate-600"
						on:click={handleSetPublishDate}
						>Auto set
					</Button>
					<Tooltip type="light">Sets the publish date to 14 days before the start date</Tooltip>
				</div>
				<p class="explanation">
					If you don't select a publish date, the event will be published immediately.
				</p>
			</div>

			<!-- Publish time  -->
			<div>
				<div>
					<Label child="publishTime" disabled={!newEvent.publishdate}>Publish Time</Label>
					<Input
						type="time"
						id="publishtime"
						bind:value={newEvent.publishtime}
						disabled={!newEvent.publishdate}
					/>
				</div>
				<p class="explanation {newEvent.publishdate ? 'opacity-100' : 'opacity-30'}">
					If you don't select a publish time, it will be set to 09:00 of the selected day.
				</p>
			</div>

			<!-- Unpublish Date -->
			<div>
				<Label child="unpublishdate" disabled={!newEvent.publishdate}>Unpublish Date</Label>
				<Input
					type="date"
					id="unpublishdate"
					title="Select a date when the event shall be unpublished (optional)"
					bind:value={newEvent.unpublishdate}
					disabled={!newEvent.publishdate}
				/>

				<p class="explanation {newEvent.publishdate ? 'opacity-100' : 'opacity-30'}">
					If you don't set a date and time here the event will automatically be unpublished at the
					given start time.
				</p>
			</div>

			<!-- Unpublish Time -->
			<div>
				<Label child="unpublishtime" disabled={!newEvent.unpublishdate}>Unpublish Time</Label>
				<Input
					type="time"
					id="unpublishtime"
					title="Select a time when the event shall be unpublished. (optional) "
					bind:value={newEvent.unpublishtime}
					disabled={!newEvent.unpublishdate}
				/>
			</div>
		</div>

		<!-- Fifth block -->
		<div class="form my-8 bg-white-primary p-10">
			<!-- Image -->
			<div>
				<Label child="image">Image</Label>
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
					<div>
						<Label child="imageAlt" disabled={!$hasImage}>Image Alt text *</Label>
						<Input
							type="text"
							id="imageAlt"
							bind:value={newEvent.imageAlt}
							required={$hasImage}
							disabled={!$hasImage}
							placeholder={$hasImage ? 'Image Alt text' : 'Please select an image first'}
						/>
						<p class="explanation {!$hasImage ? 'opacity-30' : 'opacity-100'}">
							This text helps interpreting the image for visually impaired users.
						</p>
					</div>
				</div>
				<div class="imageCaption mt-10">
					<div>
						<Label child="imageCaption" disabled={!$hasImage} text="Image caption"
							>Image caption</Label
						>
						<Input
							type="text"
							id="imageCaption"
							bind:value={newEvent.imageCaption}
							disabled={!$hasImage}
							placeholder={$hasImage ? 'Image by ...' : 'Please select an image first'}
						/>
						<p class="explanation {!$hasImage ? 'opacity-30' : 'opacity-100'}">
							This text will be displayed below the image.
						</p>
					</div>
				</div>
			</div>

			<div>
				<Label child="pdfFile">PDF Document</Label>
				<div class="flex flex-col items-center justify-center">
					<UploadPDF fileUrl={newEvent.pdfFile} on:upload={assignPDF} />
					<p class="explanation {!$hasImage ? 'opacity-30' : 'opacity-100'}">
						Upload a PDF document that will be attached to this event (max 5MB).
					</p>
				</div>
			</div>
		</div>

		<!-- Fourth block -->
		<div class="form my-8 bg-white-primary p-10">
			<!-- Comments -->
			<div class="col-span-2">
				<Label child="comments">Comments</Label>
				<Textarea
					id="comments"
					placeholder="Comments"
					rows="10"
					name="comments"
					title="If there is anything people should need to know about this event? Put it here. (Parking instructions, public transport connections...)"
					bind:value={newEvent.comments}
				/>
			</div>
		</div>

		<!-- Buttons block -->
		<div class="form bg-white-primary p-10">
			<!-- Buttons -->
			<div class="buttons col-span-2">
				<Button
					class="font-semibold"
					type="reset"
					color="light"
					on:click={() => goto('/admin/eventsadmin')}>Cancel</Button
				>
				<Button class="bg-black-40 text-white-primary" type="reset" color="light">Empty form</Button
				>
				<Button
					class="bg-primary-100  font-semibold text-white-primary"
					type="submit"
					disabled={newEvent.length === 0}
					>{$EditModeStore === 'update' ? 'Update' : 'Save'} event</Button
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
