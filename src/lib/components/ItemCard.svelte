<script lang="ts">
	import { type CollectionItem } from '$lib/stores/ObjectStore';
	import { decodeHtml } from '$lib/utils/HTMLfunctions';
	import Icon from '@iconify/svelte';

	interface Props {
		item: CollectionItem;
		kind: 'news' | 'events';
	}

	let { item, kind }: Props = $props();

	const itemCardContainer = '';

</script>

<div class="flex flex-col my-5 rounded-2xl border border-slate-200 p-6 shadow-xl bg-white ">
	<div id="itemHeadline" class="">
		<a class="headLineLink" href="/{kind}/{item.id}">
		<span class="headLineElement">{item.data.title}</span>
		<Icon class="headLineElement" icon="famicons:open-outline" />
		</a>
	</div>
	<div id="cardContent" class="justify-between py-4 md:flex md:gap-5">
		<div class="mb-5 w-full md:max-w-[40%] aspect-[3/2] overflow-hidden rounded-2xl">
			<img 
				class="w-full h-full object-cover" 
				src={item.data.image} 
				alt={item.data.imageAlt} 
				loading="lazy"
			/>
		</div>
		<div id="cardText" class="text-md w-full md:w-[60%]">
			<div class="mb-8">
				{decodeHtml(item.data.slug)}
			</div>
		</div>
	</div>
	<div id="cardFooter" class="flex flex-row justify-between min-h-5">
		<div class="font-medium text-primary-60">{item.data.author}</div>
		<div class="font-medium text-primary-60 md:justify-self-center">
			{kind === 'news' ? item.data.publishdate : item.data.startdate}
		</div>
	</div>
</div>

<style>

</style>
