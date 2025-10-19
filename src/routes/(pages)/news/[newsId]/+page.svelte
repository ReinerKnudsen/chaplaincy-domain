<script lang="ts">
	import Icon from '@iconify/svelte';
	import { type News, CurrentNewsItemsStore } from '$lib/stores/ObjectStore';
	import SimpleMarkdownViewer from '$lib/components/SimpleMarkdownViewer.svelte';
	import NavigationButton from '$lib/components/NavigationButton.svelte';
	import NewsItem from '$lib/components/NewsItem.svelte';
	interface Props {
		data: { news: News; newsId: string };
	}

	let { data }: Props = $props();

	let thisNews: News = $derived(data.news);
	let thisIndex = $derived($CurrentNewsItemsStore.findIndex((news) => news.id === data.newsId));
	let nextItem = $derived(
		thisIndex === $CurrentNewsItemsStore.length - 1 ? undefined : $CurrentNewsItemsStore[thisIndex + 1]
	);
	let prevItem = $derived(thisIndex === 0 ? undefined : $CurrentNewsItemsStore[thisIndex - 1]);
	let loading = $state(false); // Initialize loading state
</script>

{#if loading}
	Loading...
{:else if thisNews}
	<div class="pt-30">
		<NewsItem {thisNews} />
	</div>

	<div id="links" class="flex flex-row items-center justify-between">
		<div class="back-link">
			<Icon icon="fa6-regular:circle-left" class="h-6 w-6" />
			<a class="link" href="/news">Take me back to overview</a>
		</div>
		<div id="navigation-buttons" class="flex flex-row gap-8">
			{#if prevItem}
				<NavigationButton id={prevItem.id} type="news" direction="prev" />
			{/if}
			{#if nextItem}
				<NavigationButton id={nextItem.id} type="news" direction="next" />
			{/if}
		</div>
	</div>
{:else}
	<p>News article not found</p>
{/if}

<style>
</style>
