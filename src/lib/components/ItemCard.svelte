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

<a
	class="card hover:bg-secondary-20 my-5 flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xl hover:shadow-xl/20"
	href="/{kind}/{item.id}"
>
	<div class="">
		<div id="itemHeadline" class="headLineLink">
			<span class="headLineElement">{item.data.title}</span>
		</div>
		<div id="cardContent" class="justify-between py-4 md:flex md:gap-5">
			<div class="mb-5 h-52 w-full overflow-hidden rounded-2xl md:aspect-[3/2] md:w-auto">
				<img class="h-full w-full object-cover" src={item.data.image} alt={item.data.imageAlt} loading="lazy" />
			</div>
			<div id="cardText" class="text-md w-full md:w-[60%]">
				<div class="mb-8">
					{decodeHtml(item.data.slug)}
				</div>
			</div>
		</div>
		<div id="cardFooter" class="flex min-h-5 flex-row justify-between">
			<div class="text-primary-60 font-medium">{item.data.author}</div>
			<div class="text-primary-60 font-medium md:justify-self-center">
				{kind === 'news' ? item.data.publishdate : item.data.startdate}
			</div>
		</div>
	</div>
</a>

<style>
</style>
