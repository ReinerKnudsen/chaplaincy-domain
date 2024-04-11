<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Input, Label, Checkbox, Textarea, Helper, Button } from 'flowbite-svelte';

	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import { authStore } from '$lib/stores/AuthStore';
	import UploadImage from '$lib/components/UploadImage.svelte';

	export let thisItem;
	const dispatch = createEventDispatcher();
	const author = $authStore.name;
	console.log($authStore);

	let slugtext;
	let newItem = {
		title: '',
		author: author,
		text: '',
		slug: '',
		publishdate: '',
		publishtime: '',
		image: '',
		imagealt: '',
		tags: ''
	};
	let docRef;
	let state = 'save';

	if (thisItem) {
		newItem = thisItem;
		state = 'update';
	}

	const handleCreateSlug = () => {
		newItem.slug = newItem.text.slice(0, MAX_SLUG_TEXT);
	};

	const handleConditionChange = (e) => {
		if (e.target.checked) {
			newItem.condition = 'Entry is free, donations are welcome.';
		} else {
			newItem.condition = '';
		}
	};

	const cleanUpForm = () => {
		newItem = {
			title: '',
			author: '',
			text: '',
			slug: '',
			publishdate: '',
			publishtime: '',
			image: '',
			imagealt: '',
			tags: ''
		};
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

<div class="form">
	<h1>{thisItem ? 'Edit news item' : 'Create news item'}</h1>

	<form
		class="form-container"
		id="form-container"
		enctype="multipart/form-data"
		on:submit={handleSubmit}
	>
		<!-- Titel -->
		<div>
			<Label for="title" class="mb-2">News Titel *</Label>
			<Input type="text" id="title" placeholder="News Title" bind:value={newItem.title} required />
		</div>

		<!-- Author -->
		<div>
			<Label for="author" class="mb-2">Author</Label>
			<Input type="text" id="author" bind:value={newItem.author} disabled />
		</div>

		<!-- News text -->
		<div>
			<Label for="news-text" class="mb-2">News text *</Label>
			<Textarea
				id="news-text"
				placeholder="News text"
				rows="8"
				name="news-text"
				bind:value={newItem.text}
			/>
			<p class="explanation text-right">
				<strong>{newItem.text.length}</strong> characters.
			</p>
		</div>

		<!-- Slug -->
		<div>
			<Label for="slug" class="mb-2">Short text (slug)</Label>
			<Textarea
				id="slug"
				rows="3"
				name="slug"
				bind:value={newItem.slug}
				maxlength="MAX_SLUG_TEXT"
				required
				on:focus={handleCreateSlug}
			/>
			<p class="explanation text-right">
				<strong>{newItem.slug.length} of {MAX_SLUG_TEXT} </strong> characters.
			</p>
		</div>

		<!-- Publish date  -->
		<div>
			<Label for="publishdate" class="mb-2">Publish Date *</Label>
			<Input type="date" id="publishdate" required bind:value={newItem.publishdate} />
			<p class="explanation">If you don't select a publish date, it will be set to today.</p>
		</div>

		<!-- Publish time  -->
		<div>
			<Label class="mb-2">Publish Time</Label>
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
			{#if state === 'update'}
				<UploadImage imgUrl={newItem.image} on:upload={assignImage} />
			{:else}
				<UploadImage on:upload={assignImage} />
			{/if}
		</div>
		<div>
			<Label class="mb-2">Alternative text</Label>
			<Input type="text" id="imagealt" bind:value={newItem.imagealt} disabled={!newItem.image} />
			<p class="explanation">
				The alternative text helps people with screenreaders to understand the picture's content
			</p>
		</div>

		<!-- Buttons -->
		<div class="buttons col-span-2">
			<Button type="reset" color="light" on:click={() => goto('/admin/newsadmin')}>Cancel</Button>
			<Button type="reset" color="light" disabled={docRef}>Empty form</Button>
			<Button type="submit" disabled={newItem.length === 0}
				>{state === 'update' ? 'Update' : 'Save'} news</Button
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
