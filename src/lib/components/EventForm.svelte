<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { doc, getDoc } from 'firebase/firestore';

	import { Input, Label, Checkbox, Textarea, Helper, Button } from 'flowbite-svelte';

	import { database } from '$lib/firebase/firebaseConfig';
	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import UploadImage from '$lib/components/UploadImage.svelte';

	export let eventID;

	let slugtext;
	let newEvent = {
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
		unpublishdate: '',
		unpublishtime: '',
		comments: '',
		image: '',
		imagealt: ''
	};
	let docRef;
	let buttonText = 'Save event';
	const dispatch = createEventDispatcher();
	let eventImage = '';

	if (eventID) {
		docRef = doc(database, 'events', eventID);
		buttonText = 'Update event';
	}

	const fetchEventData = async () => {
		try {
			getDoc(docRef).then((docSnapshot) => {
				if (docSnapshot.exists()) {
					newEvent = docSnapshot.data();
					eventImage = newEvent.image;
					console.log(eventImage);
				} else {
					console.log('No such document!');
				}
			});
		} catch (error) {
			console.error('Error fetching document:', error);
		}
	};

	onMount(() => {
		if (docRef) {
			fetchEventData();
		}
	});

	const handleCreateSlug = () => {
		newEvent.slug = newEvent.description.slice(0, MAX_SLUG_TEXT);
	};

	const handleConditionChange = (e) => {
		if (e.target.checked) {
			newEvent.condition = 'Entry is free, donations are welcome.';
		} else {
			newEvent.condition = '';
		}
	};

	const cleanUpForm = () => {
		newEvent = {
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
			unpublishdate: '',
			unpublishtime: '',
			comments: '',
			image: '',
			imagealt: ''
		};
	};

	const handleSubmit = () => {
		if (docRef) {
			dispatch('update', newEvent);
		} else {
			!newEvent.publishtime && (newEvent.publishtime = '09:00');
			!newEvent.unpublishdate && (newEvent.unpublishdate = newEvent.startdate);
			!newEvent.unpublishtime && (newEvent.unpublishtime = newEvent.starttime);
			dispatch('save', newEvent);
			cleanUpForm();
		}
	};

	const assignImage = (e) => {
		newEvent.image = e.detail;
		eventImage = e.detail;
	};
</script>

<div class="form">
	<h1>{eventID ? 'Edit event' : 'Create new event'}</h1>

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
				bind:value={newEvent.title}
				required
			/>
		</div>

		<!-- Sub Title -->
		<div>
			<Label for="subtitle" class="mb-2">Sub Title</Label>
			<Input type="text" id="subtitle" placeholder="Sub Title" bind:value={newEvent.subtitle} />
		</div>

		<!-- Description -->
		<div>
			<Label for="description" class="mb-2">Description *</Label>
			<Textarea
				id="description"
				placeholder="Description text"
				rows="8"
				name="description"
				bind:value={newEvent.description}
			/>
			<p class="explanation text-right">
				<strong>{newEvent.description.length}</strong> characters.
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
				bind:value={newEvent.slug}
				maxlength="MAX_SLUG_TEXT"
				required
				on:focus={handleCreateSlug}
			/>
			<p class="explanation text-right">
				<strong>{newEvent.slug.length} of {MAX_SLUG_TEXT} </strong> characters.
			</p>
		</div>

		<!-- Start date -->
		<div>
			<Label for="startdate" class="mb-2">Start Date *</Label>
			<Input type="date" id="startdate" bind:value={newEvent.startdate} required />
		</div>

		<!-- Start time -->
		<div>
			<Label class="mb-2">Start Time *</Label>
			<Input
				type="time"
				id="starttime"
				bind:value={newEvent.starttime}
				required
				disabled={!newEvent.startdate}
			/>
		</div>

		<!-- End date -->
		<div>
			<Label for="enddate" class="mb-2">End Date</Label>
			<Input type="date" id="enddate" bind:value={newEvent.enddate} />
		</div>

		<!-- End time -->
		<div>
			<Label class="mb-2">End Time</Label>
			<Input type="time" id="endtime" bind:value={newEvent.endtime} disabled={!newEvent.enddate} />
		</div>

		<!-- Location -->
		<div class="form-area">
			<div>
				<Label for="Location" class="mb-2">Location *</Label>
				<Input type="text" id="location" bind:value={newEvent.location} required />
			</div>
		</div>

		<!-- Conditions -->
		<div>
			<Label for="conditions" class="mb-2">Conditions</Label>
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

		<!-- Publish date  -->
		<div>
			<Label for="publishdate" class="mb-2">Publish Date *</Label>
			<Input type="date" id="publishdate" required bind:value={newEvent.publishdate} />
		</div>

		<!-- Publish time  -->
		<div>
			<Label class="mb-2">Publish Time</Label>
			<Input
				type="time"
				id="publishtime"
				bind:value={newEvent.publishtime}
				disabled={!newEvent.publishdate}
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
				bind:value={newEvent.unpublishdate}
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
				bind:value={newEvent.unpublishtime}
				disabled={!newEvent.unpublishdate}
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
				bind:value={newEvent.comments}
			/>
		</div>

		<!-- Image -->
		<div>
			<Label class="mb-2">Upload image</Label>
			<p>{eventImage}</p>
			<UploadImage imageUrl={eventImage} on:upload={assignImage} />
		</div>

		<!-- Buttons -->
		<div class="buttons col-span-2">
			<Button type="reset" color="light" on:click={() => goto('/admin/eventsadmin')}>Cancel</Button>
			<Button type="reset" color="light">Empty form</Button>
			<Button type="submit" disabled={newEvent.length === 0}>{buttonText}</Button>
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
		gap: 80px;
		padding: 0 50px;
		justify-content: space-between;
		width: 100%;
		padding: 0 50px;
	}
</style>
