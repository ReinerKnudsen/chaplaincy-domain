<script>
	import { page } from '$app/stores';
	import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';
	import { marked } from 'marked';
	import Icon from '$lib/components/Icon.svelte';
	import * as formats from '$lib/formats';
	import { onMount } from 'svelte';

	let thisItem = {};
	let loading = true; // Initialize loading state

	onMount(async () => {
		const newsId = $page.params.newsId;
		try {
			const docRef = doc(database, 'news', newsId);
			const docSnapshot = await getDoc(docRef);
			if (docSnapshot.exists()) {
				thisItem = docSnapshot.data();
			} else {
				console.log('Could not load news document!');
			}
		} catch (err) {
			console.log('Error while loading news:', err);
		}
		loading = false;
	});

	$: if (thisItem.text) {
		thisItem.text = marked.parse(thisItem.text);
	} //.replace(/\n/g, '<br />');
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
{/if}

<style>
</style>
