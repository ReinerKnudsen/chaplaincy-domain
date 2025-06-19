<script lang="ts">
	import { type CollectionItem } from '$lib/stores/ObjectStore';

	import Icon from '@iconify/svelte';

	interface Props {
		item: CollectionItem;
		kind: string;
	}

	let { item, kind }: Props = $props();

	const container =
		'mb-10 grid grid-flow-row gap-5 rounded-2xl border border-slate-200 bg-slate-100 p-10 shadow-xl';
	const containerMd = 'md:mx-auto md:grid-cols-2 ';
	const containerXl = ' ';
	const image = 'rounded-xl max-h-[p-200px]';
	const imageLg = 'lg:max-h-[400px]';
	const imageXl = 'xl:max-h-[400px]';
</script>

<div class={` ${container} ${containerMd} ${containerXl}`}>
	<div class="image-container">
		<img
			class={`image ${image} ${imageLg} ${imageXl}`}
			src={item.data.image}
			alt={item.data.imageAlt}
		/>
	</div>
	<div class="text-area mr-auto flex flex-col justify-between gap-2 rounded-2xl bg-white p-6">
		<div class="headline text-left text-2xl font-semibold">
			<a
				class="text-primary-100 hover:text-primary-40 flex flex-row items-center justify-between pb-0"
				href="/{kind}/{item.id}"
				><div>{item.data.title}</div>
				<Icon class="h-6 w-6" icon="famicons:open-outline" /></a
			>
		</div>
		<div class="news-text min-h-[50%] text-left text-sm sm:text-lg">{item.data.slug}</div>
		<div class="flex flex-col justify-between lg:flex-row">
			<div class="metadata text-sm font-medium md:text-base">
				<span>{item.data.author}, {item.data.publishdate}</span>
			</div>
			<div
				class="read-more text-link-primary mb-10 text-right text-sm font-medium md:text-base xl:mb-0"
			>
				<a class="link no-underline" href="/news/{item.id}">Read more...</a>
			</div>
		</div>
	</div>
</div>

<style>
</style>
