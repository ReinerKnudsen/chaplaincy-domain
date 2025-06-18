<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';


	import Icon from '@iconify/svelte';

	import * as formats from '$lib/formats';

	import MarkdownViewer from '$lib/components/MarkdownViewer.svelte';

	let thisItem = $state({});
	let loading = $state(true); // Initialize loading state

	onMount(async () => {
		const newsId = page.params.newsId;
		try {
			const docRef = doc(database, 'news', newsId);
			const docSnapshot = await getDoc(docRef);
			if (docSnapshot.exists()) {
				thisItem = docSnapshot.data();
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
{:else}
	<div class="rounded-2xl bg-white-primary">
		<div class={`container ${formats.container}`}>
			<div class={`headline ${formats.headline}`}>
				{thisItem.title}
			</div>
			<div class={`news-data ${formats.itemMetaData}`}>
				<div class={`entry ${formats.itemMetaDataEntry}`}>
					<Icon icon="fa6-regular:calendar" />
					{thisItem.publishdate}
				</div>
				<div class={`entry ${formats.itemMetaDataEntry}`}>
					<Icon icon="fa6-solid:at" />
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
						<Icon icon="fa-solid:camera-retro" />
						{thisItem.imageCaption}
					</div>
				{/if}
			</div>
			<div class={`news-image ${formats.itemImageContainer}`}>
				<img class={formats.itemImage} src={thisItem.image} alt={thisItem.title} />
			</div>
			<MarkdownViewer content={thisItem.text} />
		</div>
	</div>
	<div class={`back-link ${formats.backLink}`}>
		<Icon icon="fa6-regular:circle-left" class="w-6 h-6"/>
		<a class={formats.aLink} href="/news">Take me back to overview</a>
	</div>
{/if}

<style>
</style>
