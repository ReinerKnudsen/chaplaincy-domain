<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
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
		Button,
		Modal
	} from 'flowbite-svelte';

	export let data;
	let news = data.news;
	let showModal = false;
	let deleteID = '';

	onMount(() => {
		$pathName = $page.url.pathname;
	});

	// Sort table items
	const sortKey = writable('title'); // default sort key
	const sortDirection = writable(1); // default sort direction (ascending)
	const sortItems = writable(news.slice()); // make a copy of the news array

	// Define a function to sort the items
	const sortTable = (key) => {
		// If the same key is clicked, reverse the sort direction
		if ($sortKey === key) {
			sortDirection.update((val) => -val);
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

	$: {
		const key = $sortKey;
		const direction = $sortDirection;
		const sorted = [...$sortItems].sort((a, b) => {
			// since the data sits deeper in the news object we must dig deeper here
			const aVal = a.data[key];
			const bVal = b.data[key];
			if (aVal < bVal) {
				return -direction;
			} else if (aVal > bVal) {
				return direction;
			}
			return 0;
		});
		sortItems.set(sorted);
	}

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

	const openModal = (id) => {
		deleteID = id;
		showModal = true;
	};
</script>

<Modal bind:open={showModal} size="md" autoclose>
	<div class="text-center">
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Do you really want to delete this item?
		</h3>
		<Button color="alternative">Cancel</Button>
		<Button color="red" class="me-2" on:click={() => handleDelete()}>Delete</Button>
	</div>
</Modal>

<div>
	<h1>News</h1>
	<div class="mb-6 grid grid-cols-12 gap-2 lg:gap-20">
		<div class="col-span-9">
			<input
				class="w-full rounded-lg"
				placeholder="Search (not yet active)"
				type="text"
				on:input={handleSearchInput}
			/>
		</div>
		<div class="col-span-3 justify-self-end">
			<Button
				on:click={handleCreateNew}
				class="bg-primary-100 text-lg font-semibold text-white-primary">Create News</Button
			>
		</div>
	</div>

	<Table hoverable={true}>
		<TableHead>
			<TableHeadCell class="cursor-pointer" on:click={() => sortTable('title')}>Title</TableHeadCell
			>
			<TableHeadCell>Description</TableHeadCell>
			<TableHeadCell
				class="
				cursor-pointer"
				on:click={() => sortTable('publishdate')}>Publish Date</TableHeadCell
			>
			<TableHeadCell
				class="
				cursor-pointer"
				on:click={() => sortTable('author')}>Author</TableHeadCell
			>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $sortItems as item}
				<TableBodyRow class="align-top">
					<TableBodyCell class="font-normal">{item.data.title}</TableBodyCell>
					<TableBodyCell class="text-wrap font-normal">{item.data.slug}</TableBodyCell>
					<TableBodyCell class="font-normal">{item.data.publishdate}</TableBodyCell>
					<TableBodyCell class="font-normal">{item.data.author}</TableBodyCell>
					<TableBodyCell>
						<a
							href="/admin/newsadmin/{item.id}"
							class="text-primary-600 dark:text-primary-500 font-medium hover:underline">Edit</a
						>
						|
						<button
							class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
							on:click={() => openModal(item.id)}>Delete</button
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

<style>
</style>
