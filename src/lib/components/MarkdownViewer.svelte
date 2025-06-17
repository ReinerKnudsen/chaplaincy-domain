<script>
	import { run } from 'svelte/legacy';

	import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import '$lib/styles/markdown.css';
	import { onMount } from 'svelte';

	/** @type {{content?: string}} */
	let { content = '' } = $props();
	let viewerElement = $state();
	let viewer = $state();

	onMount(() => {
		viewer = new Viewer({
			el: viewerElement,
			initialValue: content,
			height: '500px',
		});

		return () => {
			if (viewer) {
				viewer.destroy();
			}
		};
	});

	run(() => {
		if (viewer && content) {
			viewer.setMarkdown(content);
		}
	});
</script>

<div bind:this={viewerElement}></div>

<style>
	:global(.toastui-editor-contents) {
		font-size: 1.125rem;
		line-height: 1.75;
	}

	:global(.toastui-editor-contents h1) {
		font-size: 2.25rem;
		border-bottom: none !important;
	}
	:global(.toastui-editor-contents h2) {
		font-size: 2rem;
		border-bottom: none !important;
	}

	:global(.toastui-editor-contents p) {
		font-size: 1.125rem;
		line-height: 1.75;
		margin: 1.5em 0;
		color: #475569; /* slate-600 */
	}

	:global(.toastui-editor-contents ul),
	:global(.toastui-editor-contents ol) {
		font-size: 1.125rem;
		line-height: 1.75;
		padding-left: 2em;
		color: #475569; /* slate-600 */
	}

	:global(.toastui-editor-contents li) {
		margin: 0.5em 0;
	}

	:global(.toastui-editor-contents a) {
		color: #2563eb; /* blue-600 */
		text-decoration: underline;
	}

	:global(.toastui-editor-contents a:hover) {
		color: #1d4ed8; /* blue-700 */
	}

	:global(.toastui-editor-contents blockquote) {
		border-left: 4px solid #e2e8f0; /* slate-200 */
		padding-left: 1em;
		color: #64748b; /* slate-500 */
		font-style: italic;
	}
</style>
