<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import { marked } from 'marked';

	import Label from './Label.svelte';

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

<div id="component-container" class="my-8 rounded-xl border p-4">
	<div id="component-label" class="flex flex-row items-center justify-between gap-4">
		<Label class="m-0 text-xl font-semibold" child="slug">Short text (slug)</Label>
		<p class="explanation text-right">
			<strong>{slugText.length} of {MAX_SLUG_TEXT} </strong> characters.
		</p>
	</div>
	<textarea
		class="disabled:bg-white-primary w-full disabled:border-0 disabled:text-slate-400"
		id="slug"
		rows="3"
		name="slug"
		bind:value={slugText}
		maxlength={MAX_SLUG_TEXT}
		required
		disabled={!editSlug}
		on:blur={() => (editSlug = false)}
	/>
	<div id="component-footer" class="mt-2 flex items-center justify-between">
		<div id="component-explanation" class="mx-1 my-2 text-sm">
			The slug text is a short version of your text to be shown in cards view. <br />The system will
			suggest a slug text for you which you can change.
		</div>
		<button class="btn btn-primary" disabled={editSlug} on:click={handleChangeSlug}
			>{slugText.length === 0 ? 'Create' : 'Change'} slug text</button
		>
	</div>
</div>
