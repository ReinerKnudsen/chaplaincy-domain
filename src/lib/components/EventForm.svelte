<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Timestamp } from 'firebase/firestore';
	import { authStore } from '$lib/stores/AuthStore';
	import { Input, Label, Checkbox, Textarea, Helper, Button } from 'flowbite-svelte';

	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import UploadImage from '$lib/components/UploadImage.svelte';

	export let thisEvent;
	const dispatch = createEventDispatcher();

	let slugtext;
	let newEvent = {
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
		imagealt: ''
	};
	let docRef;
	let state = 'save';

	if (thisEvent) {
		newEvent = thisEvent;
		state = 'update';
	}

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
			publishDateTime: '',
			unpublishdate: '',
			unpublishtime: '',
			unpublishDateTime: '',
			comments: '',
			image: '',
			imageAlt: '',
			imageCredit: ''
		};
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		!newEvent.publishtime && (newEvent.publishtime = '09:00');
		!newEvent.unpublishdate && (newEvent.unpublishdate = newEvent.startdate);
		!newEvent.unpublishtime && (newEvent.unpublishtime = newEvent.starttime);
		const publishDateTime = new Date(newEvent.publishdate + 'T' + newEvent.publishtime);
		newEvent.publishDateTime = Timestamp.fromDate(publishDateTime);
		const unpublishDateTime = new Date(newEvent.unpublishdate + 'T' + newEvent.unpublishtime);
		newEvent.unpublishDateTime = Timestamp.fromDate(unpublishDateTime);
		dispatch(state, newEvent);
		cleanUpForm();
		goto('/admin/eventsadmin');
	};

	const assignImage = (e) => {
		newEvent.image = e.detail;
	};
</script>

<div class="form">
	<h1>{state === 'update' ? 'Edit event' : 'Create new event'}</h1>

	<!-- Titel -->
	<form id="form-container" enctype="multipart/form-data" on:submit={handleSubmit}>
		<div>
			<Label for="title" class="mb-2 mt-5 text-xl font-semibold">Event Titel *</Label>
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
			<Label for="subtitle" class="mb-2 mt-5 text-xl font-semibold">Sub Title</Label>
			<Input type="text" id="subtitle" placeholder="Sub Title" bind:value={newEvent.subtitle} />
		</div>

		<!-- Description -->
		<div>
			<Label for="description" class="mb-2 mt-5 text-xl font-semibold">Description *</Label>
			<Textarea
				id="description"
				placeholder="Description text"
				rows="8"
				name="description"
				bind:value={newEvent.description}
				wrap="hard"
			/>
			<p class="explanation text-right">
				<strong>{newEvent.description.length}</strong> characters.
			</p>
		</div>

		<!-- Slug -->
		<div>
			<Label for="slug" class="mb-2 mt-5 text-xl font-semibold">Short description (slug)</Label>
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
			<Label for="startdate" class="mb-2 mt-5 text-xl font-semibold">Start Date *</Label>
			<Input type="date" id="startdate" bind:value={newEvent.startdate} required />
		</div>

		<!-- Start time -->
		<div>
			<Label class="mb-2 mt-5 text-xl font-semibold">Start Time *</Label>
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
			<Label for="enddate" class="mb-2 mt-5 text-xl font-semibold">End Date</Label>
			<Input type="date" id="enddate" bind:value={newEvent.enddate} />
		</div>

		<!-- End time -->
		<div>
			<Label class="mb-2 mt-5 text-xl font-semibold">End Time</Label>
			<Input type="time" id="endtime" bind:value={newEvent.endtime} disabled={!newEvent.enddate} />
		</div>

		<!-- Location -->
		<div class="form-area">
			<div>
				<Label for="Location" class="mb-2 mt-5 text-xl font-semibold">Location *</Label>
				<Input type="text" id="location" bind:value={newEvent.location} required />
			</div>
		</div>

		<!-- Conditions -->
		<div>
			<Label for="conditions" class="mb-2 mt-5 text-xl font-semibold">Conditions</Label>
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
			<Label for="publishdate" class="mb-2 mt-5 text-xl font-semibold">Publish Date *</Label>
			<Input type="date" id="publishdate" required bind:value={newEvent.publishdate} />
		</div>

		<!-- Publish time  -->
		<div>
			<Label class="mb-2 mt-5 text-xl font-semibold">Publish Time</Label>
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
			<Label for="unpublishdate" class="mb-2 mt-5 text-xl font-semibold">Unpublish Date</Label>
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
			<Label for="unpublishtime" class="mb-2 mt-5 text-xl font-semibold">Unpublish Time</Label>
			<Input
				type="time"
				id="unpublishtime"
				title="Select a time when the event shall be unpublished. (optional) "
				bind:value={newEvent.unpublishtime}
				disabled={!newEvent.unpublishdate}
			/>
		</div>

		<!-- Comments -->
		<div class="col-span-2">
			<Label for="comments" class="mb-2 mt-5 text-xl font-semibold">Comments</Label>
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
			{#if newEvent.image}
				<Label class="mb-2">Uploaded image</Label>
				<UploadImage imageUrl={newEvent.image} on:upload={assignImage} />
			{:else}
				<Label class="mb-2">Upload image</Label>
				<UploadImage on:upload={assignImage} />
			{/if}
		</div>
		<div class="imageMeta">
			<div class="imageAlt">
				<div>
					<Label for="imageAlt" class="mb-2">Image Alt text *</Label>
					<Input
						type="text"
						id="imageAlt"
						bind:value={newEvent.imageAlt}
						disabled={!newEvent.image}
						required
					/>
					<p class="explanation">
						This text helps interpreting the image for visually impaired users.
					</p>
				</div>
			</div>
			<div class="imageCaption mt-10">
				<div>
					<Label for="imageCaption" class="mb-2">Image caption</Label>
					<Input type="text" id="imageCaption" bind:value={newEvent.imageCaption} />
					<p class="explanation">This text will be displayed below the image.</p>
				</div>
			</div>
		</div>

		<!-- Buttons -->
		<div class="buttons col-span-2 mt-3">
			<Button type="reset" color="light" on:click={() => goto('/admin/eventsadmin')}>Cancel</Button>
			<Button type="reset" color="light">Empty form</Button>
			<Button type="submit" disabled={newEvent.length === 0}
				>{state === 'update' ? 'Update' : 'Save'} event</Button
			>
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
