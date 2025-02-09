<script>
	import { goto } from '$app/navigation';
	import { addDoc } from 'firebase/firestore';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
	import { newsColRef, pdfStorageRef, pdfColRef } from '$lib/firebase/firebaseConfig';
	import NewsForm from '$lib/components/NewsForm.svelte';

	const saveNewItem = async (e) => {
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
	<NewsForm on:save={saveNewItem} />
</div>
