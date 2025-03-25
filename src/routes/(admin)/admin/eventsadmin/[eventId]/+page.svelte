<script>
	import EventForm from '$lib/components/EventForm.svelte';
	import { updateDoc } from 'firebase/firestore';
	import { resetEditModeStore } from '$lib/stores/FormStore';

	export let data;

	const updateEvent = async (event) => {
		try {
			await updateDoc(data.docRef, event.detail);
			resetEditModeStore();
		} catch (error) {
			console.log('Error updating the event: ', error);
		}
	};
</script>

<div>
	<EventForm thisEvent={data.newEvent} on:update={updateEvent} />
</div>
