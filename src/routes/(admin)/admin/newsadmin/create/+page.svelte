<script lang="ts">
	import { goto } from '$app/navigation';

	import { addDoc } from 'firebase/firestore';
	import { newsColRef } from '$lib/firebase/firebaseConfig';

	import type { News } from '$lib/stores/ObjectStore';

	import NewsForm from '$lib/components/NewsForm.svelte';

	const saveNewItem = async (newNewsItem: News) => {
		try {
			await addDoc(newsColRef, newNewsItem);
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
	<NewsForm onCreateNew={saveNewItem} />
</div>
