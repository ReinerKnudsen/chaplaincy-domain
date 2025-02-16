<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';
	import { marked } from 'marked';
	import Icon from '$lib/components/Icon.svelte';
	import * as formats from '../../formats.js';

	let thisEvent = {};
	let locations = {};
	let loading = true; // Initialize loading state

	onMount(async () => {
		const eventId = $page.params.eventId;
		try {
			// Fetch all locations
			const locationSnapshot = await getDocs(collection(database, 'location'));
			locationSnapshot.forEach((doc) => {
				const data = doc.data();
				locations[doc.id] = `${data.name}, ${data.city}`;
			});

			const docRef = doc(database, 'events', eventId);
			const docSnapshot = await getDoc(docRef);
			if (docSnapshot.exists()) {
				thisEvent = docSnapshot.data();
				console.log('ThisEvent: ', thisEvent);
			} else {
				console.log('Could not load event document!');
			}
		} catch (err) {
			console.log('Error while loading event:', err);
		} finally {
			loading = false; // Set loading to false once data is fetched
		}
	});

	$: if (thisEvent.description) {
		thisEvent.description = marked.parse(thisEvent.description);
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else}
	<div class="rounded-2xl bg-white-primary">
		<div class={`container ${formats.container}`}>
			<div class={`headline ${formats.headline}`}>
				{thisEvent.title}
			</div>
			<div class={`event-data ${formats.itemMetaData}`}>
				<div class={`entry ${formats.itemMetaDataEntry}`}>
					<Icon name="calendar" />
					{thisEvent.startdate}
				</div>
				<div class={`entry ${formats.itemMetaDataEntry}`}>
					<Icon name="clock" />
					{thisEvent.starttime}
				</div>
				<div class={`entry ${formats.itemMetaDataEntry}`}>
					<!-- Refactor: Add link to location document -->
					<Icon name="location" />
					{locations[thisEvent.location] || thisEvent.location}
				</div>
			</div>
			{#if thisEvent.image}
				<div class={`event-image ${formats.itemImageContainer}`}>
					<img class={formats.itemImage} src={thisEvent.image} alt={thisEvent.title} />
				</div>
			{/if}
			<div class={`event-description ${formats.itemDescription}`}>
				{@html thisEvent.description}
			</div>
		</div>
	</div>
	<div class={`back-link ${formats.backLink}`}>
		<Icon name="left" />
		<a class={formats.aLink} href="/activities">Take me back to overview</a>
	</div>
{/if}
