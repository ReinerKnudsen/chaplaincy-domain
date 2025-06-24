<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	import { Timestamp } from 'firebase/firestore';

	import { uploadImage } from '$lib/services/fileService';
	import {
		EditMode,
		EditModeStore,
		type DomainEvent,
		initialDomainEvent,
	} from '$lib/stores/ObjectStore';
	import {
		selectedLocation,
		AllLocations,
		fetchLocations,
		initialLocationState,
		type Location,
	} from '$lib/stores/LocationsStore';

	import UploadImage from '$lib/components/UploadImage.svelte';
	import LocationDropdown from './LocationDropdown.svelte';
	import NewLocationModal from './NewLocationModal.svelte';
	import UploadPDF from '$lib/components/UploadPDF.svelte';
	import Label from './Label.svelte';
	import Editor from './Editor.svelte';
	import SlugText from './SlugText.svelte';
	import Checkbox from './Checkbox.svelte';

	interface Props {
		thisEvent?: DomainEvent;
		onCreateNew?: (event: DomainEvent) => Promise<void>;
		onUpdate?: (event: DomainEvent) => Promise<void>;
	}

	let { thisEvent = initialDomainEvent, onCreateNew, onUpdate }: Props = $props();

	let newEvent: DomainEvent = $state(initialDomainEvent);
	let hasImage = writable(!!thisEvent.image);
	let hasPDF = writable(!!thisEvent.pdfFile);
	let selectedImage: File;
	let showModal = $state(false);
	let loading = $state(true);

	onMount(async () => {
		if ($EditModeStore === EditMode.Update) {
			newEvent = thisEvent;
			const location = $AllLocations.find((loc) => loc.id === thisEvent.location);
			selectedLocation.set(location || initialLocationState);
		} else {
			newEvent = { ...initialDomainEvent };
		}
		loading = false;
	});

	const handleConditionChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.checked) {
			newEvent.condition = 'Entry is free, donations are welcome.';
		} else {
			newEvent.condition = '';
		}
	};

	const handleSlugChange = (slugText: string) => {
		newEvent.slug = slugText;
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

	const handleImageChange = (imageFile: File) => {
		selectedImage = imageFile;
		hasImage.set(!!selectedImage);
	};

	const handleLocationChange = (locationId: string) => {
		newEvent.location = locationId;
		if (locationId) {
			selectedLocation.set(
				$AllLocations.find((loc) => loc.id === locationId) || initialLocationState
			);
		} else {
			selectedLocation.set(initialLocationState);
		}
	};

	const createNewLocation = () => {
		showModal = true;
	};

	const handleLocationAddedModal = async (newLocation: Location) => {
		// First close the modal to prevent any component refresh issues
		showModal = false;
		// Then fetch updated locations
		await fetchLocations();

		// Find the newly created location by ID
		const newLocId = newLocation.id;
		const foundLocation = $AllLocations.find((loc) => loc.id === newLocId);

		if (foundLocation) {
			selectedLocation.set(foundLocation);
			newEvent.location = newLocId;
			newEvent = { ...newEvent };
		}
	};

	const assignPDF = (pdfDocument: { url: string; docRef: any }) => {
		newEvent.pdfFile = pdfDocument.url;
		hasPDF.set(!!pdfDocument);
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
		// Ensure we have valid date strings before creating Date objects
		if (newEvent.publishdate && newEvent.publishtime) {
			const publishDateTime = new Date(newEvent.publishdate + 'T' + newEvent.publishtime);
			newEvent.publishDateTime = Timestamp.fromDate(publishDateTime);
		}

		if (newEvent.unpublishdate && newEvent.unpublishtime) {
			const unpublishDateTime = new Date(newEvent.unpublishdate + 'T' + newEvent.unpublishtime);
			newEvent.unpublishDateTime = Timestamp.fromDate(unpublishDateTime);
		}
		if (selectedImage) {
			newEvent.image = await uploadImage(selectedImage);
		}
		if ($EditModeStore === EditMode.New && onCreateNew) {
			await onCreateNew(newEvent);
		} else if ($EditModeStore === EditMode.Update && onUpdate) {
			await onUpdate(newEvent);
		}

		goto('/admin/eventsadmin');
	};

	const handleReset = () => {
		newEvent = { ...initialDomainEvent };
		EditModeStore.set('');
	};

	const handleChangeJoinOnline = (checked: boolean) => {
		newEvent.joinOnline = checked;
	};
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	<div class="form bg-white-primary">
		<h1 class="mx-10">{$EditModeStore === 'update' ? 'Edit event' : 'Create new event'}</h1>
	</div>

	<form
		id="form-container"
		enctype="multipart/form-data"
		onsubmit={handleSubmit}
		onreset={handleReset}
	>
		<!-- First block -->
		<div class="form bg-white-primary my-8 p-10">
			<!-- Titel -->
			<div>
				<Label child="title">Event Titel *</Label>
				<input
					type="text"
					id="title"
					class="input input-bordered w-full"
					placeholder="Event Title"
					bind:value={newEvent.title}
					required
				/>
			</div>

			<!-- Sub Title -->
			<div>
				<Label child="subtitle">Sub Title</Label>
				<input
					class="input input-bordered w-full"
					type="text"
					id="subtitle"
					placeholder="Sub Title"
					bind:value={newEvent.subtitle}
				/>
			</div>

			<!-- Description -->
			<div>
				<div class="flex-rows flex justify-between">
					<Label child="description">Description *</Label>
					<p class="self-end text-right text-base">
						<strong>{newEvent.description.length}</strong> characters.
					</p>
				</div>
				<Editor bind:content={newEvent.description} />
			</div>
			<SlugText
				text={newEvent.description}
				slugText={newEvent.slug}
				onSlugChange={handleSlugChange}
			/>

			<!-- Location -->
			<div class="form-area">
				<div>
					<Label child="Location">Location *</Label>
					<LocationDropdown
						onLocationChange={handleLocationChange}
						onNewLocation={createNewLocation}
					/>

					<!-- Modal for new location -->
					{#if showModal}
						<NewLocationModal
							onLocationAdded={handleLocationAddedModal}
							onClose={() => (showModal = false)}
						/>
					{/if}
					{#if $selectedLocation.online}
						<div>
							<Label class="mt-4 mb-2 font-semibold" child="joinonline">Join online</Label>

							<Checkbox
								label="Join online"
								id="joinonline"
								bind:checked={newEvent.joinOnline}
								onChange={handleChangeJoinOnline}
							/>
						</div>
						<p class="explanation">
							Adds a join button to the event 20 minutes before the event starts
						</p>
					{/if}
				</div>
			</div>

			<!-- Conditions -->
			<div>
				<Label child="conditions">Conditions</Label>
				<input
					class="input input-bordered w-full"
					type="text"
					id="conditions"
					bind:value={newEvent.condition}
				/>
				<div class="mt-1 p-1">
					<label class="flex flex-row items-center">
						<input
							type="checkbox"
							class="checkbox mr-4"
							aria-describedby="helper-checkbox-text"
							id="condition"
							onchange={handleConditionChange}
						/>
						Entry is free, donations are welcome
					</label>
				</div>
			</div>
		</div>

		<!-- Second block -->
		<div class="form bg-white-primary my-8 p-10">
			<!-- Start date -->
			<div>
				<Label child="startdate">Start Date *</Label>
				<input
					class="input input-bordered w-full"
					type="date"
					id="startdate"
					bind:value={newEvent.startdate}
					required
				/>
			</div>
			<p class="explanation">Please enter all dates as dd mm yyyy.</p>

			<!-- Start time -->
			<div>
				<Label child="starttime" disabled={!newEvent.startdate}>Start Time *</Label>
				<input
					type="time"
					id="starttime"
					class="input input-bordered w-full"
					bind:value={newEvent.starttime}
					required
					disabled={!newEvent.startdate}
				/>
			</div>

			<!-- End date -->
			<div class="flex-1">
				<Label child="enddate" disabled={!newEvent.startdate}>End Date</Label>
				<div class="flex w-full flex-row items-center gap-4">
					<input
						type="date"
						id="enddate"
						class="input input-bordered w-full"
						bind:value={newEvent.enddate}
						disabled={!newEvent.startdate}
					/>
					<div class="tooltip" data-tip="Sets the end date to the start date">
						<button
							class="btn btn-primary min-w-28"
							onclick={handleSetEndDate}
							disabled={!newEvent.startdate}
							>Auto set
						</button>
					</div>
				</div>
			</div>

			<!-- End time -->
			<div>
				<Label child="endtime" disabled={!newEvent.enddate}>End Time</Label>
				<input
					type="time"
					id="endtime"
					class="input input-bordered w-full"
					bind:value={newEvent.endtime}
					disabled={!newEvent.enddate}
				/>
			</div>
		</div>

		<!-- Third block -->
		<div class="form bg-white-primary my-8 p-10">
			<!-- Publish date  -->
			<div>
				<Label child="publishdate">Publish Date</Label>
				<div class="flex flex-col">
					<div class="flex w-full flex-row items-center gap-4">
						<input
							class="input input-bordered w-full"
							type="date"
							id="publishdate"
							bind:value={newEvent.publishdate}
						/>
						<div class="tooltip" data-tip="Sets the publish date to 14 days before the start date">
							<button
								class="btn btn-primary min-w-28"
								onclick={handleSetPublishDate}
								disabled={!newEvent.startdate}
								>Auto set
							</button>
						</div>
					</div>
					<p class="explanation">
						If you don't select a publish date, the event will be published immediately.
					</p>
				</div>

				<!-- Publish time  -->
				<div>
					<div>
						<Label child="publishTime" disabled={!newEvent.publishdate}>Publish Time</Label>
						<input
							type="time"
							id="publishtime"
							class="input input-bordered w-full"
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
					<input
						type="date"
						id="unpublishdate"
						class="input input-bordered w-full"
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
					<input
						type="time"
						id="unpublishtime"
						class="input input-bordered w-full"
						title="Select a time when the event shall be unpublished. (optional) "
						bind:value={newEvent.unpublishtime}
						disabled={!newEvent.unpublishdate}
					/>
				</div>
			</div>

			<!-- Fourth block -->
			<div class="form bg-white-primary my-8 p-10">
				<!-- Image -->
				<div>
					<Label child="image">Image</Label>
					<div class="flex items-center justify-center">
						{#if newEvent.image}
							<UploadImage imageUrl={newEvent.image} onImageChange={handleImageChange} />
						{:else}
							<UploadImage imageUrl="" onImageChange={handleImageChange} />
						{/if}
					</div>
				</div>
				<div class="imageMeta">
					<div class="imageAlt">
						<div>
							<Label child="imageAlt" disabled={!$hasImage}>Image Alt text *</Label>
							<input
								type="text"
								id="imageAlt"
								class="input input-bordered w-full"
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
							<input
								type="text"
								id="imageCaption"
								class="input input-bordered w-full"
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
						<UploadPDF fileUrl={newEvent.pdfFile} onUpload={assignPDF} />
						{#if !$hasPDF}
							<p class="explanation opacity-30">
								Upload a PDF document that will be attached to this event (max 5MB).
							</p>
						{/if}
					</div>
					<div>
						<Label child="pdfText" disabled={!$hasPDF}>PDF Description</Label>
						<input
							type="text"
							id="pdfText"
							class="input input-bordered w-full"
							bind:value={newEvent.pdfText}
							required={$hasPDF}
							disabled={!$hasPDF}
							placeholder={$hasPDF ? 'PDF Description' : 'Please select a PDF file first'}
						/>
						<p class="explanation {!$hasPDF ? 'opacity-30' : 'opacity-100'}">
							This text is the visible text for the PDF download link on the event page..
						</p>
					</div>
				</div>
			</div>

			<!-- Fifth block -->
			<div class="form bg-white-primary my-8 p-10">
				<!-- Comments -->
				<div class="col-span-2">
					<Label child="comments">Comments</Label>
					<textarea
						id="comments"
						class="textarea textarea-bordered w-full"
						placeholder="If there is anything people should need to know about this event? Put it here. (Parking instructions, public transport connections...)"
						rows="4"
						name="comments"
						bind:value={newEvent.comments}
					></textarea>
				</div>
			</div>

			<!-- Buttons block -->
			<div class="form bg-white-primary p-10">
				<!-- Buttons -->
				<div class="buttons col-span-2">
					<button class="btn" type="reset" color="light" onclick={() => goto('/admin/eventsadmin')}
						>Cancel</button
					>
					<button class="btn btn-neutral" type="reset" color="light">Empty form</button>
					<button class="btn btn-primary" type="submit" disabled={newEvent.title.length === 0}
						>{$EditModeStore === 'update' ? 'Update' : 'Save'} event</button
					>
				</div>
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
