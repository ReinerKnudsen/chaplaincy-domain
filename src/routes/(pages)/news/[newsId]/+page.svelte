<script>
	import { formatDate } from '/src/utils/utils';
	import Icon from '$lib/components/Icon.svelte';
	import * as formats from '../../formats.js';

	export let data;
	const thisItem = data.thisItem;

	/*
	
	*/
</script>

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
		<div class={`entry ${formats.itemMetaDataEntry}`}>
			<Icon name="tags" />
			{thisItem.tags}
		</div>
	</div>
	<div class={`news-image ${formats.itemImageContainer}`}>
		<img class={formats.itemImage} src={thisItem.image} alt={thisItem.title} />
	</div>
	<div class={`news-description ${formats.itemDescription}`}>
		{thisItem.text}
	</div>
</div>
<div class={`back-link ${formats.backLink}`}>
	<Icon name="left" />
	<a class={formats.aLink} href="/news">Take me back to overview</a>
</div>

<style>
</style>
