<script>
	import ItemCard from '$lib/components/ItemCard.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	export let data;
	let events = data.events;
	const sortedEvents = events.sort((a, b) => {
		return new Date(a.data.startdate) - new Date(b.data.startdate);
	});

	const headerData = {
		title: 'Activities',
		photoName: 'Gaurav Kumar',
		photoUrl: 'https://unsplash.com/@gkumar2175',
		imageUrl:
			'https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fevents.jpeg?alt=media&token=7b530e23-9825-477f-9fef-587beee93406',
	};
</script>

<PageHeader {headerData} textStyle="white" />

<p>Please find our upcoming activities.</p>
<p>
	Make sure to join our mailing list if you want to be receive reminders and more details in your
	inbox.
</p>

{#if events.length > 0}
	<div class="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
		{#each sortedEvents as event}
			<ItemCard item={event} kind="activities" />
		{/each}
	</div>
{:else}
	<div class="mt-10 font-semibold italic">Currently there are no activities upcoming.</div>
{/if}

<style>
</style>
