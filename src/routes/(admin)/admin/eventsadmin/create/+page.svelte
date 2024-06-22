<script>
	import { goto } from '$app/navigation';

	import EventForm from '$lib/components/EventForm.svelte';
	import { addDoc } from 'firebase/firestore';

	import { eventsColRef } from '$lib/firebase/firebaseConfig';

	const saveNewEvent = async (e) => {
		console.log('In page: ', e.detail);
		try {
			await addDoc(eventsColRef, e.detail);
			goto('/admin/eventsadmin');
		} catch (error) {
			console.error('Error writing document:', error);
		}
	};
</script>

<div>
	<EventForm on:save={saveNewEvent} />
</div>
<div>&NonBreakingSpace;</div>
