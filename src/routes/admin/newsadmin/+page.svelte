<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { pathName } from '$lib/stores/NavigationStore';
	import { resetNewsStore } from '$lib/stores/FormStore';
	import { goto } from '$app/navigation';
	import { doc, deleteDoc, getDocs } from 'firebase/firestore';
	import { newsColRef } from '$lib/firebase/firebaseConfig';
	import { makeDate, makeTimestamp } from '$lib/utils/dateUtils';

	import {
		Checkbox,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Search,
		Button
	} from 'flowbite-svelte';

	export let data;
	let news = data.news;
	console.log(news);

	onMount(() => {
		$pathName = $page.url.pathname;
	});

	const handleSearchInput = (news) => {
		console.log(news.target.value);
	};

	const handleCreateNew = async () => {
		await resetNewsStore();
		goto('/admin/newsadmin/create');
	};

	const handleDelete = async (id) => {
		await deleteDoc(doc(newsColRef, id));
		news = news.filter((item) => item.id !== id);
	};
</script>

<div>
	<h1>News</h1>
	<div class="mb-6 grid grid-cols-12 gap-20">
		<div class="col-span-9"><Search on:input={handleSearchInput} /></div>
		<div class="col-span-3 justify-self-end">
			<Button on:click={handleCreateNew}>Create News</Button>
		</div>
	</div>

	<Table hoverable={true}>
		<TableHead>
			<TableHeadCell class="!p-4" hidden>
				<Checkbox />
			</TableHeadCell>
			<TableHeadCell>Title</TableHeadCell>
			<TableHeadCell>Description</TableHeadCell>
			<TableHeadCell>Publish Date</TableHeadCell>
			<TableHeadCell>Unpublish Date</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each news as item}
				<TableBodyRow>
					<TableBodyCell class="!p-4" hidden>
						<Checkbox />
					</TableBodyCell>
					<TableBodyCell>{item.data.title}</TableBodyCell>
					<TableBodyCell>{item.data.slug}</TableBodyCell>
					<TableBodyCell>{item.data.publishdate}</TableBodyCell>
					<TableBodyCell>{item.data.unpublishdate}</TableBodyCell>
					<TableBodyCell>
						<a
							href="/admin/newsadmin/{item.id}"
							class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a
						>
						|
						<button
							class="font-medium text-primary-600 hover:underline dark:text-primary-500"
							on:click={() => handleDelete(item.id)}>Delete</button
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

<style>
</style>
