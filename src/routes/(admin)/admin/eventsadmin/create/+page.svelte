<script>
	import { goto } from '$app/navigation';

	import EventForm from '$lib/components/EventForm.svelte';
	import { addDoc } from 'firebase/firestore';

	import { eventsColRef } from '$lib/firebase/firebaseConfig';

	const saveNewEvent = async (e) => {
		try {
			await addDoc(eventsColRef, e.detail);
			goto('/admin/eventsadmin');
		} catch (error) {
			console.error('Error writing event document:', error);
		}
	};
</script>

<div>
	<EventForm on:save={saveNewEvent} />
</div>
<div>&NonBreakingSpace;</div>
