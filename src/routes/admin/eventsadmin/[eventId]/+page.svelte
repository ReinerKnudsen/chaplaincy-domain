<script>
	import { getDoc, doc } from 'firebase/firestore';
	import { page } from '$app/stores';
	import { eventsColRef, database } from '$lib/firebase/firebaseConfig.js';
	import { EventStore, docRef } from '$lib/stores/FormStore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const eventID = $page.params.eventId;
	docRef.set(doc(database, 'events', eventID));

	const fetchEventData = async () => {
		try {
			getDoc($docRef).then((docSnapshot) => {
				if (docSnapshot.exists()) {
					EventStore.set(docSnapshot.data()); // Populate eventData with document data
				} else {
					console.log('No such document!');
				}
			});
		} catch (error) {
			console.error('Error fetching document:', error);
		}
	};
	onMount(() => {
		fetchEventData();
		goto('/admin/eventsadmin/create');
	});
</script>
