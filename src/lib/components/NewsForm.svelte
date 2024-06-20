<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Input, Label, Checkbox, Textarea, Helper, Button } from 'flowbite-svelte';
	import { marked } from 'marked';
	import Icon from '$lib/components/Icon.svelte';

	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import { authStore } from '$lib/stores/AuthStore';
	import UploadImage from '$lib/components/UploadImage.svelte';

	export let thisItem;
	const dispatch = createEventDispatcher();
	const author = $authStore.name;

	let slugtext;
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
	let isVisible = { help: false, preview: false };

	const cellPadding = 'py-2 pl-5';
	const cellFormat = {
		one: 'border-b font-mono',
		two: 'border-b border-l pb-1 pl-5',
		three: 'border-b border-l-4 pb-1 pl-5 font-mono',
		four: 'border-b border-l pb-1 pl-5'
	};

	if (thisItem) {
		newItem = thisItem;
		state = 'update';
	}

	$: {
		let slugCache = marked.parse(newItem.text).replace(/<[^>]*>/g, '');
		newItem.slug = slugCache.slice(0, MAX_SLUG_TEXT);
	}

	const toggleSection = (view) => {
		console.log('toggle section');
		if (view === 'help') {
			isVisible.help = !isVisible.help;
		} else if (view === 'preview') {
			isVisible.preview = !isVisible.preview;
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
			imageAlt: '',
			imageCaption: '',
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

<div class="form bg-white-primary">
	<h1 class="">{thisItem ? 'Edit news item' : 'Create news item'}</h1>

	<form id="form-container" enctype="multipart/form-data" on:submit={handleSubmit}>
		<!-- Titel -->
		<div>
			<Label for="title" class="mb-2 mt-8 text-xl font-semibold">News Titel *</Label>
			<Input type="text" id="title" placeholder="News Title" bind:value={newItem.title} required />
		</div>

		<!-- Author -->
		<div>
			<Label for="author" class="mb-2 mt-8 text-xl font-semibold">Author</Label>
			<Input type="text" id="author" bind:value={newItem.author} disabled />
		</div>

		<!-- News text -->
		<div>
			<Label for="news-text" class="mb-2 mt-8 text-xl font-semibold">News text *</Label>
			<Textarea
				id="news-text"
				placeholder="News text"
				rows="8"
				name="news-text"
				bind:value={newItem.text}
				wrap="hard"
			/>
			<p class="explanation text-right">
				<strong>{newItem.text.length}</strong> characters.
			</p>
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
					{@html marked.parse(newItem.text)}
				</div>
				<div class="text-center text-sm">
					This preview provides a rough estimate how your text will look on the website.
				</div>
			{/if}
		</div>

		<!-- Slug -->
		<div>
			<Label for="slug" class="mb-2 mt-8 text-xl font-semibold">Short text (slug)</Label>
			<Textarea
				id="slug"
				rows="3"
				name="slug"
				bind:value={newItem.slug}
				maxlength="MAX_SLUG_TEXT"
				required
			/>
			<p class="explanation text-right">
				<strong>{newItem.slug.length} of {MAX_SLUG_TEXT} </strong> characters.
			</p>
		</div>

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
					/>
					<p class="explanation">This text will be displayed below the image.</p>
				</div>
			</div>
		</div>

		<!-- Buttons -->
		<div class="buttons col-span-2">
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
