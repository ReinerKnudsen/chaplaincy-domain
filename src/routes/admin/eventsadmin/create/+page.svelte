<script>
	import { Input, Label, Checkbox, Textarea, Helper, Button } from 'flowbite-svelte';
	import { eventsColRef } from '$lib/firebase/firebaseConfig';
	import { addDoc } from 'firebase/firestore';
	import { FormStore, resetForm } from '$lib/stores/FormStore';
	import UploadFile from '$lib/components/UploadFile.svelte';
	import { goto } from '$app/navigation';

	let description = '';
	let startdate;
	let starttime;
	let enddate;
	let endtime;
	let condition = '';
	let location = '';

	// Set the slugtext as the first 100 characters of the description text
	let slugtext = '';
	const handleCreateSlug = (e) => {
		$FormStore.slug = $FormStore.description.slice(0, 100);
	};

	// Automatically add or delete text from the "conditions"" field if the checkbox is checked or unchecked
	const handleConditionChange = (e) => {
		if (e.target.checked) {
			condition = 'Entry is free, donations are welcome.';
		} else {
			condition = '';
		}
	};

	const handleSubmit = () => {
		addDoc(eventsColRef, $FormStore).then(() => {
			document.getElementsByClassName('form-container').reset();
			goto('/admin/eventsadmin');
		});
	};
</script>

<div class="form">
	<h1>Create new event</h1>

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
				bind:value={$FormStore.title}
				required
			/>
			<!-- <div class="error">This field cannot be empty</div> -->
		</div>

		<!-- Sub Title -->
		<div>
			<Label for="subtitle" class="mb-2">Sub Title</Label>
			<Input type="text" id="subtitle" placeholder="Sub Title" bind:value={$FormStore.subtitle} />
		</div>

		<!-- Description -->
		<div>
			<Label for="description" class="mb-2">Description *</Label>
			<Textarea
				id="description"
				placeholder="Description text"
				rows="8"
				name="description"
				bind:value={$FormStore.description}
			/>
			<p class="explanation text-right"><strong>{description.length}</strong> characters.</p>
		</div>

		<!-- Slug -->
		<div>
			<Label for="slug" class="mb-2">Short description (slug)</Label>
			<Textarea
				id="slug"
				placeholder={slugtext}
				rows="2"
				name="slug"
				bind:value={$FormStore.slug}
				maxlength="100"
				required
				on:focus={handleCreateSlug}
			/>
			<p class="explanation text-right"><strong>{slugtext.length} of 100 </strong> characters.</p>
		</div>

		<!-- Start date -->
		<div>
			<Label for="startdate" class="mb-2">Start Date *</Label>
			<Input type="date" id="startdate" bind:value={$FormStore.startdate} required />
		</div>

		<!-- Start time -->
		<div>
			<Label for="starttime" class="mb-2">Start Time *</Label>
			<Input type="time" id="starttime" bind:value={$FormStore.starttime} required />
		</div>

		<!-- End date -->
		<div>
			<Label for="enddate" class="mb-2">End Date</Label>
			<Input type="date" id="enddate" bind:value={$FormStore.enddate} />
		</div>

		<!-- End time -->
		<div>
			<Label for="endtime" class="mb-2">End Time</Label>
			<Input type="time" id="endtime" bind:value={$FormStore.endtime} />
		</div>

		<!-- Location -->
		<div class="form-area">
			<div>
				<Label for="Location" class="mb-2">Location *</Label>
				<Input type="text" id="location" bind:value={$FormStore.location} required />
			</div>
		</div>

		<!-- Conditions -->
		<div>
			<Label for="conditions" class="mb-2">Conditions</Label>
			<Input type="text" id="conditions" bind:value={$FormStore.condition} />
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
			<Input type="date" id="publishdate" required bind:value={$FormStore.publishdate} />
		</div>

		<!-- Publish time  -->
		<div>
			<Label for="publishtime" class="mb-2">Publish Time</Label>
			<Input type="time" id="publishtime" bind:value={$FormStore.publishtime} />
			<p class="explanation">
				If you don't select a publish time, it will be set to midnight of the selected day.
			</p>
		</div>

		<!-- Unpublish Date -->
		<div>
			<Label for="unpublishdate" class="mb-2">Unpublish Date</Label>
			<Input
				type="date"
				id="unpublishdate"
				title="Select a date when the event shall be unpublished (optional)"
				bind:value={$FormStore.unpublishdate}
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
				bind:value={$FormStore.unpublishtime}
			/>
		</div>

		<!-- Comments -->
		<div>
			<Label for="comments" class="mb-2">Comments</Label>
			<Textarea
				id="comments"
				placeholder="Comments"
				rows="8"
				name="comments"
				title="If there is anything people should need to know about this event? Put it here. (Parking instructions, public transport connections...)"
				bind:value={$FormStore.comments}
			/>
		</div>

		<!-- File Upload -->
		<div>
			<UploadFile type="events" />
		</div>

		<!-- Buttons -->
		<div class="buttons col-span-2">
			<div class="grid w-full grid-cols-3 gap-2">
				<Button type="reset" color="light" on:click={() => goto('/admin/eventsadmin')}
					>Cancel</Button
				>
				<Button type="reset" color="light">Empty form</Button>
				<Button type="submit">Save event</Button>
			</div>
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
		grid-template-columns: 1fr 1fr;
		align-items: end;
		justify-content: end;
		gap: 50px;
		padding: 0 50px;
	}
</style>
