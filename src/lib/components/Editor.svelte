<script lang="ts">
	import ToastEditor from './ToastEditor.svelte';
	import { uploadEditorImage } from '$lib/services/editorImageService';

	interface Props {
		content?: string;
		onBlur?: () => void;
	}

	let { content = $bindable(''), onBlur }: Props = $props();

	const handleImageUpload = async (blob: Blob, callback: (url: string) => void) => {
		try {
			const imageUrl = await uploadEditorImage(blob, blob.type);
			callback(imageUrl);
		} catch (error) {
			console.error('Failed to upload image:', error);
			// You might want to show an error toast here
		}
	};

	function handleChange(editorContent: { markdown: string; html: string }) {
		content = editorContent.markdown;
	}
</script>

<ToastEditor
	initialContent={content}
	onImageUpload={handleImageUpload}
	onChange={handleChange}
	{onBlur}
/>
