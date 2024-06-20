<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { marked } from 'marked';
	import { Timestamp } from 'firebase/firestore';
	import { authStore } from '$lib/stores/AuthStore';
	import { Input, Label, Checkbox, Textarea, Helper, Button } from 'flowbite-svelte';
	import Icon from '$lib/components/Icon.svelte';

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
	let isVisible = { help: false, preview: false };

	if (thisEvent) {
		newEvent = thisEvent;
		state = 'update';
	}
	$: {
		let slugCache = marked.parse(newEvent.description).replace(/<[^>]*>/g, '');
		newEvent.slug = slugCache.slice(0, MAX_SLUG_TEXT);
	}

	const handleConditionChange = (e) => {
		if (e.target.checked) {
			newEvent.condition = 'Entry is free, donations are welcome.';
		} else {
			newEvent.condition = '';
		}
	};

	const toggleSection = (view) => {
		console.log('toggle section');
		if (view === 'help') {
			isVisible.help = !isVisible.help;
		} else if (view === 'preview') {
			isVisible.preview = !isVisible.preview;
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
				rows="8"
				name="description"
				bind:value={newEvent.description}
				wrap="hard"
			/>
		</div>

		<!-- Help text -->

		<div class="mt-2 border border-green-40">
			<div class="flex w-full flex-row flex-nowrap items-center justify-between">
				<Button class="h-12 w-full text-lg font-semibold" on:click={() => toggleSection('help')}
					>Formatting help</Button
				>
				<Button class="text-lg font-semibold" on:click={() => toggleSection('help')}>
					{#if isVisible.help}
						<Icon name="chevronUp" width="18px" height="18px" />
					{:else}
						<Icon name="chevronDown" width="18px" height="18px" />
					{/if}
				</Button>
			</div>
			{#if isVisible.help}
				<div id="helpContainer" class="h-64 bg-green-50">
					<div class=" grid grid-cols-4">
						<div class="s row-start-1 border-b bg-slate-300 py-2 pl-5 font-semibold">Format</div>
						<div class="border-b border-l bg-slate-300 py-2 pl-5 font-semibold">Description</div>
						<div
							class="border-b border-l-4 border-l-slate-400 bg-slate-300 py-2 pl-5 font-semibold"
						>
							Format
						</div>
						<div class="border-b border-l bg-slate-300 py-2 pl-5 font-semibold">Description</div>
						<div class={`row-start-2 ${cellPadding} ${cellFormat.one}`}>*text*</div>
						<div class={`${cellPadding} ${cellFormat.two}`}><em>italic text</em></div>
						<div class={`${cellPadding} ${cellFormat.three}`}>**text**</div>
						<div class={`${cellPadding} ${cellFormat.four}`}><strong>bold text</strong></div>
						<div class={`row-start-3 ${cellPadding} ${cellFormat.one}`}># Headline</div>
						<div class={`${cellPadding} ${cellFormat.two}`}>Headline 1</div>
						<div class={`${cellPadding} ${cellFormat.three}`}>## Headline</div>
						<div class={`${cellPadding} ${cellFormat.four}`}>Headline 2</div>
						<div class={`row-start-4 ${cellPadding} ${cellFormat.one}`}>### Headline</div>
						<div class={`${cellPadding} ${cellFormat.two}`}>Headline 3</div>
						<div class={`${cellPadding} ${cellFormat.three}`}>#### Headline</div>
						<div class={`${cellPadding} ${cellFormat.four}`}>Headline 4</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Preview -->
		<div class="mt-2 border border-green-40">
			<div class="flex h-12 w-full flex-row flex-nowrap items-center justify-between">
				<Button class="w-full text-lg font-semibold" on:click={() => toggleSection('preview')}
					>Preview</Button
				>
				<Button class="text-lg font-semibold" on:click={() => toggleSection('preview')}>
					{#if isVisible.preview}
						<Icon name="chevronUp" width="18px" height="18px" />
					{:else}
						<Icon name="chevronDown" width="18px" height="18px" />
					{/if}
				</Button>
			</div>
			{#if isVisible.preview}
				<div id="helpContainer" class="h-72 overflow-scroll bg-green-50 px-4">
					{@html marked.parse(newEvent.description)}
				</div>
				<div class="text-center text-sm">
					This preview provides a rough estimate how your text will look on the website.
				</div>
			{/if}
		</div>

		<!-- Slug -->
		<div>
			<div class="flex-rows flex justify-between">
				<Label for="slug" class="mb-2 mt-8 self-center text-xl font-semibold"
					>Short description (slug)</Label
				>
				<p class="self-end text-right text-base">
					<strong>{newEvent.slug.length} of {MAX_SLUG_TEXT} </strong> characters.
				</p>
			</div>
			<Textarea
				id="slug"
				placeholder={slugtext}
				rows="3"
				name="slug"
				bind:value={newEvent.slug}
				maxlength="MAX_SLUG_TEXT"
				required
			/>
		</div>

		<!-- Start date -->
		<div>
			<Label for="startdate" class="mb-2 mt-8 text-xl font-semibold">Start Date *</Label>
			<Input type="date" id="startdate" bind:value={newEvent.startdate} required />
		</div>

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
			{#if newEvent.image}
				<Label class="mb-2 mt-8 text-xl font-semibold">Uploaded image</Label>
				<UploadImage imageUrl={newEvent.image} on:upload={assignImage} />
			{:else}
				<Label class="mb-2 mt-8 text-xl font-semibold">Upload image</Label>
				<UploadImage on:upload={assignImage} />
			{/if}
		</div>
		<div class="imageMeta">
			<div class="imageAlt">
				<div>
					<Label for="imageAlt" class="mb-2 mt-8 text-xl font-semibold">Image Alt text *</Label>
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
