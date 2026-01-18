<script lang="ts">
	import { onMount } from 'svelte';
	import { AllLocations, fetchLocations, type Location } from '$lib/stores/LocationsStore';
	import { type CollectionItem } from '$lib/stores/ObjectStore';
	import { decodeHtml } from '$lib/utils/HTMLfunctions';
	import Icon from '@iconify/svelte';

	interface Props {
		item: CollectionItem;
		kind: 'news' | 'events';
	}

	let { item, kind }: Props = $props();
	let location: Location | undefined = $state();
	let locationsLoaded = $state(false);

	onMount(async () => {
		if (!$AllLocations || $AllLocations.length === 0) {
			await fetchLocations();
		}
		locationsLoaded = true;
	});

	console.log($AllLocations);
	console.log(item.data.location);

	$effect(() => {
		if (locationsLoaded && item.data?.location) {
			location = $AllLocations.find((loc) => loc.id === item.data.location);
		}
	});

	const itemCardContainer = '';
</script>

<a
	class="card hover:bg-secondary-20 my-5 flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xl hover:shadow-xl/20"
	href="/{kind}/{item.id}"
>
	<div class="">
		<div id="itemHeadline" class="headLineLink">
			<span class="headLineElement">{item.data.title}</span>
		</div>
		{#if kind === 'events'}
			<div class="flex flex-row justify-start items-center gap-8 pb-4">
				<div class="flex flex-row items-center justify-start gap-2">
					<Icon icon="mdi:calendar-blank-outline" class="h-4 w-4" />
					{item.data.startdate}
				</div>
				<div class="flex flex-row items-center justify-start gap-2">
					<Icon icon="fa6-regular:clock" class="h-4 w-4" />
					{item.data.starttime}
				</div>
				<div>
					<div class="flex flex-row items-center justify-start gap-2">
						<Icon icon="gis:location-poi" class="h-4 w-4" />
						<span>{[location?.name, location?.city].filter(Boolean).join(', ')}</span>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex flex-row justify-start items-center gap-8 pb-4">
				<div class="flex flex-row items-center justify-start gap-2">
					<Icon icon="fa6-regular:calendar" />
					{item.data.publishdate}
				</div>
				<div class="flex flex-row items-center justify-start gap-2">
					<Icon icon="fa6-solid:at" />
					{item.data.author}
				</div>
			</div>
		{/if}

		<div id="cardContent" class="justify-between py-4 md:flex md:gap-6 items-center">
			<div class="mb-5 h-52 w-full overflow-hidden rounded-2xl md:aspect-[3/2] md:w-auto">
				<img class="h-full w-full object-cover" src={item.data.image} alt={item.data.imageAlt} loading="lazy" />
			</div>
			<div id="cardText" class="text-md w-full md:w-[60%]">
				<div class="mb-8">
					{decodeHtml(item.data.slug)}
				</div>
			</div>
		</div>
	</div>
</a>

<style>
</style>
