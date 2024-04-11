<script>
	import { goto } from '$app/navigation';

	import { addDoc } from 'firebase/firestore';
	import { newsColRef } from '$lib/firebase/firebaseConfig';
	import NewsForm from '$lib/components/NewsForm.svelte';

	const saveNewItem = async (e) => {
		try {
			await addDoc(newsColRef, e.detail);
			console.log('Document successfully written!');
			goto('/admin/newsadmin');
		} catch (error) {
			console.error('Error writing document:', error);
		}
	};
</script>

<div>
	<NewsForm on:save={saveNewItem} />
</div>
