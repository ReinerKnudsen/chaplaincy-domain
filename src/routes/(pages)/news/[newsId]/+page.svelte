<script>
	import { formatDate } from '/src/utils/utils';
	import Icon from '$lib/components/Icon.svelte';

	export let data;
	const thisItem = data.thisItem;

	/*
	
	*/
</script>

<div class="container mb-10">
	<div class="headline my-5 text-xl font-semibold md:text-3xl xl:text-4xl">
		{thisItem.title}
	</div>
	<div class="news-data mb-5 grid gap-1 text-sm md:flex md:gap-8 md:text-lg">
		<div class="entry flex items-center gap-2">
			<Icon name="calendar" />
			{thisItem.publishdate}
		</div>
		<div class="entry flex items-center gap-2">
			<Icon name="author" />
			{thisItem.author}
		</div>
		<div class="entry flex items-center gap-3">
			<Icon name="tags" />
			{thisItem.tags}
		</div>
	</div>
	<div class="news-image mb-5 w-full overflow-hidden rounded-xl md:mb-10">
		<img class="object-cover" src={thisItem.image} alt={thisItem.title} />
	</div>
	<div class="news-description mb-10 text-lg md:text-xl md:leading-8 lg:text-2xl lg:leading-10">
		{thisItem.text}
	</div>
</div>
<div class="links my-5 flex items-center gap-5">
	<Icon name="left" />
	<a class="font-semibold text-link-primary" href="/news">Take me back to overview</a>
</div>

<style>
</style>
