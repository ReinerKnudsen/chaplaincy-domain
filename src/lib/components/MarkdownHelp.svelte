<script lang="ts">
	import { marked } from 'marked';
	import { Button } from 'flowbite-svelte';
	import Icon from './Icon.svelte';

	let isVisible = { help: false, preview: false };

	export let text: string = '';

	const cellPadding = 'py-2 pl-5';
	const cellFormat = {
		one: 'border-b font-mono',
		two: 'border-b border-l pb-1 pl-5',
		three: 'border-b border-l-4 pb-1 pl-5 font-mono',
		four: 'border-b border-l pb-1 pl-5'
	};

	const toggleSection = (view) => {
		if (view === 'help') {
			isVisible.help = !isVisible.help;
		} else if (view === 'preview') {
			isVisible.preview = !isVisible.preview;
		}
	};
</script>

<!-- Help text -->

<div class="mt-2 border border-green-40">
	<div class="flex w-full flex-row flex-nowrap items-center justify-between bg-green-50">
		<Button class="h-8 w-full text-lg font-semibold" on:click={() => toggleSection('help')}
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
				<div class="border-b border-l-4 border-l-slate-400 bg-slate-300 py-2 pl-5 font-semibold">
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
	<div class="flex w-full flex-row flex-nowrap items-center justify-between bg-green-50">
		<Button class="h-8 w-full text-lg font-semibold" on:click={() => toggleSection('preview')}
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
		<div class="h-72 overflow-scroll bg-green-50 px-4">
			<div class="scale-[0.8]">
				{@html marked.parse(text)}
			</div>
		</div>
		<div class="py-1 text-center text-sm">
			This preview provides a rough estimate how your text will look on the website.
		</div>
	{/if}
</div>
