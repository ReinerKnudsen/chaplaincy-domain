<script>
	import { getDoc, doc } from 'firebase/firestore';
	import { page } from '$app/stores';
	import { database } from '$lib/firebase/firebaseConfig.js';
	import { docRef, NewsStore } from '$lib/stores/FormStore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const newsID = $page.params.newsId;
	docRef.set(doc(database, 'news', newsID));

	const fetchItemData = async () => {
		try {
			getDoc($docRef).then((docSnapshot) => {
				if (docSnapshot.exists()) {
					$NewsStore = docSnapshot.data(); // Populate eventData with document data
				} else {
					console.log('No such document!');
				}
			});
		} catch (error) {
			console.error('Error fetching document:', error);
		}
	};
	onMount(() => {
		fetchItemData();
		goto('/admin/newsadmin/create');
	});
</script>
