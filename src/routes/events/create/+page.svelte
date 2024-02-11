<script>
	import { Input, Label, Checkbox, Textarea, Helper } from 'flowbite-svelte';

	let descriptionLength = 0;
	let slugLength = 0;
	let condition = '';
	const handleConditionChange = (e) => {
		if (e.target.checked) {
			condition = 'No entry, donations are welcome.';
		} else {
			condition = '';
		}
	};

	let slugtext = '';
	const handleCreateSlug = (e) => {
		console.log('event fired');
		let description = document.getElementById('description').value;
		slugtext = description.slice(0, 100);
		slugLength = slugtext.length;
	};
</script>

<div class="form">
	<h1>Create new event</h1>
	<div class="container">
		<div class="form-area">
			<div>
				<Label for="title" class="mb-2">Event Titel *</Label>
				<Input type="text" id="title" placeholder="Event Title" required />
			</div>
		</div>
		<div class="explanation">This field is <strong>required</strong>.</div>

		<!-- Sub Title -->
		<div class="form-area">
			<div>
				<Label for="subtitle" class="mb-2">Sub Title</Label>
				<Input type="text" id="subtitle" placeholder="Sub Title" />
			</div>
		</div>
		<div class="explanation">
			If you would like to add a subtitle for this event, this is the place.
		</div>

		<!-- Description -->
		<div class="form-area">
			<div>
				<Label for="description" class="mb-2">Description *</Label>
				<Textarea
					id="description"
					placeholder="Description text"
					rows="8"
					name="description"
					on:input={(event) => (descriptionLength = event.target.value.length)}
				/>
			</div>
		</div>
		<div class="explanation">
			Please enter a description here. <br /> The text should describe what to expect from the
			event.
			<p>This field is <strong>required</strong></p>
			<p><strong>{descriptionLength}</strong> characters</p>
		</div>

		<!-- Slug -->
		<div class="form-area">
			<div>
				<Label for="slug" class="mb-2">Short description (slug)</Label>
				<Textarea
					id="slug"
					placeholder={slugtext}
					rows="2"
					name="slug"
					value={slugtext}
					maxlength="100"
					required
					on:focus={handleCreateSlug}
					on:input={(event) => (slugLength = event.target.value.length)}
				/>
			</div>
		</div>
		<div class="explanation">
			<p>This is an optional short description for the homepage.</p>
			<p><strong><span>{slugLength} of 100 characters.</span></strong></p>
		</div>

		<!-- Startdate and time -->
		<div class="form-area">
			<div class="grid grid-cols-2 gap-5">
				<div>
					<Label for="startdate" class="mb-2">Start Date *</Label>
					<Input type="date" id="startdate" required />
				</div>
				<div>
					<Label for="starttime" class="mb-2">Start Time *</Label>
					<Input type="time" id="starttime" required />
				</div>
			</div>
		</div>
		<div class="explanation">
			Please enter the start date and time.
			<p>These values are <strong>required</strong></p>
		</div>

		<!-- Enddate and time -->
		<div class="form-area">
			<div class="grid grid-cols-2 gap-5">
				<div>
					<Label for="enddate" class="mb-2">End Date</Label>
					<Input type="date" id="enddate" />
				</div>
				<div>
					<Label for="endtime" class="mb-2">End Time</Label>
					<Input type="time" id="endtime" />
				</div>
			</div>
		</div>
		<div class="explanation">Please enter the end date and time.</div>

		<!-- Conditions -->
		<div class="form-area">
			<div class="grid grid-cols-2 gap-5">
				<div>
					<Label for="conditions" class="mb-2">Conditions</Label>
					<Input type="text" id="conditions" value={condition} />
				</div>
				<div class="mt-6">
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
		<div class="explanation">Please enter information about entry fees.</div>

		<!-- Conditions -->
		<div class="form-area">
			<div class="grid grid-cols-2 gap-5">
				<div>
					<Label for="conditions" class="mb-2">Conditions</Label>
					<Input type="text" id="conditions" value={condition} />
				</div>
				<div class="mt-6">
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
		<div class="explanation">Please enter information about entry fees.</div>
	</div>
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
	.container {
		display: grid;
		grid-template-columns: 4fr 2fr;
		gap: 20px 20px;
	}
	.container > h1 {
	}

	.form-area {
	}

	.explanation {
		margin: 30px 4px;
		font-size: 0.8rem;
	}
</style>
