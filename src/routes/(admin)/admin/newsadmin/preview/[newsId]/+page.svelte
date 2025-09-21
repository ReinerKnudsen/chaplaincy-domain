<script lang="ts">
	import { type News, CurrentNewsItemsStore } from '$lib/stores/ObjectStore';
	import NewsItem from '$lib/components/NewsItem.svelte';
	import Icon from '@iconify/svelte';
	import StateLabel from '$lib/components/StateLabel.svelte';

	interface Props {
		data: { newsItem: News; newsId: string };
	}

	let { data }: Props = $props();
	console.log(data);

	let thisNews: News = $derived(data.newsItem);
	let loading = $state(false); // Initialize loading state
</script>

{#if thisNews}
	<div class="border-6 border-amber-200">
		<div class="flex flex-row items-center justify-between px-6 py-6">
			<StateLabel state={thisNews.state} class="mx-10 h-10 w-30" />
			<h1 class=" text-amber-200">News Preview</h1>
		</div>
		<div class="pt-30">
			<NewsItem {thisNews} />
		</div>
	</div>
	<div id="links" class="flex flex-row items-center justify-between">
		<div class="back-link">
			<Icon icon="fa6-regular:circle-left" class="h-6 w-6" />
			<a class="link" href="/admin/newsadmin">Take me back to overview</a>
		</div>
	</div>
{:else}
	<p>News article not found</p>
{/if}

<style>
</style>
