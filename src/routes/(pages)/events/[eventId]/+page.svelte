<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import Icon from '@iconify/svelte';

	import { loadItem, CollectionType, EventStore } from '$lib/stores/ObjectStore';
	import { fetchLocations, type Location, AllLocations } from '$lib/stores/LocationsStore';

	import MarkdownViewer from '$lib/components/MarkdownViewer.svelte';

	let loading = $state(true);
	let location: Location | undefined = $state();

	onMount(async () => {
		const eventId = page.params.eventId;
		await loadItem(eventId, CollectionType.Events);
		await fetchLocations();
		loading = false;
	});

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
	<div id="article-container"class="article-container">
		<div id="article-content">
			<div id="article-title" class="article-title">
				{$EventStore.title}
			</div>
			<div id="event-data" class= "article-metadata">
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
						<a class="link" target="_blank" href={location?.openMapUrl}
							>{`${location?.name}, ${location?.city}`}</a
						>
					</div>
				{/if}
			</div>
			{#if $EventStore.image}
				<div id="article-image" class="article-image-container">
					<img class="article-image" src={$EventStore.image} alt={$EventStore.title} />
				</div>
			{/if}
			{#if description}
				<MarkdownViewer content={description} />
			{/if}
		</div>
		<div id="pdfFile">
			{#if $EventStore.pdfFile}
				Download PDF
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
