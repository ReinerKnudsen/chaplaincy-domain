<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { marked } from 'marked';

	import {
		EditMode,
		EditModeStore,
		type DomainEvent,
		initialDomainEvent,
		ItemState,
		createHashableString,
	} from '$lib/stores/ObjectStore';
	import {
		selectedLocation,
		AllLocations,
		fetchLocations,
		initialLocationState,
		type Location,
	} from '$lib/stores/LocationsStore';
	import { selectedImage } from '$lib/stores/ImageSelectionStore';
	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import { cleanText } from '$lib/utils/HTMLfunctions';

	import UploadImage from '$lib/components/UploadImage.svelte';
	import LocationDropdown from './LocationDropdown.svelte';
	import NewLocationModal from './NewLocationModal.svelte';
	import UploadPDF from '$lib/components/UploadPDF.svelte';
	import Label from './Label.svelte';
	import Editor from './Editor.svelte';
	import SlugText from './SlugText.svelte';
	import Checkbox from './Checkbox.svelte';
	import Icon from '@iconify/svelte';
	import StateLabel from './StateLabel.svelte';

	interface Props {
		thisEvent?: DomainEvent;
		onSaveDraft?: (event: DomainEvent) => Promise<void>;
		onCreateNew?: (event: DomainEvent) => Promise<void>;
		onUpdate?: (event: DomainEvent) => Promise<void>;
		onCancel: () => void;
	}

	let { thisEvent: propEvent = initialDomainEvent, onSaveDraft, onCreateNew, onUpdate, onCancel }: Props = $props();

	let thisEvent = $state(propEvent);
	let hasImage = $derived(!!thisEvent.image);
	let hasPDF = $derived(!!thisEvent.pdfFile);
	let showModal = $state(false);
	let loading = $state(true);
	let originalHash = $state('');
	let hasUnsavedChanges = $state(false);

	onMount(async () => {
		if ($EditModeStore === EditMode.Update) {
			thisEvent = structuredClone(thisEvent);
			originalHash = createHashableString(thisEvent);
			const location = $AllLocations.find((loc) => loc.id === thisEvent.location);
			selectedLocation.set(location || initialLocationState);
		} else {
			thisEvent = { ...initialDomainEvent };
			originalHash = createHashableString(initialDomainEvent);
		}
		loading = false;
	});

	const checkForChanges = () => {
		//console.log('🔍 checkForChanges called from:', new Error().stack?.split('\n')[2]);
		const currentHash = createHashableString(thisEvent);
		if (currentHash !== originalHash) {
			hasUnsavedChanges = true;
		} else {
			hasUnsavedChanges = false;
		}
	};

	const isValidEvent = $derived(
		!!thisEvent.title &&
			!!thisEvent.description &&
			!!thisEvent.slug &&
			!!thisEvent.startdate &&
			!!thisEvent.starttime &&
			!!thisEvent.enddate &&
			!!thisEvent.endtime &&
			!!thisEvent.location
	);

	/**
	 * # form functions
	 */
	const assignPDF = (pdfDocument: { url: string; docRef: any }) => {
		thisEvent = { ...thisEvent, pdfFile: pdfDocument.url };
		checkForChanges();
	};

	const createNewLocation = () => {
		showModal = true;
	};

	const handleChangeJoinOnline = (checked: boolean) => {
		thisEvent = { ...thisEvent, joinOnline: checked };
		checkForChanges();
	};

	const handleConditionChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.checked) {
			thisEvent = { ...thisEvent, condition: 'Entry is free, donations are welcome.' };
		} else {
			thisEvent = { ...thisEvent, condition: '' };
		}
		checkForChanges();
	};

	const handleImageChange = () => {
		thisEvent = { ...thisEvent, image: $selectedImage?.name };
		checkForChanges();
	};

	const handleLocationChange = (locationId: string) => {
		thisEvent = { ...thisEvent, location: locationId };
		if (locationId) {
			selectedLocation.set($AllLocations.find((loc) => loc.id === locationId) || initialLocationState);
		} else {
			selectedLocation.set(initialLocationState);
		}
		checkForChanges();
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
			selectedLocation.set({ ...foundLocation });
			thisEvent = { ...thisEvent, location: newLocId };
			thisEvent = { ...thisEvent };
		}
		checkForChanges();
	};

	const handleReset = () => {
		thisEvent = { ...initialDomainEvent };
		EditModeStore.set('');
		checkForChanges();
	};

	const handleSaveDraft = async () => {
		if (onSaveDraft) {
			await onSaveDraft(thisEvent);
		}
	};

	const handleSetEndDate = (e: MouseEvent) => {
		e.preventDefault();
		if (thisEvent.startdate) {
			const enddate = new Date(thisEvent.startdate);
			thisEvent = { ...thisEvent, enddate: enddate.toISOString().split('T')[0] };
		}
		checkForChanges();
	};

	const handleSetPublishDate = (e: MouseEvent) => {
		e.preventDefault();
		if (thisEvent.startdate) {
			const pubdate = new Date(thisEvent.startdate);
			pubdate.setDate(pubdate.getDate() - 7);
			thisEvent = { ...thisEvent, publishdate: pubdate.toISOString().split('T')[0] };
		}
		checkForChanges();
	};

	const handleSlugChange = (slugText: string) => {
		thisEvent = { ...thisEvent, slug: slugText.trim() };
		checkForChanges();
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		if ($EditModeStore === EditMode.New && onCreateNew) {
			await onCreateNew(thisEvent);
		} else if ($EditModeStore === EditMode.Update && onUpdate) {
			await onUpdate(thisEvent);
		}
	};

	async function handleCancel() {}

	const prepareSlugText = async () => {
		if (!thisEvent.description) {
			thisEvent = { ...thisEvent, slug: '' };
			return;
		}
		const parsedText = await marked.parse(thisEvent.description);
		thisEvent = { ...thisEvent, slug: cleanText(parsedText).slice(0, MAX_SLUG_TEXT) };
		checkForChanges();
	};
