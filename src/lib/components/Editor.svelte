<script lang="ts">
	import ToastEditor from './ToastEditor.svelte';
	import { uploadEditorImage } from '$lib/services/editorImageService';

	interface Props {
		content?: string;
	}

	let { content = $bindable('') }: Props = $props();

	async function handleImageUpload(
		event: CustomEvent<{ blob: Blob; callback: (url: string) => void }>,
	) {
		const { blob, callback } = event.detail;
		try {
			const imageUrl = await uploadEditorImage(blob, blob.type);
			callback(imageUrl);
		} catch (error) {
			console.error('Failed to upload image:', error);
			// You might want to show an error toast here
		}
	}

	function handleChange(event: CustomEvent<{ markdown: string; html: string }>) {
		const { markdown } = event.detail;
		content = markdown;
	}
</script>

<ToastEditor initialContent={content} on:imageUpload={handleImageUpload} on:change={handleChange} />
