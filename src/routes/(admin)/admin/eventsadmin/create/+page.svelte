<script lang="ts">
	import { goto } from '$app/navigation';

	import EventForm from '$lib/components/EventForm.svelte';
	import { addDoc } from 'firebase/firestore';
	import { EditMode, EditModeStore, type DomainEvent } from '$lib/stores/ObjectStore';
	import { eventsColRef } from '$lib/firebase/firebaseConfig';

	const saveNewEvent = async (event: DomainEvent) => {
		try {
			await addDoc(eventsColRef, event);
			EditModeStore.set(EditMode.Empty);
			goto('/admin/eventsadmin');
		} catch (error) {
			console.error('Error writing event document:', error);
		}
	};
</script>

<div>
	<EventForm onCreateNew={saveNewEvent} />
</div>
