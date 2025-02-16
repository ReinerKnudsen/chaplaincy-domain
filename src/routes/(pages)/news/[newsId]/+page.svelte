<script>
	import { marked } from 'marked';
	import Icon from '$lib/components/Icon.svelte';
	import * as formats from '../../formats.js';

	export let data;
	const thisItem = data.thisItem;
	thisItem.text = marked.parse(thisItem.text); //.replace(/\n/g, '<br />');
</script>

<div class="rounded-2xl bg-white-primary">
	<div class={`container ${formats.container}`}>
		<div class={`headline ${formats.headline}`}>
			{thisItem.title}
		</div>
		<div class={`news-data ${formats.itemMetaData}`}>
			<div class={`entry ${formats.itemMetaDataEntry}`}>
				<Icon name="calendar" />
				{thisItem.publishdate}
			</div>
			<div class={`entry ${formats.itemMetaDataEntry}`}>
				<Icon name="author" />
				{thisItem.author}
			</div>
			{#if thisItem.tags}
				<div class={`entry ${formats.itemMetaDataEntry}`}>
					<Icon name="tags" />
					{thisItem.tags}
				</div>
			{/if}
			{#if thisItem.imageCaption}
				<div class={`entry ${formats.itemMetaDataEntry}`}>
					<Icon name="camera" />
					{thisItem.imageCaption}
				</div>
			{/if}
		</div>
		<div class={`news-image ${formats.itemImageContainer}`}>
			<img class={formats.itemImage} src={thisItem.image} alt={thisItem.title} />
		</div>
		<div class={`news-description ${formats.itemDescription}`}>
			{@html thisItem.text}
		</div>
	</div>
</div>
<div class={`back-link ${formats.backLink}`}>
	<Icon name="left" />
	<a class={formats.aLink} href="/news">Take me back to overview</a>
</div>

<style>
</style>
