<script lang="ts">
	import EventForm from '$lib/components/EventForm.svelte';
	import { updateDoc } from 'firebase/firestore';
	import { resetEditMode } from '$lib/stores/FormStore';

	export let data;

	const updateEvent = async (event: CustomEvent) => {
		try {
			await updateDoc(data.docRef, event.detail);
			resetEditMode();
		} catch (error) {
			console.log('Error updating the event: ', error);
		}
	};
</script>

<div>
	<EventForm thisEvent={data.newEvent} on:update={updateEvent} />
</div>
