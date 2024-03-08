<script>
	import { Input, Label, Checkbox, Textarea, Helper, Button } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import { eventsColRef, database } from '$lib/firebase/firebaseConfig';
	import { addDoc, updateDoc } from 'firebase/firestore';
	import { EventStore, resetEventStore, docRef } from '$lib/stores/FormStore';
	import { goto } from '$app/navigation';
	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import noImage from '../../../../lib/assets/upload-image.svg';

	let slugtext = '';
	// this is the error indicating the image is too big
	let imageError;
	let uploadedImage;
	if ($EventStore.image) {
		uploadedImage = $EventStore.image;
	} else {
		uploadedImage = noImage;
	}

	const handleCreateSlug = () => {
		$EventStore.slug = $EventStore.description.slice(0, MAX_SLUG_TEXT);
	};

	// Automatically add or delete text from the "conditions"" field if the checkbox is checked or unchecked
	const handleConditionChange = (e) => {
		if (e.target.checked) {
			$EventStore.condition = 'Entry is free, donations are welcome.';
		} else {
			$EventStore.condition = '';
		}
	};

	const cleanUpForm = () => {
		resetEventStore();
		goto('/admin/eventsadmin');
	};

	const updateEvent = async () => {
		try {
			await updateDoc($docRef, $EventStore); // Update document with eventData
			console.log('Document successfully updated!');
		} catch (error) {
			console.error('Error updating document:', error);
		}
		cleanUpForm();
	};

	const saveNewEvent = async () => {
		!$EventStore.publishtime && ($EventStore.publishtime = '09:00');
		!$EventStore.unpublishdate && ($EventStore.unpublishdate = $EventStore.startdate);
		!$EventStore.unpublishtime && ($EventStore.unpublishtime = $EventStore.starttime);

		try {
			await addDoc(eventsColRef, $EventStore);
			console.log('Document successfully written!');
		} catch (error) {
			console.error('Error writing document:', error);
		}
		cleanUpForm();
	};

	const handleSubmit = () => {
		if ($docRef) {
			updateEvent();
		} else {
			saveNewEvent();
		}
	};

	// ----------------------------------

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const uploadImage = async (event) => {
		const file = event.target.files[0];
		if (file) {
			if (file.size > 300000) {
				imageError = 'The image is too big.';
				uploadedImage = '';
				return;
			} else {
				imageError = null;
			}
			const base64 = await convertBase64(file);
			uploadedImage = base64;
			$EventStore.image = base64;
		}
	};
</script>

