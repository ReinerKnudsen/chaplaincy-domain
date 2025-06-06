<script context="module">
	export const csr = true;
</script>

<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import '$lib/styles/markdown.css';

	let ToastEditor;
	let MarkdownViewer;
	let editorInstance;
	let savedContent = `# Welcome to the Editor

This is a preview of the markdown editor. You can:

- Write **bold** and *italic* text
- Create [links](https://example.com)
- Add images
- Make lists like this one

Try editing this content to see the preview update in real-time!`;

	onMount(async () => {
		if (browser) {
			const [editorModule, viewerModule] = await Promise.all([
				import('$lib/components/ToastEditor.svelte'),
				import('$lib/components/MarkdownViewer.svelte'),
			]);
			ToastEditor = editorModule.default;
			MarkdownViewer = viewerModule.default;
		}
	});

	async function handleImageUpload(event) {
		const { blob, callback } = event.detail;

		// Example: Upload the image to your server
		// const formData = new FormData();
		// formData.append('image', blob);
		// const response = await fetch('/api/upload', { method: 'POST', body: formData });
		// const { url } = await response.json();

		// For now, we'll just create an object URL as an example
		const imageUrl = URL.createObjectURL(blob);
		callback(imageUrl);
	}

	function handleChange(event) {
		const { markdown, html } = event.detail;
		savedContent = markdown;
	}

	function saveContent() {
		if (editorInstance) {
			const markdown = editorInstance.getMarkdown();
		}
	}
</script>

<div class="my-3 w-full">
	<h1>Editor</h1>
	{#if ToastEditor}
		<svelte:component
			this={ToastEditor}
			bind:this={editorInstance}
			initialContent={savedContent}
			on:imageUpload={handleImageUpload}
			on:change={handleChange}
		/>
		<button class="text-white mt-4 rounded bg-blue-500 px-4 py-2" on:click={saveContent}>
			Save Content
		</button>
	{/if}
</div>

<div class="my-3 w-full">
	<h1>Preview</h1>
	{#if MarkdownViewer}
		<svelte:component this={MarkdownViewer} content={savedContent} />
	{/if}
</div>

<style>
</style>
