<script lang="ts">
	import { MAX_SLUG_TEXT } from '$lib/utils/constants';
	import Label from './ui/label/label.svelte';

	interface Props {
		required?: boolean | null;
		slugText?: string | null;
		onBlur: (slugText: string) => void;
	}

	let { slugText = '', required = false, onBlur }: Props = $props();
</script>

<div id="component-container" class="my-8 rounded-xl border p-4">
	<div id="component-label" class="flex flex-row items-center justify-between gap-4">
		<Label for="slug">Short text (slug) {required ? '*' : ''}</Label>
		<p class="explanation text-right">
			<strong>{slugText ? slugText.length : 0} of {MAX_SLUG_TEXT} </strong> characters.
		</p>
	</div>
	<textarea
		class="disabled:bg-white-primary w-full p-4 disabled:border-0 disabled:text-slate-400"
		id="slug"
		rows="3"
		name="slug"
		bind:value={slugText}
		maxlength={MAX_SLUG_TEXT}
		required
		onblur={() => onBlur(slugText || '')}
	></textarea>
	<div id="component-footer" class="mt-2 flex items-center justify-between">
		<div id="component-explanation" class="mx-1 my-2 text-sm">
			The slug text is a short version of your text to be shown in cards view. <br />The system will suggest a slug text
			for you which you can change.
		</div>
	</div>
</div>