<div class="form">
	<h1>{$docRef ? 'Edit event' : 'Create new event'}</h1>

	<!-- Titel -->
	<form
		class="form-container"
		id="form-container"
		enctype="multipart/form-data"
		on:submit={handleSubmit}
	>
		<div>
			<Label for="title" class="mb-2">Event Titel *</Label>
			<Input
				type="text"
				id="title"
				placeholder="Event Title"
				bind:value={$EventStore.title}
				required
			/>
		</div>

		<!-- Sub Title -->
		<div>
			<Label for="subtitle" class="mb-2">Sub Title</Label>
			<Input type="text" id="subtitle" placeholder="Sub Title" bind:value={$EventStore.subtitle} />
		</div>

		<!-- Description -->
		<div>
			<Label for="description" class="mb-2">Description *</Label>
			<Textarea
				id="description"
				placeholder="Description text"
				rows="8"
				name="description"
				bind:value={$EventStore.description}
			/>
			<p class="explanation text-right">
				<strong>{$EventStore.description.length}</strong> characters.
			</p>
		</div>

		<!-- Slug -->
		<div>
			<Label for="slug" class="mb-2">Short description (slug)</Label>
			<Textarea
				id="slug"
				placeholder={slugtext}
				rows="3"
				name="slug"
				bind:value={$EventStore.slug}
				maxlength="100"
				required
				on:focus={handleCreateSlug}
			/>
			<p class="explanation text-right">
				<strong>{$EventStore.slug.length} of {MAX_SLUG_TEXT} </strong> characters.
			</p>
		</div>

		<!-- Start date -->
		<div>
			<Label for="startdate" class="mb-2">Start Date *</Label>
			<Input type="date" id="startdate" bind:value={$EventStore.startdate} required />
		</div>

		<!-- Start time -->
		<div>
			<Label class="mb-2">Start Time *</Label>
			<Input
				type="time"
				id="starttime"
				bind:value={$EventStore.starttime}
				required
				disabled={!$EventStore.startdate}
			/>
		</div>

		<!-- End date -->
		<div>
			<Label for="enddate" class="mb-2">End Date</Label>
			<Input type="date" id="enddate" bind:value={$EventStore.enddate} />
		</div>

		<!-- End time -->
		<div>
			<Label class="mb-2">End Time</Label>
			<Input
				type="time"
				id="endtime"
				bind:value={$EventStore.endtime}
				disabled={!$EventStore.enddate}
			/>
		</div>

		<!-- Location -->
		<div class="form-area">
			<div>
				<Label for="Location" class="mb-2">Location *</Label>
				<Input type="text" id="location" bind:value={$EventStore.location} required />
			</div>
		</div>

		<!-- Conditions -->
		<div>
			<Label for="conditions" class="mb-2">Conditions</Label>
			<Input type="text" id="conditions" bind:value={$EventStore.condition} />
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

		<!-- Publish date  -->
		<div>
			<Label for="publishdate" class="mb-2">Publish Date *</Label>
			<Input type="date" id="publishdate" required bind:value={$EventStore.publishdate} />
		</div>

		<!-- Publish time  -->
		<div>
			<Label class="mb-2">Publish Time</Label>
			<Input
				type="time"
				id="publishtime"
				bind:value={$EventStore.publishtime}
				disabled={!$EventStore.publishdate}
			/>
			<p class="explanation">
				If you don't select a publish time, it will be set to 09:00 of the selected day.
			</p>
		</div>

		<!-- Unpublish Date -->
		<div>
			<Label for="unpublishdate" class="mb-2">Unpublish Date</Label>
			<Input
				type="date"
				id="unpublishdate"
				title="Select a date when the event shall be unpublished (optional)"
				bind:value={$EventStore.unpublishdate}
			/>

			<p class="explanation">
				If you don't set a date and time here the event will automatically be unpublished at the
				given start time.
			</p>
		</div>

		<!-- Unpublish Time -->
		<div>
			<Label for="unpublishtime" class="mb-2">Unpublish Time</Label>
			<Input
				type="time"
				id="unpublishtime"
				title="Select a time when the event shall be unpublished. (optional) "
				bind:value={$EventStore.unpublishtime}
				disabled={!$EventStore.unpublishdate}
			/>
		</div>

		<!-- Comments -->
		<div>
			<Label for="comments" class="mb-2">Comments</Label>
			<Textarea
				id="comments"
				placeholder="Comments"
				rows="10"
				name="comments"
				title="If there is anything people should need to know about this event? Put it here. (Parking instructions, public transport connections...)"
				bind:value={$EventStore.comments}
			/>
		</div>

		<!-- File Upload -->
		<div class="grid grid-rows-2">
			<div>
				<!-- <UploadFile type="events" size={20000000} /> -->
				<label class="mb-1 block text-sm font-medium text-gray-900 dark:text-white" for="file_input"
					>Upload event image</label
				>
				<input
					class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
					aria-describedby="file_input_help"
					accept="image/png, image/jpeg, image/webp"
					id="file_input"
					type="file"
					on:change={uploadImage}
				/>
				<p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
					PNG, JPG or WEBP (max. 800x400px, max. 300kB).
				</p>
				<span hidden={!imageError} class="text-sm font-semibold text-red-600">{imageError}</span>
			</div>

			<div class="grid grid-cols-3">
				<div class="container col-span-1 mt-6">
					<img src={uploadedImage} class="img h-24" id="avatar" alt="hochgeladenes bild" />
				</div>
				<div class="col-span-2">
					<Label class="col-span-2 col-start-2 mb-2">Alternative text</Label>
					<Input
						type="text"
						id="imagealt"
						bind:value={$EventStore.imagealt}
						disabled={!$EventStore.image}
					/>
					<p class="explanation">
						The alternative text helps people with screenreaders to understand the picture's content
					</p>
				</div>
			</div>
		</div>

		<!-- Buttons -->
		<div class="buttons">
			<Button type="reset" color="light" on:click={() => goto('/admin/eventsadmin')}>Cancel</Button>
			<Button type="reset" color="light">Empty form</Button>
			<Button type="submit" disabled={$EventStore.length === 0}>Save event</Button>
		</div>
	</form>
</div>

<div>&NonBreakingSpace;</div>

<style>
	.form {
		margin: 40px auto;
		padding: 20px 20px;
		max-width: 90%;
		border: 1px solid #eaeaea;
		border-radius: 20px;
	}
	.form-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px 20px;
	}
	.explanation {
		margin: 10px 4px;
		font-size: 0.8rem;
	}
	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 50px;
		padding: 0 50px;
		justify-content: space-between;
		width: 100%;
		padding: 0 50px;
	}
</style>
