<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	import { doc, getDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';

	import Icon from '@iconify/svelte';

	import MarkdownViewer from '$lib/components/MarkdownViewer.svelte';

	let thisNews = $state({});
	let loading = $state(true); // Initialize loading state

	onMount(async () => {
		const newsId = page.params.newsId;
		try {
			const docRef = doc(database, 'news', newsId);
			const docSnapshot = await getDoc(docRef);
			if (docSnapshot.exists()) {
				thisNews = docSnapshot.data();
			} else {
				console.error('Could not load news document!');
			}
		} catch (err) {
			console.error('Error while loading news:', err);
		}
		loading = false;
	});
</script>

{#if loading}
	Loading...
{:else if thisNews}
	<div class="article-container">
		<div id="article-content">
			<div class="article-title">
				{thisNews.title}
			</div>
			{#if thisNews.subtitle}
				<div class="article-subtitle">
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
						<Icon name="tags" />
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
			<MarkdownViewer content={thisNews.text} />
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
