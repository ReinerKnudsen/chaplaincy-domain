<script lang="ts">
	import { goto } from '$app/navigation';

	import EventForm from '$lib/components/EventForm.svelte';
	import { addDoc } from 'firebase/firestore';
	import { EditModeStore } from '$lib/stores/ObjectStore';
	import { eventsColRef } from '$lib/firebase/firebaseConfig';

	const saveNewEvent = async (e: CustomEvent) => {
		try {
			await addDoc(eventsColRef, e.detail);
			console.log('Event saved successfully', e.detail);
			EditModeStore.set('');
			goto('/admin/eventsadmin');
		} catch (error) {
			console.error('Error writing event document:', error);
		}
	};
</script>

<div>
	<EventForm on:new={saveNewEvent} />
</div>
