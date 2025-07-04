<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import Icon from '@iconify/svelte';

	import { loadItem, CollectionType, type DomainEvent } from '$lib/stores/ObjectStore';
	import { getDoc } from 'firebase/firestore';
	import { fetchLocations, type Location, AllLocations } from '$lib/stores/LocationsStore';
	import { MINUTES_BEFORE_EVENT_START } from '$lib/utils/constants';

	import MarkdownViewer from '$lib/components/MarkdownViewer.svelte';

	let thisEvent: DomainEvent | null = $state(null);
	let loading = $state(true);
	let location: Location | undefined = $state();
	let onlineReady = $state(false);
	let descriptionText: string | null = $state('');

	onMount(() => {
		const initialEvent = async () => {
			const eventId = page.params.eventId;
			const docRef = await loadItem(eventId, CollectionType.Events);
			if (docRef) {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					thisEvent = { id: docSnap.id, ...docSnap.data() } as DomainEvent;
				}
			}
			await fetchLocations();
			loading = false;
		};

		initialEvent();
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
	<div id="article-container" class="pt-30">
		<div id="article-content">
			<div id="article-title" class="article-title">
				{thisEvent.title}
			</div>
			{#if thisEvent.subtitle}
				<div id="article-subtitle" class="article-subtitle">
					{thisEvent.subtitle}
				</div>
			{/if}
			<div id="event-data" class="article-metadata">
				<div id="article-date" class="article-metadata-item">
					<Icon icon="fa6-regular:calendar" class="h-4 w-4" />
					{thisEvent.startdate}
				</div>
				<div id="article-time" class="article-metadata-item">
					<Icon icon="fa6-regular:clock" class="h-4 w-4" />
					{thisEvent.starttime}
				</div>
				{#if thisEvent.location}
					<div id="article-location" class="article-metadata-item">
						<Icon icon="gis:location-poi" class="h-4 w-4" />
						{#if location?.online}
							<span>{location?.name}</span>
						{:else}
							<a class="link" target="_blank" href={location?.locationUrl}
								>{[location?.name, location?.city].filter(Boolean).join(', ')}</a
							>
						{/if}
					</div>
				{/if}
				{#if thisEvent.imageCaption}
					<div class="article-metadata-item">
						<Icon icon="fa-solid:camera-retro" />
						{thisEvent.imageCaption}
					</div>
				{/if}
				{#if thisEvent.joinOnline && onlineReady}
					<div id="article-joinonline" class="article-metadata-item">
						<Icon icon="fluent:video-person-32-regular" class="h-4 w-4" />
						<a class="link" href={location?.locationUrl}>Join online now</a>
					</div>
				{:else if thisEvent.joinOnline}
					<div id="article-joinonline" class="article-metadata-item">
						<Icon icon="fa6-regular:clock" class="h-4 w-4" />
						<div>A link to join will be here 20 minutes before the event starts</div>
					</div>
				{/if}
			</div>
			{#if thisEvent.image}
				<div id="article-image" class="article-image-container">
					<img class="article-image" src={thisEvent.image} alt={thisEvent.imageAlt} />
				</div>
			{/if}
			{#if descriptionText && typeof descriptionText === 'string'}
				<MarkdownViewer content={descriptionText} />
			{/if}
		</div>
		<div id="pdfFile">
			{#if thisEvent.pdfFile}
				<div id="pdf-download" class="bg-white-smoke flex flex-row justify-start gap-4 p-6">
					<Icon icon="fa6-regular:file-pdf" class="h-6 w-6" />
					<a class="link flex flex-row gap-4 text-lg font-semibold" href={thisEvent.pdfFile} target="_blank">
						<div>Download {thisEvent.pdfText ? thisEvent.pdfText : 'PDF'}</div>
						<Icon icon="famicons:open-outline" class="h-6 w-6" />
					</a>
				</div>
			{/if}
		</div>
	</div>
	<div class="back-link">
		<Icon icon="fa6-regular:circle-left" class="h-6 w-6" />
		<a class="link" href="/events">Take me back to overview</a>
	</div>
{:else}
	<p>Event not found</p>
{/if}

<style>
</style>
