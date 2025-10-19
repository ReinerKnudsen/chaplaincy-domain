<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import Icon from '@iconify/svelte';
	import NavigationButton from '$lib/components/NavigationButton.svelte';

	import { type Location, AllLocations, fetchLocations } from '$lib/stores/LocationsStore';
	import { FutureEventsStore, type DomainEvent, type CollectionItem } from '$lib/stores/ObjectStore';
	import { MINUTES_BEFORE_EVENT_START } from '$lib/utils/constants';

	import SimpleMarkdownViewer from '$lib/components/SimpleMarkdownViewer.svelte';
	import 'add-to-calendar-button';

	interface Props {
		data: { event: DomainEvent; eventId: string };
	}

	let { data }: Props = $props();
	let thisEvent: DomainEvent | null = $derived(data.event);
	let loading = $state(false);
	let location: Location | undefined = $state();
	let onlineReady = $state(false);
	let descriptionText: string | null = $state('');
	let thisIndex = $derived($FutureEventsStore.findIndex((event) => event.id === data.eventId));
	let prevItem: CollectionItem | null = $derived(thisIndex === 0 ? null : $FutureEventsStore[thisIndex - 1]);
	let nextItem: CollectionItem | null = $derived(
		thisIndex === $FutureEventsStore.length - 1 ? null : $FutureEventsStore[thisIndex + 1]
	);

	onMount(() => {
		if (!$AllLocations) fetchLocations();
		calculateOnlineReady();
		const timer = setInterval(() => {
			calculateOnlineReady();
		}, 5000); // Check every 5 seconds
		return () => {
			clearInterval(timer);
		};
	});

	const calculateOnlineReady = () => {
		// Prioritize the new, reliable UTC fields if they exist
		const startUtc = thisEvent?.startDateTimeUtc;
		const endUtc = thisEvent?.endDateTimeUtc;

		if (!thisEvent?.joinOnline) {
			onlineReady = false;
			return;
		}

		if (startUtc && endUtc) {
			// --- New, reliable logic using UTC ISO strings ---
			const now = new Date();
			const eventStartDateTime = new Date(startUtc);
			const eventEndDateTime = new Date(endUtc);

			const diffFromStart = eventStartDateTime.getTime() - now.getTime();
			const twentyMinutesInMillis = MINUTES_BEFORE_EVENT_START * 60 * 1000;
			const isWithinStartWindow = diffFromStart <= twentyMinutesInMillis;
			const isBeforeEndTime = now.getTime() < eventEndDateTime.getTime();
			onlineReady = isWithinStartWindow && isBeforeEndTime;
		} else if (thisEvent?.startdate && thisEvent?.starttime && thisEvent?.enddate && thisEvent?.endtime) {
			// --- Fallback logic for old data without UTC fields, assuming CEST (UTC+2) ---
			const now = new Date();
			const eventStartDateTime = new Date(`${thisEvent.startdate}T${thisEvent.starttime}+02:00`);
			const eventEndDateTime = new Date(`${thisEvent.enddate}T${thisEvent.endtime}+02:00`);
			const diffFromStart = eventStartDateTime.getTime() - now.getTime();
			const twentyMinutesInMillis = MINUTES_BEFORE_EVENT_START * 60 * 1000;
			const isWithinStartWindow = diffFromStart <= twentyMinutesInMillis;
			const isBeforeEndTime = now.getTime() < eventEndDateTime.getTime();
			onlineReady = isWithinStartWindow && isBeforeEndTime;
		} else {
			onlineReady = false;
		}
	};

	$effect(() => {
		if (thisEvent?.description) {
			const parseDescription = async () => {
				const parsed = await marked(thisEvent?.description!);
				descriptionText = parsed;
			};
			parseDescription();
		} else {
			descriptionText = '';
		}
	});

	$effect(() => {
		thisEvent?.location
			? (location = $AllLocations.find((location) => location.id === thisEvent?.location))
			: (location = undefined);
	});
</script>

{#if loading}
	<p>Loading...</p>
{:else if thisEvent}
	<div id="links" class="flex flex-row items-center justify-between">
		<div class="back-link">
			<Icon icon="fa6-regular:circle-left" class="h-6 w-6" />
			<a class="link" href="/events">Take me back to overview</a>
		</div>
		<div id="navigation-buttons" class="flex flex-row gap-8">
			{#if prevItem}
				<NavigationButton id={prevItem.id} type="events" direction="prev" />
			{/if}
			{#if nextItem}
				<NavigationButton id={nextItem.id} type="events" direction="next" />
			{/if}
		</div>
	</div>
{:else}
	<p>Event not found</p>
{/if}

<style>
</style>
