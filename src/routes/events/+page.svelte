<!-- <script>
	import EventCard from '$lib/event/Eventcard.svelte';
	export let data;
	const events = data.events;
</script>

<div class="my-3 w-full px-20">
	<h1>All events</h1>
	<div class="my-5 flex grow-0 flex-row flex-nowrap justify-between gap-8">
		{#each events as event}
			<EventCard {event} />
		{/each}
	</div>
</div> -->

<h1>Events</h1>
<a href="/events/create">Create new event</a>
