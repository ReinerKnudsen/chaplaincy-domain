<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	import { getDoc, doc } from 'firebase/firestore';
	import { getDownloadURL, getMetadata, type StorageReference } from 'firebase/storage';
	import { imageColRef } from '$lib/firebase/firebaseConfig';

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
		resetSelectedLocation,
		type Location,
	} from '$lib/stores/LocationsStore';

	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import { cleanText } from '$lib/utils/HTMLfunctions';

	import { Button } from '$lib/components/ui/button';
	import Checkbox from './Checkbox.svelte';
	import Editor from './Editor.svelte';
	import Icon from '@iconify/svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import LocationDropdown from './LocationDropdown.svelte';
	import NewLocationModal from './NewLocationModal.svelte';
	import SlugText from './SlugText.svelte';
	import StateLabel from './StateLabel.svelte';
	import UploadImage from '$lib/components/UploadImage.svelte';
	import UploadPDF from '$lib/components/UploadPDF.svelte';

	interface Props {
		thisEvent?: DomainEvent;
		onSaveDraft?: (event: DomainEvent, image: File | null, pdf: File | null) => Promise<void>;
		onCreateNew?: (event: DomainEvent, image: File | null, pdf: File | null) => Promise<void>;
		onUpdate?: (event: DomainEvent, image: File | null, pdf: File | null) => Promise<void>;
		onCancel: () => void;
		onUnsavedChangesUpdate: (hasUnsavedChanges: boolean) => void;
	}

	let {
		thisEvent: propEvent = initialDomainEvent,
		onUnsavedChangesUpdate,
		onSaveDraft,
		onCreateNew,
		onUpdate,
		onCancel,
	}: Props = $props();

	let thisEvent = $state(propEvent);
	let hasImage = $derived(!!thisEvent.image);
	let newImage: File | null = $state(null);
	let newPDF: File | null = $state(null);
	let hasPDF = $derived(!!thisEvent.pdfFile);
	let showModal = $state(false);
	let loading = $state(true);
	let originalHash = $state('');
	let hasUnsavedChanges = $state(false);

	onMount(async () => {
		if ($EditModeStore === EditMode.Update) {
			const cloneEvent = JSON.parse(JSON.stringify(thisEvent));
			originalHash = createHashableString(cloneEvent);
			if (!$AllLocations) await fetchLocations();
			const location = $AllLocations.find((loc) => loc.id === thisEvent.location);
			selectedLocation.set(location || initialLocationState);
		} else {
			thisEvent = { ...initialDomainEvent };
			originalHash = createHashableString(initialDomainEvent);
		}
		loading = false;
	});

	const checkForChanges = () => {
		const currentHash = createHashableString(thisEvent);
		if (currentHash !== originalHash) {
			hasUnsavedChanges = true;
		} else {
			hasUnsavedChanges = false;
		}
		onUnsavedChangesUpdate(hasUnsavedChanges);
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

	const handleExistingImageSelected = async (imageRef: StorageReference) => {
		newImage = null;
		try {
			const imageDoc = await getDoc(doc(imageColRef, imageRef.name));
			const imageData = imageDoc.data();
			const altText = imageData?.altText || '';
			const captionText = imageData?.caption || '';
			const imagePath = await getDownloadURL(imageRef);

			thisEvent = { ...thisEvent, image: imagePath, imageAlt: altText, imageCaption: captionText };
			checkForChanges();
		} catch (error) {
			// Try catching image without metadata
			try {
				const imagePath = await getDownloadURL(imageRef);
				thisEvent = { ...thisEvent, image: imagePath, imageAlt: '', imageCaption: '' };
				checkForChanges();
			} catch (urlError) {
				console.error('Error getting image URL:', urlError);
			}
		}
	};

	const handleNewFileSelected = (image: File) => {
		newImage = image;
		thisEvent = { ...thisEvent, image: image.name, imageAlt: '', imageCaption: '' };
		checkForChanges();
	};

	const handleExistingPDFSelected = async (pdfRef: StorageReference) => {
		newPDF = null;
		const pdfUrl = await getDownloadURL(pdfRef);
		thisEvent = { ...thisEvent, pdfFile: pdfUrl, pdfName: pdfRef.name };
		checkForChanges();
	};

	const handleNewPDFSelected = (pdf: File) => {
		newPDF = pdf;
		thisEvent = { ...thisEvent, pdfFile: pdf.name, pdfName: pdf.name };
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
		EditModeStore.set(EditMode.Empty);
		resetSelectedLocation();
		checkForChanges();
	};

	const handleSaveDraft = async () => {
		if (onSaveDraft) {
			await onSaveDraft(thisEvent, newImage, newPDF);
		}
	};

	const handleSetEndDate = (e: Event) => {
		e.preventDefault();
		if (thisEvent.startdate) {
			const enddate = new Date(thisEvent.startdate);
			thisEvent = { ...thisEvent, enddate: enddate.toISOString().split('T')[0] };
		}
		checkForChanges();
	};

	const handleSetPublishDate = (e: Event) => {
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
			await onCreateNew(thisEvent, newImage, newPDF);
		} else if ($EditModeStore === EditMode.Update && onUpdate) {
			await onUpdate(thisEvent, newImage, newPDF);
		}
	};

	async function handleCancel() {}

	const prepareSlugText = async () => {
		if (!thisEvent.description) {
			thisEvent = { ...thisEvent, slug: '' };
			return;
		}
		if (thisEvent.slug?.trim().length === 0) {
			const parsedText = await marked.parse(thisEvent.description);
			thisEvent = { ...thisEvent, slug: cleanText(parsedText).slice(0, MAX_SLUG_TEXT) };
		}
		checkForChanges();
	};

	const newLocationClose = () => {};

	const handleModalClose = () => {
		if (!$selectedLocation?.id) {
			selectedLocation.set(initialLocationState);
		} else {
			selectedLocation.set($selectedLocation);
		}
		showModal = false;
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
		<div class="text-md mx-10 mb-10 bg-slate-100 p-2">All fields marked with * are required</div>
	</div>

	<form id="form-container" enctype="multipart/form-data" onsubmit={handleSubmit} onreset={handleReset}>
		<!-- First block -->
		<div class="form bg-white-primary my-8 p-10">
			<!-- Titel -->
			<fieldset>
				<Label for="title">Event Titel *</Label>
				<Input
					type="text"
					id="title"
					placeholder="Event Title"
					bind:value={thisEvent.title}
					onblur={() => {
						thisEvent = { ...thisEvent, title: thisEvent.title?.trim() || null };
						checkForChanges();
					}}
					required
				/>
			</fieldset>

			<!-- Sub Title -->
			<fieldset>
				<Label for="subtitle">Sub Title</Label>
				<Input
					type="text"
					id="subtitle"
					placeholder="Sub Title"
					onblur={() => {
						thisEvent = { ...thisEvent, subtitle: thisEvent.subtitle?.trim() || null };
						checkForChanges();
					}}
					bind:value={thisEvent.subtitle}
				/>
			</fieldset>

			<!-- Description -->
			<fieldset>
				<div class="flex-rows flex justify-between">
					<Label for="description">Description *</Label>
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
			</fieldset>

			<!-- SlugText -->

			<fieldset>
				<SlugText slugText={thisEvent.slug} required={true} onBlur={handleSlugChange} />
			</fieldset>

			<!-- Location -->
			<div class="form-area">
				<fieldset>
					<Label for="Location">Location *</Label>
					<LocationDropdown
						onLocationChange={handleLocationChange}
						onNewLocation={createNewLocation}
						onModalClosed={handleModalClose}
					/>

					<!-- Modal for new location -->
					{#if showModal}
						<NewLocationModal onLocationAdded={handleLocationAddedModal} onClose={handleModalClose} />
					{/if}
					{#if $selectedLocation.online}
						<fieldset>
							<Label class="mt-4 mb-2 font-semibold" for="joinonline">Join online</Label>

							<Checkbox
								label="Join online"
								id="joinonline"
								bind:checked={thisEvent.joinOnline}
								onChange={handleChangeJoinOnline}
							/>
						</fieldset>
						<p class="explanation">Adds a join button to the event 20 minutes before the event starts</p>
					{/if}
				</fieldset>
			</div>

			<!-- Conditions -->
			<fieldset>
				<Label for="conditions">Conditions</Label>
				<Input type="text" id="conditions" bind:value={thisEvent.condition} onblur={checkForChanges} />
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
			</fieldset>
		</div>

		<div id="dates" class="form bg-white-primary my-8 p-10">
			<!-- Start date -->
			<fieldset>
				<Label for="startdate">Start Date *</Label>
				<Input type="date" id="startdate" bind:value={thisEvent.startdate} onblur={handleSetEndDate} />
			</fieldset>
			<p class="explanation">Please enter all dates as dd.mm.yyyy or use the calendar picker.</p>

			<!-- Start time -->
			<fieldset disabled={!thisEvent.startdate}>
				<Label for="starttime">Start Time *</Label>
				<Input
					type="time"
					id="starttime"
					bind:value={thisEvent.starttime}
					onblur={checkForChanges}
					disabled={!thisEvent.startdate}
				/>
			</fieldset>

			<!-- End date -->
			<fieldset class="flex-1" disabled={!thisEvent.startdate}>
				<Label for="enddate">End Date *</Label>

				<Input
					type="date"
					id="enddate"
					bind:value={thisEvent.enddate}
					onblur={checkForChanges}
					disabled={!thisEvent.startdate}
					class="w-full"
				/>
			</fieldset>

			<!-- End time -->
			<fieldset disabled={!thisEvent.enddate}>
				<Label for="endtime">End Time *</Label>
				<Input
					type="time"
					id="endtime"
					bind:value={thisEvent.endtime}
					disabled={!thisEvent.enddate}
					onblur={checkForChanges}
				/>
			</fieldset>
		</div>

		<!-- Publish date  -->
		<div id="publish" class="form bg-white-primary my-8 p-10">
			<div>
				<fieldset class="flex flex-col" disabled={!thisEvent.startdate}>
					<Label for="publishdate">Publish Date</Label>
					<div class="flex w-full flex-row items-center gap-4">
						<Input type="date" id="publishdate" bind:value={thisEvent.publishdate} onblur={checkForChanges} />
						<div class="tooltip" data-tip="Sets the publish date to 14 days before the start date">
							<Button variant="primary" class="min-w-32" onclick={handleSetPublishDate}>Auto set</Button>
						</div>
					</div>
					<p class="explanation">If you don't select a publish date, the event will be published immediately.</p>
				</fieldset>

				<!-- Publish time  -->
				<div>
					<fieldset disabled={!thisEvent.publishdate}>
						<Label for="publishTime">Publish Time</Label>
						<Input
							type="time"
							id="publishtime"
							bind:value={thisEvent.publishtime}
							disabled={!thisEvent.publishdate}
							onblur={checkForChanges}
						/>
						<div class="explanation {thisEvent.publishdate ? 'opacity-100' : 'opacity-30'}">
							If you don't select a publish time, it will be set to 09:00 of the selected day.
						</div>
					</fieldset>
				</div>

				<!-- Unpublish Date -->
				<fieldset disabled={!thisEvent.publishdate}>
					<Label for="unpublishdate">Unpublish Date</Label>
					<Input
						type="date"
						id="unpublishdate"
						title="Select a date when the event shall be unpublished (optional)"
						bind:value={thisEvent.unpublishdate}
						disabled={!thisEvent.publishdate}
						onblur={checkForChanges}
					/>
					<p class="explanation {thisEvent.publishdate ? 'opacity-100' : 'opacity-30'}">
						If you don't set a date and time here the event will automatically be unpublished at the given start time.
					</p>
				</fieldset>

				<!-- Unpublish Time -->
				<fieldset disabled={!thisEvent.unpublishdate}>
					<Label for="unpublishtime">Unpublish Time</Label>
					<Input
						type="time"
						id="unpublishtime"
						title="Select a time when the event shall be unpublished. (optional) "
						bind:value={thisEvent.unpublishtime}
						disabled={!thisEvent.unpublishdate}
						onblur={checkForChanges}
					/>
				</fieldset>
			</div>
		</div>

		<!-- Image -->
		<div id="image" class="form bg-white-primary my-8 p-10">
			<fieldset>
				<Label for="image">Image</Label>
				<div class="flex items-center justify-center">
					<UploadImage
						imageUrl={thisEvent.image}
						onNewFileSelected={handleNewFileSelected}
						onExistingFileSelected={handleExistingImageSelected}
					/>
				</div>
			</fieldset>

			<!-- Image Alt Text-->
			<fieldset disabled={!hasImage} class="imageMeta">
				<fieldset>
					<Label for="imageAlt">Image Alt text *</Label>
					<Input
						type="text"
						id="imageAlt"
						bind:value={thisEvent.imageAlt}
						onblur={checkForChanges}
						required={hasImage}
						disabled={!hasImage}
						placeholder={hasImage ? 'Image Alt text' : 'Please select an image first'}
					/>
					<div class="explanation {!hasImage ? 'opacity-30' : 'opacity-100'}">
						This text helps interpreting the image for visually impaired users.
					</div>
				</fieldset>

				<!-- Image Caption -->
				<fieldset>
					<Label for="imageCaption">Image caption</Label>
					<Input
						type="text"
						id="imageCaption"
						bind:value={thisEvent.imageCaption}
						onblur={checkForChanges}
						disabled={!hasImage}
						placeholder={hasImage ? 'Image by ...' : 'Please select an image first'}
					/>
					<div class="explanation {!hasImage ? 'opacity-30' : 'opacity-100'}">
						This text will be displayed below the image.
					</div>
				</fieldset>
			</fieldset>
		</div>

		<!-- PDF -->
		<div id="pdf" class="form bg-white-primary my-8 p-10">
			<fieldset>
				<Label for="pdfFile">PDF Document</Label>
				<div class="flex flex-col items-center justify-center">
					<UploadPDF
						existingPdf={thisEvent.pdfName && thisEvent.pdfFile
							? { name: thisEvent.pdfName, path: thisEvent.pdfFile }
							: null}
						pdftype="documents"
						onExistingFileSelected={handleExistingPDFSelected}
						onNewFileSelected={handleNewPDFSelected}
					/>
					{#if !hasPDF}
						<div class="explanation opacity-30">
							Upload a PDF document that will be attached to this event (max 5MB).
						</div>
					{/if}
				</div>
			</fieldset>

			<fieldset disabled={!hasPDF}>
				<Label for="pdfText">PDF Description *</Label>
				<Input
					type="text"
					id="pdfText"
					bind:value={thisEvent.pdfText}
					required={hasPDF}
					disabled={!hasPDF}
					placeholder={hasPDF ? 'PDF Description' : 'Please select a PDF file first'}
				/>
				<p class="explanation {!hasPDF ? 'opacity-30' : 'opacity-100'}">
					This text is the visible text for the PDF download link on the event page..
				</p>
			</fieldset>
		</div>

		<!-- Buttons block -->
		<div class="form fixed right-0 bottom-4 left-0 z-50 mx-auto w-2/3 gap-4 bg-slate-100 p-10 shadow-2xl">
			<!-- Buttons -->
			<div class="buttons col-span-2">
				<Button variant="outline" type="reset" color="light" onclick={onCancel}>Cancel</Button>
				<Button variant="outline" type="reset" color="light">Empty form</Button>
				{#if thisEvent.state === ItemState.DRAFT}
					<Button variant="primary" type="button" color="light" disabled={!hasUnsavedChanges} onclick={handleSaveDraft}
						>Save draft</Button
					>
				{/if}
				<Button variant="primary" type="submit" disabled={!isValidEvent || !hasUnsavedChanges}
					>{$EditModeStore === 'update' ? 'Update' : 'Save'} event</Button
				>
			</div>
		</div>
	</form>
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
		display: flex;
		flex-direction: row;
		gap: 50px;
		padding: 0 50px;
		justify-content: space-between;
	}
</style>