</script>

{#if loading}
	<div>Loading...</div>
{:else}
	<div class="form bg-white-primary">
		<div id="headline" class="flex flex-row items-center justify-between">
			<h1 class="mx-10">
				{$EditModeStore === 'update' ? 'Edit event' : 'Create new event'}
			</h1>
			<div class=" flex h-full flex-row items-end justify-center gap-4">
				<StateLabel state={thisEvent.state} class="mx-10 h-10 w-30" />
				{#if hasUnsavedChanges}
					<Icon icon="fa6-regular:pen-to-square" class="mr-10 h-6 w-6 self-center" />
				{/if}
			</div>
		</div>
	</div>

	<form id="form-container" enctype="multipart/form-data" onsubmit={handleSubmit} onreset={handleReset}>
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
					bind:value={thisEvent.title}
					onblur={() => {
						thisEvent = { ...thisEvent, title: thisEvent.title?.trim() || null };
						checkForChanges();
					}}
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
					onblur={() => {
						thisEvent = { ...thisEvent, subtitle: thisEvent.subtitle?.trim() || null };
						checkForChanges();
					}}
					bind:value={thisEvent.subtitle}
				/>
			</div>

			<!-- Description -->
			<div>
				<div class="flex-rows flex justify-between">
					<Label child="description">Description *</Label>
					<p class="self-end text-right text-base">
						<strong>{thisEvent.description ? thisEvent.description.length : 0}</strong> characters.
					</p>
				</div>
				<Editor
					bind:content={thisEvent.description}
					onBlur={() => {
						thisEvent = { ...thisEvent, description: thisEvent.description?.trim() || null };
						prepareSlugText();
					}}
				/>
			</div>

			<!-- SlugText -->

			<div>
				<SlugText slugText={thisEvent.slug} required={true} onBlur={handleSlugChange} />
			</div>

			<!-- Location -->
			<div class="form-area">
				<div>
					<Label child="Location">Location *</Label>
					<LocationDropdown onLocationChange={handleLocationChange} onNewLocation={createNewLocation} />

					<!-- Modal for new location -->
					{#if showModal}
						<NewLocationModal onLocationAdded={handleLocationAddedModal} onClose={() => (showModal = false)} />
					{/if}
					{#if $selectedLocation.online}
						<div>
							<Label class="mt-4 mb-2 font-semibold" child="joinonline">Join online</Label>

							<Checkbox
								label="Join online"
								id="joinonline"
								bind:checked={thisEvent.joinOnline}
								onChange={handleChangeJoinOnline}
							/>
						</div>
						<p class="explanation">Adds a join button to the event 20 minutes before the event starts</p>
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
					bind:value={thisEvent.condition}
					onblur={checkForChanges}
				/>
				<div class="mt-1 p-1">
					<label class="flex flex-row items-center">
						<input
							type="checkbox"
							class="checkbox mr-4"
							aria-describedby="helper-checkbox-text"
							id="condition"
							onblur={handleConditionChange}
						/>
						Entry is free, donations are welcome
					</label>
				</div>
			</div>
		</div>

		<div class="form bg-white-primary my-8 p-10">
			<!-- Start date -->
			<div>
				<Label child="startdate">Start Date *</Label>
				<input
					class="input input-bordered w-full"
					type="date"
					id="startdate"
					bind:value={thisEvent.startdate}
					onblur={checkForChanges}
				/>
			</div>
			<p class="explanation">Please enter all dates as dd.mm.yyyy or use the calendar picker.</p>

			<!-- Start time -->
			<div>
				<Label child="starttime" disabled={!thisEvent.startdate}>Start Time *</Label>
				<input
					type="time"
					id="starttime"
					class="input input-bordered w-full"
					bind:value={thisEvent.starttime}
					onblur={checkForChanges}
					disabled={!thisEvent.startdate}
				/>
			</div>

			<!-- End date -->
			<div class="flex-1">
				<Label child="enddate" disabled={!thisEvent.startdate}>End Date *</Label>
				<div class="flex w-full flex-row items-center gap-4">
					<input
						type="date"
						id="enddate"
						class="input input-bordered w-full"
						bind:value={thisEvent.enddate}
						onblur={checkForChanges}
						disabled={!thisEvent.startdate}
					/>
					<div class="tooltip" data-tip="Sets the end date to the start date">
						<button class="btn btn-primary min-w-28" onclick={handleSetEndDate} disabled={!thisEvent.startdate}
							>Auto set
						</button>
					</div>
				</div>
			</div>

			<!-- End time -->
			<div>
				<Label child="endtime" disabled={!thisEvent.enddate}>End Time *</Label>
				<input
					type="time"
					id="endtime"
					class="input input-bordered w-full"
					bind:value={thisEvent.endtime}
					disabled={!thisEvent.enddate}
					onblur={checkForChanges}
				/>
			</div>
		</div>

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
							bind:value={thisEvent.publishdate}
							onblur={checkForChanges}
						/>
						<div class="tooltip" data-tip="Sets the publish date to 14 days before the start date">
							<button class="btn btn-primary min-w-28" onclick={handleSetPublishDate} disabled={!thisEvent.startdate}
								>Auto set
							</button>
						</div>
					</div>
					<p class="explanation">If you don't select a publish date, the event will be published immediately.</p>
				</div>

				<!-- Publish time  -->
				<div>
					<div>
						<Label child="publishTime" disabled={!thisEvent.publishdate}>Publish Time</Label>
						<input
							type="time"
							id="publishtime"
							class="input input-bordered w-full"
							bind:value={thisEvent.publishtime}
							disabled={!thisEvent.publishdate}
							onblur={checkForChanges}
						/>
					</div>
					<p class="explanation {thisEvent.publishdate ? 'opacity-100' : 'opacity-30'}">
						If you don't select a publish time, it will be set to 09:00 of the selected day.
					</p>
				</div>

				<!-- Unpublish Date -->
				<div>
					<Label child="unpublishdate" disabled={!thisEvent.publishdate}>Unpublish Date</Label>
					<input
						type="date"
						id="unpublishdate"
						class="input input-bordered w-full"
						title="Select a date when the event shall be unpublished (optional)"
						bind:value={thisEvent.unpublishdate}
						disabled={!thisEvent.publishdate}
						onblur={checkForChanges}
					/>

					<p class="explanation {thisEvent.publishdate ? 'opacity-100' : 'opacity-30'}">
						If you don't set a date and time here the event will automatically be unpublished at the given start time.
					</p>
				</div>

				<!-- Unpublish Time -->
				<div>
					<Label child="unpublishtime" disabled={!thisEvent.unpublishdate}>Unpublish Time</Label>
					<input
						type="time"
						id="unpublishtime"
						class="input input-bordered w-full"
						title="Select a time when the event shall be unpublished. (optional) "
						bind:value={thisEvent.unpublishtime}
						disabled={!thisEvent.unpublishdate}
						onblur={checkForChanges}
					/>
				</div>
			</div>

			<!-- Image -->
			<div class="form bg-white-primary my-8 p-10">
				<div>
					<Label child="image">Image</Label>
					<div class="flex items-center justify-center">
						{#if thisEvent.image}
							<UploadImage imageUrl={thisEvent.image} onImageChange={handleImageChange} />
						{:else}
							<UploadImage imageUrl="" onImageChange={handleImageChange} />
						{/if}
					</div>
				</div>

				<!-- Image Alt Text-->
				<div class="imageMeta">
					<div class="imageAlt">
						<div>
							<Label child="imageAlt" disabled={!hasImage}>Image Alt text *</Label>
							<input
								type="text"
								id="imageAlt"
								class="input input-bordered w-full"
								bind:value={thisEvent.imageAlt}
								onblur={checkForChanges}
								required={hasImage}
								disabled={!hasImage}
								placeholder={hasImage ? 'Image Alt text' : 'Please select an image first'}
							/>
							<p class="explanation {!hasImage ? 'opacity-30' : 'opacity-100'}">
								This text helps interpreting the image for visually impaired users.
							</p>
						</div>
					</div>

					<!-- Image Caption -->
					<div class="imageCaption mt-10">
						<div>
							<Label child="imageCaption" disabled={!hasImage}>Image caption</Label>
							<input
								type="text"
								id="imageCaption"
								class="input input-bordered w-full"
								bind:value={thisEvent.imageCaption}
								onblur={checkForChanges}
								disabled={!hasImage}
								placeholder={hasImage ? 'Image by ...' : 'Please select an image first'}
							/>
							<p class="explanation {!hasImage ? 'opacity-30' : 'opacity-100'}">
								This text will be displayed below the image.
							</p>
						</div>
					</div>
				</div>

				<div>
					<Label child="pdfFile">PDF Document</Label>
					<div class="flex flex-col items-center justify-center">
						<UploadPDF fileUrl={thisEvent.pdfFile} onUpload={assignPDF} />
						{#if !hasPDF}
							<p class="explanation opacity-30">Upload a PDF document that will be attached to this event (max 5MB).</p>
						{/if}
					</div>
					<div>
						<Label child="pdfText" disabled={!hasPDF}>PDF Description</Label>
						<input
							type="text"
							id="pdfText"
							class="input input-bordered w-full"
							bind:value={thisEvent.pdfText}
							required={hasPDF}
							disabled={!hasPDF}
							placeholder={hasPDF ? 'PDF Description' : 'Please select a PDF file first'}
						/>
						<p class="explanation {!hasPDF ? 'opacity-30' : 'opacity-100'}">
							This text is the visible text for the PDF download link on the event page..
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Buttons block -->
		<div class="form fixed right-0 bottom-10 left-0 z-50 mx-auto w-3/4 gap-4 bg-slate-100 p-10 shadow-2xl">
			<!-- Buttons -->
			<div class="buttons col-span-2">
				<button class="btn" type="reset" color="light" onclick={onCancel}>Cancel</button>
				<button class="btn btn-soft" type="reset" color="light">Empty form</button>
				{#if thisEvent.state === ItemState.DRAFT}
					<button
						class="btn btn-soft"
						type="button"
						color="light"
						disabled={!hasUnsavedChanges}
						onclick={handleSaveDraft}>Save draft</button
					>
				{/if}
				<button class="btn btn-primary" type="submit" disabled={!isValidEvent || !hasUnsavedChanges}
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
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 50px;
		padding: 0 50px;
		justify-content: space-between;
		width: 100%;
		padding: 0 50px;
	}
</style>
