<script lang="ts">
	import { type CollectionItem } from '$lib/stores/ObjectStore';
	import { decodeHtml } from '$lib/utils/HTMLfunctions';
	import Icon from '@iconify/svelte';
	import { findLocationById } from '$lib/stores/LocationsStore';

	interface Props {
		item: CollectionItem;
		kind: 'news' | 'events';
	}

	let { item, kind }: Props = $props();

	const getLocation = (id: string) => {
		const location = findLocationById(id);
		return location ? location.name : 'nix da';
	};

	const itemCardContainer = '';
</script>

<div class="my-5 flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
	<div id="itemHeadline" class="">
		<a class="headLineLink" href="/{kind}/{item.id}">
			<span class="headLineElement">{item.data.title}</span>
			<Icon class="headLineElement" icon="famicons:open-outline" />
		</a>
	</div>
	<div id="cardContent" class="justify-between py-4 md:flex md:gap-5">
		<div class="mb-5 aspect-[3/2] w-full overflow-hidden rounded-2xl md:max-w-[40%]">
			<img class="h-full w-full object-cover" src={item.data.image} alt={item.data.imageAlt} loading="lazy" />
		</div>
		<div id="cardText" class="text-md w-full md:w-[60%]">
			<div class="mb-8">
				{decodeHtml(item.data.slug)}
			</div>
		</div>
	</div>
	{#if kind === 'news'}
		<div id="cardFooter" class="flex min-h-5 flex-row justify-between">
			<div class="text-primary-60 font-medium">{item.data.author}</div>
			<div class="text-primary-60 font-medium md:justify-self-center">
				{item.data.publishdate}
			</div>
		</div>
	{:else}
		<div id="cardFooter" class="flex min-h-5 flex-row justify-between">
			<div class="text-primary-60 font-medium">{getLocation(item.data.location)}</div>
			<div class="text-primary-60 font-medium md:justify-self-center">
				{item.data.startdate}
			</div>
		</div>
	{/if}
</div>

<style>
</style>
