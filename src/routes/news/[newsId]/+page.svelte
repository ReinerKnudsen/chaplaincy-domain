<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getDoc, doc } from 'firebase/firestore';

	import { database } from '$lib/firebase/firebaseConfig.js';
	import { docRef, NewsStore } from '$lib/stores/FormStore';

	const newsID = $page.params.newsId;
	docRef.set(doc(database, 'news', newsID));
	const fetchNewsData = async () => {
		try {
			getDoc($docRef).then((docSnapshot) => {
				if (docSnapshot.exists()) {
					NewsStore.set(docSnapshot.data()); // Populate eventData with document data
				} else {
					console.log('No such document!');
				}
			});
		} catch (error) {
			console.error('Error fetching document:', error);
		}
	};

	onMount(() => {
		fetchNewsData();
	});
</script>

<div class="mr-36">
	<div class="grid grid-cols-5">
		<div class="Article col-span-4">
			<div class="h-52 w-full bg-slate-300">Ich bin ein Bild</div>
			<div class="ArticleDetails mr-10">
				<div class=" my-4 text-4xl font-bold">{$NewsStore.title}</div>
				<div class="mb-4 text-right text-slate-500">
					<div>{$NewsStore.author}</div>
					<div>{$NewsStore.publishdate}</div>
				</div>
				<div class="ArticleText">{$NewsStore.text}</div>
				<div class="my-10 text-right text-blue-600"><a href="/news">back to news page</a></div>
			</div>
		</div>

		<div class="Sidebar bg-slate-100">
			<h2 class="text-center text-xl font-semibold">Sidebar</h2>
		</div>
	</div>
</div>

<style>
</style>
