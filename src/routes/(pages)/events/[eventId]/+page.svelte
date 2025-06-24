<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import Icon from '@iconify/svelte';

	import { loadItem, CollectionType, EventStore } from '$lib/stores/ObjectStore';
	import { fetchLocations, type Location, AllLocations } from '$lib/stores/LocationsStore';
	import { MINUTES_BEFORE_EVENT_START } from '$lib/utils/constants';

	import MarkdownViewer from '$lib/components/MarkdownViewer.svelte';

	let loading = $state(true);
	let location: Location | undefined = $state();
	let onlineReady = $state(false);

	onMount(async () => {
		const eventId = page.params.eventId;
		await loadItem(eventId, CollectionType.Events);
		await fetchLocations();
		loading = false;
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
		const startUtc = $EventStore?.startDateTimeUtc;
		const endUtc = $EventStore?.endDateTimeUtc;

		if (!$EventStore?.joinOnline) {
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
		} else if (
			$EventStore?.startdate &&
			$EventStore?.starttime &&
			$EventStore?.enddate &&
			$EventStore?.endtime
		) {
			// --- Fallback logic for old data without UTC fields, assuming CEST (UTC+2) ---
			const now = new Date();
			const eventStartDateTime = new Date(
				`${$EventStore.startdate}T${$EventStore.starttime}+02:00`
			);
			const eventEndDateTime = new Date(`${$EventStore.enddate}T${$EventStore.endtime}+02:00`);
			const diffFromStart = eventStartDateTime.getTime() - now.getTime();
			const twentyMinutesInMillis = MINUTES_BEFORE_EVENT_START * 60 * 1000;
			const isWithinStartWindow = diffFromStart <= twentyMinutesInMillis;
			const isBeforeEndTime = now.getTime() < eventEndDateTime.getTime();
			onlineReady = isWithinStartWindow && isBeforeEndTime;
		} else {
			onlineReady = false;
		}
	};

	let description = $derived($EventStore?.description ? marked.parse($EventStore.description) : '');

	$effect(() => {
		$EventStore?.location
			? (location = $AllLocations.find((location) => location.id === $EventStore.location))
			: (location = undefined);
	});
</script>

{#if loading}
	<p>Loading...</p>
{:else if $EventStore}
	<div id="article-container" class="article-container">
		<div id="article-content">
			<div id="article-title" class="article-title">
				{$EventStore.title}
			</div>
			<div id="event-data" class="article-metadata">
				<div id="article-date" class="article-metadata-item">
					<Icon icon="fa6-regular:calendar" />
					{$EventStore.startdate}
				</div>
				<div id="article-time" class="article-metadata-item">
					<Icon icon="fa6-regular:clock" />
					{$EventStore.starttime}
				</div>
				{#if $EventStore.location}
					<div id="article-location" class="article-metadata-item">
						<Icon icon="gis:location-poi" />
						{#if location?.online}
							<span>{location?.name}</span>
						{:else}
							<a class="link" target="_blank" href={location?.locationUrl}
								>{[location?.name, location?.city].filter(Boolean).join(', ')}</a
							>
						{/if}
					</div>
				{/if}
				{#if $EventStore.joinOnline && onlineReady}
					<div id="article-joinonline" class="article-metadata-item">
						<Icon icon="fluent:video-person-32-regular" />
						<a class="link" href={location?.locationUrl}>Join online now</a>
					</div>
				{:else if $EventStore.joinOnline}
					<div id="article-joinonline" class="article-metadata-item">
						<Icon icon="fa6-regular:clock" />
						<div>A link to join will be here 20 minutes before the event starts</div>
					</div>
				{/if}
			</div>
			{#if $EventStore.image}
				<div id="article-image" class="article-image-container">
					<img class="article-image" src={$EventStore.image} alt={$EventStore.imageAlt} />
				</div>
			{/if}
			{#if description && typeof description === 'string'}
				<MarkdownViewer content={description} />
			{/if}
		</div>
		<div id="pdfFile">
			{#if $EventStore.pdfFile}
				<div id="pdf-download" class="bg-white-smoke flex flex-row justify-start gap-4 p-6">
					<Icon icon="fa6-regular:file-pdf" class="h-6 w-6" />
					<a
						class="link flex flex-row gap-4 text-lg font-semibold"
						href={$EventStore.pdfFile}
						target="_blank"
					>
						<div>Download {$EventStore.pdfText ? $EventStore.pdfText : 'PDF'}</div>
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
