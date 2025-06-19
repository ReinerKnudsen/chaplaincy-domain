<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import Icon from '@iconify/svelte';

	import * as formats from '$lib/formats';

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
	<div class="bg-white-primary rounded-2xl">
		<div class={`container ${formats.container}`}>
			<div class={`headline ${formats.headline}`}>
				{$EventStore.title}
			</div>
			<div class={`event-data ${formats.itemMetaData}`}>
				<div class={`entry ${formats.itemMetaDataEntry}`}>
					<Icon icon="fa6-regular:calendar" />
					{$EventStore.startdate}
				</div>
				<div class={`entry ${formats.itemMetaDataEntry}`}>
					<Icon icon="fa6-regular:clock" />
					{$EventStore.starttime}
				</div>
				{#if $EventStore.location}
					<div class={`entry ${formats.itemMetaDataEntry}`}>
						<Icon icon="gis:location-poi" />
						<a class="link" target="_blank" href={location?.openMapUrl}
							>{`${location?.name}, ${location?.city}`}</a
						>
					</div>
				{/if}
			</div>
			{#if $EventStore.image}
				<div class={`event-image ${formats.itemImageContainer}`}>
					<img class={formats.itemImage} src={$EventStore.image} alt={$EventStore.title} />
				</div>
			{/if}
			{#if description}
				<MarkdownViewer content={description} />
			{/if}
		</div>
	</div>
	<div class={`back-link ${formats.backLink}`}>
		<Icon icon="fa6-regular:circle-left" class="h-6 w-6" />
		<a class={formats.aLink} href="/events">Take me back to overview</a>
	</div>
{:else}
	<p>Event not found</p>
{/if}

<style>
</style>
