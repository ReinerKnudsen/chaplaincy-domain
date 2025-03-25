<script>
	import { goto } from '$app/navigation';

	import EventForm from '$lib/components/EventForm.svelte';
	import { addDoc } from 'firebase/firestore';
	import { resetEditMode } from '$lib/stores/FormStore';

	import { eventsColRef } from '$lib/firebase/firebaseConfig';

	const saveNewEvent = async (e) => {
		try {
			const newDoc = await addDoc(eventsColRef, e.detail);
			resetEditMode();
			goto('/admin/eventsadmin');
		} catch (error) {
			console.error('Error writing event document:', error);
		}
	};
</script>

<div>
	<EventForm on:new={saveNewEvent} />
</div>
<div>&NonBreakingSpace;</div>
