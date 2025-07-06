<script lang="ts">
	import { type CollectionItem } from '$lib/stores/ObjectStore';

	import Icon from '@iconify/svelte';

	interface Props {
		item: CollectionItem;
		kind: string;
	}

	let { item, kind }: Props = $props();
</script>

<div class="favItemContainer">
	<div id="image-container">
		<img
			class="max-h-[200px] items-stretch rounded-xl lg:max-h-[400px]"
			src={item.data.image}
			alt={item.data.imageAlt}
		/>
	</div>
	<div id="text-container" class="flex w-full flex-col justify-between gap-2 rounded-2xl bg-white">
		<div id="headline">
			<a class="headLineLink" href="/{kind}/{item.id}"
				><span class="headLineElement">{item.data.title}</span>
				<Icon class="headLineElement h-6 w-6" icon="famicons:open-outline" /></a
			>
		</div>
		<div id="news-text" class="flex-1 text-left text-sm sm:pr-8 sm:text-lg">{item.data.slug}</div>
		<div id="cardFooter" class="flex min-h-5 flex-row justify-between">
			<div>{item.data.author}</div>
			<div>{item.data.publishdate}</div>
		</div>
	</div>
</div>

<style>
	.favItemContainer {
		margin-bottom: 40px;
		display: flex;
		flex-direction: row;
		justify-content: space-start;
		align-items: stretch;
		gap: 60px;
		border-radius: 20px;
		background-color: white-smoke;
		padding: 40px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
</style>
