<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { Timestamp } from 'firebase/firestore';
	import { authStore } from '$lib/stores/AuthStore';

	import { Input, Label, Checkbox, Textarea, Helper, Button } from 'flowbite-svelte';
	import SlugText from './SlugText.svelte';
	import MarkdownHelp from './MarkdownHelp.svelte';
	import UploadImage from '$lib/components/UploadImage.svelte';

	export let thisEvent;
	const dispatch = createEventDispatcher();

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
		imageAlt: ''
	};

	let state = 'save';
	let hasImage = false;

	$: if (newEvent.image) {
		hasImage = true;
	} else {
		hasImage = false;
	}

	if (thisEvent) {
		newEvent = thisEvent;
		state = 'update';
	}

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

	const cellPadding = 'py-2 pl-5';
	const cellFormat = {
		one: 'border-b font-mono',
		two: 'border-b border-l pb-1 pl-5',
		three: 'border-b border-l-4 pb-1 pl-5 font-mono',
		four: 'border-b border-l pb-1 pl-5'
	};

	const handleSlugChange = (e) => {
		newEvent.slug = e.detail;
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

<div class="form bg-white-primary">
	<h1 class="mx-10">{state === 'update' ? 'Edit event' : 'Create new event'}</h1>
	<form class="mx-10" enctype="multipart/form-data" on:submit={handleSubmit}>
		<!-- Titel -->
		<div>
			<Label for="title" class="mb-2 mt-8 text-xl font-semibold">Event Titel *</Label>
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
			<Label for="subtitle" class="mb-2 mt-8 text-xl font-semibold">Sub Title</Label>
			<Input type="text" id="subtitle" placeholder="Sub Title" bind:value={newEvent.subtitle} />
		</div>

		<!-- Description -->
		<div>
			<div class="flex-rows flex justify-between">
				<Label for="description" class="mb-2 mt-8 self-center text-xl font-semibold"
					>Description *</Label
				>
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
			/>
		</div>

		<MarkdownHelp text={newEvent.description} />
		<SlugText
			text={newEvent.description}
			slugText={newEvent.slug}
			on:slugChange={handleSlugChange}
		/>

		<!-- Start date -->
		<div>
			<Label for="startdate" class="mb-2 mt-8 text-xl font-semibold">Start Date *</Label>
			<Input type="date" id="startdate" bind:value={newEvent.startdate} required />
		</div>
		<p class="explanation">Please enter all dates as dd mm yyyy.</p>

		<!-- Start time -->
		<div>
			<Label class="mb-2 mt-8 text-xl font-semibold">Start Time *</Label>
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
			<Label for="enddate" class="mb-2 mt-8 text-xl font-semibold">End Date</Label>
			<Input type="date" id="enddate" bind:value={newEvent.enddate} />
		</div>

		<!-- End time -->
		<div>
			<Label class="mb-2 mt-8 text-xl font-semibold">End Time</Label>
			<Input type="time" id="endtime" bind:value={newEvent.endtime} disabled={!newEvent.enddate} />
		</div>

		<!-- Location -->
		<div class="form-area">
			<div>
				<Label for="Location" class="mb-2 mt-8 text-xl font-semibold">Location *</Label>
				<Input type="text" id="location" bind:value={newEvent.location} required />
			</div>
		</div>

		<!-- Conditions -->
		<div>
			<Label for="conditions" class="mb-2 mt-8 text-xl font-semibold">Conditions</Label>
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
			<Label for="publishdate" class="mb-2 mt-8 text-xl font-semibold">Publish Date *</Label>
			<Input type="date" id="publishdate" required bind:value={newEvent.publishdate} />
		</div>

		<!-- Publish time  -->
		<div>
			<Label class="mb-2 mt-8 text-xl font-semibold">Publish Time</Label>
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
			<Label for="unpublishdate" class="mb-2 mt-8 text-xl font-semibold">Unpublish Date</Label>
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
			<Label for="unpublishtime" class="mb-2 mt-8 text-xl font-semibold">Unpublish Time</Label>
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
			<Label for="comments" class="mb-2 mt-8 text-xl font-semibold">Comments</Label>
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
			<Label class="mb-2 mt-8 text-xl font-semibold">Image</Label>
			<div class="flex items-center justify-center">
				{#if newEvent.image}
					<UploadImage imageUrl={newEvent.image} on:upload={assignImage} />
				{:else}
					<UploadImage on:upload={assignImage} />
				{/if}
			</div>
		</div>
		<div class="imageMeta" hidden={!hasImage}>
			<div class="imageAlt">
				<div>
					<Label class="mb-2 mt-8 text-xl font-semibold">Image Alt text *</Label>
					<Input type="text" id="imageAlt" bind:value={newEvent.imageAlt} required={hasImage} />
					<p class="explanation">
						This text helps interpreting the image for visually impaired users.
					</p>
				</div>
			</div>
			<div class="imageCaption mt-10">
				<div>
					<Label for="imageCaption" class="mb-2 mt-8 text-xl font-semibold">Image caption</Label>
					<Input type="text" id="imageCaption" bind:value={newEvent.imageCaption} />
					<p class="explanation">This text will be displayed below the image.</p>
				</div>
			</div>
		</div>

		<!-- Buttons -->
		<div class="buttons col-span-2 mb-20 mt-10">
			<Button
				class="font-semibold"
				type="reset"
				color="light"
				on:click={() => goto('/admin/eventsadmin')}>Cancel</Button
			>
			<Button class="bg-black-40 text-white-primary" type="reset" color="light">Empty form</Button>
			<Button
				class="bg-primary-100  font-semibold text-white-primary"
				type="submit"
				disabled={newEvent.length === 0}>{state === 'update' ? 'Update' : 'Save'} event</Button
			>
		</div>
	</form>
</div>

<div>&NonBreakingSpace;</div>

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
