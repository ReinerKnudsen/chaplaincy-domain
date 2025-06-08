<script lang="ts">
	import { goto } from '$app/navigation';
	import { addDoc } from 'firebase/firestore';

	import { newsColRef } from '$lib/firebase/firebaseConfig';

	import NewsForm from '$lib/components/NewsForm.svelte';

	const saveNewItem = async (e: CustomEvent<Record<string, any>>) => {
		const newsData = e.detail;
		try {
			await addDoc(newsColRef, newsData);
			/**
			 * TODO: Report completion or error
			 */
			goto('/admin/newsadmin');
		} catch (error) {
			console.error('Error writing document:', error);
		}
	};
</script>

<div>
	<NewsForm on:new={saveNewItem} />
</div>
