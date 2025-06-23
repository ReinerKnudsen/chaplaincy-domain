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
			class="rounded-xl max-h-[200px] lg:max-h-[400px] items-stretch"
			src={item.data.image}
			alt={item.data.imageAlt}
		/>
	</div>
	<div id="text-container"class="mr-auto flex flex-col justify-between gap-2 rounded-2xl bg-white px-6">
		<div id="headline" >
			<a
				class="headLineLink text-2xl"
				href="/{kind}/{item.id}"
				><span class="headLineElement">{item.data.title}</span>
				<Icon class="headLineElement h-6 w-6" icon="famicons:open-outline" /></a
			>
		</div>
		<div id="news-text" class="flex-1 text-left text-sm sm:text-lg sm:pr-8">{item.data.slug}</div>
			<div id="cardFooter" class="flex flex-row justify-between min-h-5">
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
		justify-content: space-between;	
		align-items: stretch;
		gap: 20px;
		border-radius: 20px;
		background-color: white-smoke;
		padding: 40px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
</style>
