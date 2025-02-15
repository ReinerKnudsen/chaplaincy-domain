<script>
	import { marked } from 'marked';
	import Icon from '$lib/components/Icon.svelte';
	import * as formats from '../../formats.js';

	export let data;
	const thisEvent = data.thisEvent;
	const locations = data.locations;

	thisEvent.description = marked.parse(thisEvent.description); //.replace(/\n/g, '<br />');
</script>

<div class={`container ${formats.container}`}>
	<div class={`headline ${formats.headline}`}>
		{thisEvent.title}
	</div>
	<div class={`event-data ${formats.itemMetaData}`}>
		<div class={`entry ${formats.itemMetaDataEntry}`}>
			<Icon name="calendar" />
			{thisEvent.startdate}
		</div>
		<div class={`entry ${formats.itemMetaDataEntry}`}>
			<Icon name="clock" />
			{thisEvent.starttime}
		</div>
		<div class={`entry ${formats.itemMetaDataEntry}`}>
			<!-- Refactor: Add link to location document -->
			<Icon name="location" />
			{locations[thisEvent.location] || thisEvent.location}
		</div>
	</div>
	{#if thisEvent.image}
		<div class={`event-image ${formats.itemImageContainer}`}>
			<img class={formats.itemImage} src={thisEvent.image} alt={thisEvent.title} />
		</div>
	{/if}
	<div class={`event-description ${formats.itemDescription}`}>
		{@html marked.parse(thisEvent.description)}
	</div>
</div>
<div class={`back-link ${formats.backLink}`}>
	<Icon name="left" />
	<a class={formats.aLink} href="/activities">Take me back to overview</a>
</div>
