<script>
	import ItemCard from '$lib/components/ItemCard.svelte';

	export let data;
	let events = data.events;
	const sortedEvents = events.sort((a, b) => {
		return new Date(a.data.startdate) - new Date(b.data.startdate);
	});
</script>

<div class="page-header mb-10">
	<div class="page-header-image grid h-[150px] grid-cols-1 items-center">
		<div class="page-title pl-10 text-5xl font-semibold text-white">Events</div>
	</div>
	<div class="text-right text-sm">
		Image by: <a href="https://unsplash.com/@gkumar2175" target="_blank">Gaurav Kumar</a>
	</div>
</div>

<p>Please find our upcoming events.</p>
<p>
	Make sure to join our mailing list if you want to be receive reminders and more details in your
	inbox.
</p>
<div class="mb-10 grid grid-cols-2 gap-5">
	{#each sortedEvents as event}
		<ItemCard item={event} kind="events" />
	{/each}
</div>

<style>
	.page-header a {
		color: #2986cc;
		font-weight: 600;
	}

	.page-header-image {
		background-image: url('https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fevents.jpeg?alt=media&token=7b530e23-9825-477f-9fef-587beee93406');
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		background-size: cover;
	}
</style>
