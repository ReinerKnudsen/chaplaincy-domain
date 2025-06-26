<script lang="ts">
	import { onMount } from 'svelte';

	//import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import '$lib/styles/markdown.css';
	import { browser } from '$app/environment';

	interface Props {
		initialContent?: string;
		onImageUpload: (blob: Blob, callback: (imageUrl: string) => void) => void;
		onChange: (content: { markdown: string; html: string }) => void;
	}

	let { initialContent = '', onImageUpload, onChange }: Props = $props();
	let editorElement: HTMLDivElement;
	let editor: any = null;

	// Function to get markdown content
	export function getMarkdown() {
		return editor?.getMarkdown() || '';
	}

	// Function to set markdown content
	export function setMarkdown(content: string) {
		if (editor) {
			editor.setMarkdown(content);
		}
	}

	onMount(async () => {
		if (browser) {
			// Dynamic import - only runs in browser
			const { Editor } = await import('@toast-ui/editor');
			editor = new Editor({
				el: editorElement,
				height: '500px',
				initialEditType: 'markdown',
				previewStyle: 'vertical',
				initialValue: initialContent,
				hooks: {
					addImageBlobHook: (blob, callback) => {
						onImageUpload(blob, callback);
						return false;
					},
				},
			});
			editor.on('change', () => {
				onChange({
					markdown: editor.getMarkdown(),
					html: editor.getHTML(),
				});
			});
		}
		return () => {
			if (editor) {
				editor.destroy();
			}
		};
	});
</script>

<div bind:this={editorElement}></div>

<style>
	/* Customize editor theme */
	:global(.toastui-editor-defaultUI) {
		border-radius: 0.375rem;
		border-color: #e5e7eb;
	}

	/* Customize markdown preview */
	:global(.toastui-editor-contents h1) {
		font-size: 2em;
		font-weight: 600;
		color: #1f2937;
		border-bottom: 2px solid #e5e7eb;
		padding-bottom: 0.3em;
	}

	:global(.toastui-editor-contents h2) {
		font-size: 1.5em;
		font-weight: 600;
		color: #374151;
		margin-top: 1.5em;
	}

	:global(.toastui-editor-contents p) {
		line-height: 1.6;
		margin: 1em 0;
		color: #4b5563;
	}

	:global(.toastui-editor-contents a) {
		color: #2563eb;
		text-decoration: none;
	}

	:global(.toastui-editor-contents a:hover) {
		text-decoration: underline;
	}

	:global(.toastui-editor-contents blockquote) {
		border-left: 4px solid #e5e7eb;
		padding-left: 1em;
		color: #6b7280;
		font-style: italic;
	}

	:global(.toastui-editor-contents code) {
		background-color: #f3f4f6;
		padding: 0.2em 0.4em;
		border-radius: 0.25em;
		font-family: ui-monospace, monospace;
	}

	:global(.toastui-editor-contents pre) {
		background-color: #1f2937;
		border-radius: 0.375rem;
		padding: 1em;
	}

	:global(.toastui-editor-contents ul, .toastui-editor-contents ol) {
		padding-left: 1.5em;
		margin: 1em 0;
	}

	:global(.toastui-editor-contents img) {
		max-width: 100%;
		border-radius: 0.375rem;
	}
</style>
