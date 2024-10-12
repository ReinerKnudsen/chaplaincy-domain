<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Input, Label, Checkbox, Textarea, Helper, Button } from 'flowbite-svelte';
	import SlugText from './SlugText.svelte';
	import MarkdownHelp from './MarkdownHelp.svelte';

	import { authStore } from '$lib/stores/AuthStore';
	import UploadImage from '$lib/components/UploadImage.svelte';

	export let thisItem;
	const dispatch = createEventDispatcher();
	const author = $authStore.name;

	let newItem = {
		title: '',
		author: author,
		text: '',
		slug: '',
		publishdate: '',
		publishtime: '',
		image: '',
		imageAlt: '',
		imageCaption: '',
		tags: ''
	};
	let docRef;
	let state = 'save';

	if (thisItem) {
		newItem = thisItem;
		state = 'update';
	}

	const cleanUpForm = () => {
		newItem = {
			title: '',
			author: '',
			text: '',
			slug: '',
			publishdate: '',
			publishtime: '',
			image: '',
			imageAlt: '',
			imageCaption: '',
			tags: ''
		};
	};

	const handleSlugChange = (e) => {
		newItem.slug = e.detail;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (state === 'save') {
			!newItem.publishdate && (newItem.publishdate = new Date());
			!newItem.publishtime && (newItem.publishtime = '09:00');
		}
		dispatch(state, newItem);
		goto('/admin/newsadmin');
	};

	const assignImage = (e) => {
		newItem.image = e.detail;
	};
</script>

<div class="form bg-white-primary">
	<h1 class="">{thisItem ? 'Edit news item' : 'Create news item'}</h1>

	<form id="form-container" enctype="multipart/form-data" on:submit={handleSubmit}>
		<!-- Titel -->
		<div>
			<Label for="title" class="mb-2 mt-8 text-xl font-semibold">News Headline *</Label>
			<Input type="text" id="title" placeholder="News Title" bind:value={newItem.title} required />
		</div>

		<!-- Author -->
		<div>
			<Label for="author" class="mb-2 mt-8 text-xl font-semibold">Author</Label>
			<Input type="text" id="author" bind:value={newItem.author} disabled />
		</div>

		<!-- News text -->
		<div>
			<div class="flex flex-row justify-between">
				<Label for="news-text" class="mb-2 mt-8 self-center text-xl font-semibold"
					>News text *</Label
				>
				<p class="explanation self-end text-right">
					<strong>{newItem.text.length}</strong> characters.
				</p>
			</div>
			<Textarea
				id="news-text"
				placeholder="News text"
				rows="8"
				name="news-text"
				bind:value={newItem.text}
				wrap="hard"
			/>
		</div>

		<MarkdownHelp text={newItem.text} />
		<SlugText text={newItem.text} slugText={newItem.slug} on:slugChange={handleSlugChange} />

		<!-- Publish date  -->
		<div>
			<Label for="publishdate" class="mb-2 mt-8 text-xl font-semibold">Publish Date *</Label>
			<Input type="date" id="publishdate" required bind:value={newItem.publishdate} />
			<p class="explanation">If you don't select a publish date, it will be set to today.</p>
		</div>

		<!-- Publish time  -->
		<div>
			<Label class="mb-2 mt-8 text-xl font-semibold">Publish Time</Label>
			<Input
				type="time"
				id="publishtime"
				bind:value={newItem.publishtime}
				disabled={!newItem.publishdate}
			/>
			<p class="explanation">
				If you don't select a publish time, it will be set to 09:00 of the selected day.
			</p>
		</div>

		<!-- File Upload -->
		<div>
			{#if newItem.image}
				<Label class="mb-2 mt-8 text-xl font-semibold">Uploaded image</Label>
				<UploadImage imageUrl={newItem.image} on:upload={assignImage} />
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
						bind:value={newItem.imageAlt}
						disabled={!newItem.image}
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
					<Input
						type="text"
						id="imageCaption"
						bind:value={newItem.imageCaption}
						disabled={!newItem.image}
						placeholder="Image by "
					/>
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
				on:click={() => goto('/admin/newsadmin')}>Cancel</Button
			>
			<Button class="bg-black-40 text-white-primary" type="reset" color="light" disabled={docRef}
				>Empty form</Button
			>
			<Button
				class="bg-primary-100  font-semibold text-white-primary"
				type="submit"
				disabled={newItem.length === 0}>{state === 'update' ? 'Update' : 'Save'} news</Button
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
		gap: 50px;
		padding: 0 50px;
		justify-content: space-between;
		width: 100%;
		padding: 0 50px;
	}
</style>
