<script>
	import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
	import '@toast-ui/editor/dist/toastui-editor.css';
	import '$lib/styles/markdown.css';
	import { onMount } from 'svelte';

	export let content = '';
	let viewerElement;
	let viewer;

	onMount(() => {
		viewer = new Viewer({
			el: viewerElement,
			initialValue: content,
			height: '500px'
		});

		return () => {
			if (viewer) {
				viewer.destroy();
			}
		};
	});

	$: if (viewer && content) {
		viewer.setMarkdown(content);
	}
</script>

<div bind:this={viewerElement}></div>
