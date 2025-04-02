<script lang="ts">
	import { Label, Textarea, Button } from 'flowbite-svelte';
	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import { marked } from 'marked';
	import { createEventDispatcher } from 'svelte';

	export let text: string = '';
	export let slugText: string = '';

	let editSlug: boolean = false;

	const dispatch = createEventDispatcher<{ slugChange: string }>();

	const handleChangeSlug = async () => {
		if (!slugText) {
			const parsedText = await marked.parse(text);
			slugText = parsedText.replace(/<[^>]*>/g, '').slice(0, MAX_SLUG_TEXT);
		} else {
			editSlug = true;
		}
	};

	$: if (slugText) {
		dispatch('slugChange', slugText);
	}
</script>

<div class="component-wrapper">
	<label for="slug" class="form-label">Short text (slug)</label>
	<textarea
		class="form-input"
		placeholder="Enter slug text"
		id="slug"
		rows="3"
		name="slug"
		bind:value={slugText}
		maxlength={MAX_SLUG_TEXT}
		required
		disabled={!editSlug}
		on:blur={() => (editSlug = false)}
	/>
</div>
<div class="flex justify-between">
	<div class="mx-1 text-sm">
		The slug text is a short version of your text to be shown in cards view. <br />The system will
		suggest a slug text for you which you can change.
	</div>
	<Button
		class="bg-primary-100 text-white-primary disabled:bg-primary-40 disabled:text-slate-600"
		disabled={editSlug}
		on:click={handleChangeSlug}>{slugText.length === 0 ? 'Create' : 'Change'} slug text</Button
	>
</div>
