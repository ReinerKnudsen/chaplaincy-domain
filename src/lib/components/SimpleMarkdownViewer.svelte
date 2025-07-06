<script lang="ts">
	import { marked } from 'marked';

	interface Props {
		content?: string | null;
	}

	let { content = '' }: Props = $props();

	// Parse markdown content - this works both server-side and client-side
	const parsedContent = $derived(content ? marked.parse(content) : '');
</script>

<!-- Render the parsed markdown HTML -->
<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<div class="markdown-content">{@html parsedContent}</div>

<style>
	:global(.markdown-content) {
		font-size: 1.125rem;
		line-height: 1.75;
	}

	:global(.markdown-content h1) {
		font-size: 2.25rem;
		font-weight: 700;
		margin-bottom: 1rem;
		margin-top: 2rem;
		border-bottom: 2px solid #e5e7eb;
		padding-bottom: 0.5rem;
	}

	:global(.markdown-content h2) {
		font-size: 1.875rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
		margin-top: 1.5rem;
	}

	:global(.markdown-content h3) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		margin-top: 1rem;
	}

	:global(.markdown-content p) {
		margin-bottom: 1rem;
	}

	:global(.markdown-content ul, .markdown-content ol) {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	:global(.markdown-content li) {
		margin-bottom: 0.25rem;
	}

	:global(.markdown-content code) {
		background-color: #f3f4f6;
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-family: 'Courier New', monospace;
	}

	:global(.markdown-content pre) {
		background-color: #f3f4f6;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-bottom: 1rem;
	}

	:global(.markdown-content blockquote) {
		border-left: 4px solid #d1d5db;
		padding-left: 1rem;
		margin: 1rem 0;
		color: #6b7280;
	}

	:global(.markdown-content a) {
		color: #3b82f6;
		text-decoration: underline;
	}

	:global(.markdown-content a:hover) {
		color: #1d4ed8;
	}

	:global(.markdown-content img) {
		max-width: 100%;
		height: auto;
		margin: 1rem 0;
	}

	:global(.markdown-content table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
	}

	:global(.markdown-content th, .markdown-content td) {
		border: 1px solid #d1d5db;
		padding: 0.5rem;
		text-align: left;
	}

	:global(.markdown-content th) {
		background-color: #f9fafb;
		font-weight: 600;
	}
</style>
