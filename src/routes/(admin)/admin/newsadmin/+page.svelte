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
	<div class="rounded-xl bg-white-primary p-10 text-center">
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Deleting an item can not be undone.
			<p><strong>Do you really want to delete this item?</strong></p>
		</h3>
		<div class="flex justify-between px-36">
			<Button color="alternative">Cancel</Button>
			<Button color="red" class=" me-2 text-white-primary" on:click={() => handleDelete()}
				>Delete</Button
			>
		</div>
	</div>
</Modal>

<div>
	<h1>News</h1>
	<div class="mb-6 grid grid-cols-12 items-center gap-2 lg:gap-20">
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

	<div class="w-full overflow-scroll">
		<table>
			<thead>
				<tr>
					<th on:click={() => sortTable('title')}>Title</th>
					<th on:click={() => sortTable('text')}>News Text</th>
					<th on:click={() => sortTable('publishdate')}>Publish date</th>
					<th on:click={() => sortTable('author')}>Author</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
				{#each $sortItems as item}
					<tr>
						<td>{item.data.title}</td>
						<td>{item.data.text}</td>
						<td>{item.data.publishdate}</td>
						<td>{item.data.author}</td>
						<td>
							<div class="flex justify-between">
								<button
									class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
									on:click={() => goto('/admin/newsadmin/' + item.id)}>Edit</button
								>
								|
								<button
									class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
									on:click={() => openModal(item.id)}>Delete</button
								>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	table {
		display: grid;
		border-collapse: collapse;
		min-width: 100%;
		grid-template-columns:
			minmax(150px, 3fr)
			minmax(150px, 4fr)
			minmax(130px, 1fr)
			minmax(150px, 1fr)
			minmax(100px, 1fr);
	}
	thead,
	tbody,
	tr {
		display: contents;
	}

	th {
		cursor: pointer;
		background-color: white;
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-align: left;
		padding-top: 0.8rem;
		padding-bottom: 0.8rem;
		padding-left: 0.5rem;
	}
	th,
	td {
		font-size: 0.875rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		@apply text-slate-600;
	}

	td {
		padding-top: 1.2rem;
		padding-bottom: 1.2rem;
		padding-left: 0.5rem;
		@apply border-b border-slate-300;
	}
</style>
