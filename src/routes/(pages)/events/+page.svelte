<script>
	import EventCard from '$lib/components/EventCard.svelte';

	export let data;
	console.log(data);
	let events = data.events;
	const sortedEvents = events.sort((a, b) => {
		return new Date(a.data.startdate) - new Date(b.data.startdate);
	});
</script>

<h1 class="mb-10 text-4xl font-semibold">Events</h1>
<p>Please find our upcoming events.</p>
<p>
	Make sure to join our mailing list if you want to be receive reminders and more details in your
	inbox.
</p>
<div class="mb-10 grid grid-cols-2 gap-5">
	{#each sortedEvents as event}
		<EventCard item={event} />
	{/each}
</div>

<style>
</style>
