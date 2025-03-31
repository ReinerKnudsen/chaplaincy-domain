<script lang="ts">
	import { goto } from '$app/navigation';
	import { addDoc } from 'firebase/firestore';

	import { newsColRef } from '$lib/firebase/firebaseConfig';

	import NewsForm from '$lib/components/NewsForm.svelte';

	const saveNewItem = async (e: CustomEvent<Record<string, any>>) => {
		const newsData = e.detail;

		try {
			// Add the news document first
			const docRef = await addDoc(newsColRef, newsData);
			goto('/admin/newsadmin');
		} catch (error) {
			console.error('Error writing document:', error);
		}
	};
</script>

<div>
	<NewsForm on:new={saveNewItem} />
</div>
