<script lang="ts">
	import Icon from '@iconify/svelte';
	import { type News } from '$lib/stores/ObjectStore';
	import SimpleMarkdownViewer from '$lib/components/SimpleMarkdownViewer.svelte';

	interface Props {
		data: { news: News };
	}

	let { data }: Props = $props();

	let thisNews: News = $state(data.news);
	let loading = $state(false); // Initialize loading state
</script>

{#if loading}
	Loading...
{:else if thisNews}
	<div id="article-container" class="mx-auto w-[80%] pt-30">
		<div id="article-content">
			<div id="article-title" class="article-title">
				{thisNews.title}
			</div>
			{#if thisNews.subtitle}
				<div id="article-subtitle" class="article-subtitle">
					{thisNews.subtitle}
				</div>
			{/if}
			<div class="article-metadata">
				<div class="article-metadata-item">
					<Icon icon="fa6-regular:calendar" />
					{thisNews.publishdate}
				</div>
				<div class="article-metadata-item">
					<Icon icon="fa6-solid:at" />
					{thisNews.author}
				</div>
				{#if thisNews.tags}
					<div class="article-metadata-item">
						<Icon icon="gravity-ui:tag" />
						{thisNews.tags}
					</div>
				{/if}
				{#if thisNews.imageCaption}
					<div class="article-metadata-item">
						<Icon icon="fa-solid:camera-retro" />
						{thisNews.imageCaption}
					</div>
				{/if}
			</div>
			<div id="news-iamge" class="article-image-container">
				<img class="article-image" src={thisNews.image} alt={thisNews.imageAlt} />
			</div>
			<div class="my-8">
				<SimpleMarkdownViewer content={thisNews.text} />
			</div>
		</div>
		<div id="pdfFile">
			{#if thisNews.pdfFile}
				<div id="pdf-download" class="bg-white-smoke flex flex-row justify-start gap-4 p-6">
					<Icon icon="fa6-regular:file-pdf" class="h-6 w-6" />
					<a class="link flex flex-row gap-4 text-lg font-semibold" href={thisNews.pdfFile} target="_blank">
						<div>Download {thisNews.pdfText ? thisNews.pdfText : 'PDF'}</div>
						<Icon icon="famicons:open-outline" class="h-6 w-6" />
					</a>
				</div>
			{/if}
		</div>
	</div>

	<div class="back-link">
		<Icon icon="fa6-regular:circle-left" class="h-6 w-6" />
		<a class="link" href="/news">Take me back to overview</a>
	</div>
{:else}
	<p>News article not found</p>
{/if}

<style>
</style>
