<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { pathName } from '$lib/stores/NavigationStore';

	import { goto } from '$app/navigation';
	import { doc, deleteDoc, type DocumentData } from 'firebase/firestore';
	import { newsColRef } from '$lib/firebase/firebaseConfig';

	import { Button, Modal } from 'flowbite-svelte';
	import {
		resetNewsStore,
		EditMode,
		CollectionType,
		loadItems,
		NewsItemsStore,
		type News,
		type NewsSortableFields,
		NewsStore,
	} from '$lib/stores/ObjectStore';

	const loadData = async () => {
		await loadItems(CollectionType.News);
	};

	let showModal = false;
	let deleteID: string = '';
	let loading = true;

	onMount(async () => {
		$pathName = $page.url.pathname;
		await loadData();
		loading = false;
	});

	// Sort table items
	const sortKey = writable<NewsSortableFields>('title');
	const sortDirection = writable<1 | -1>(1);
	$: sortItems = writable($NewsItemsStore.slice());

	const sortTable = (key: NewsSortableFields) => {
		if ($sortKey === key) {
			sortDirection.update((val) => (val === 1 ? -1 : 1));
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

	$: {
		const key = $sortKey;
		const direction = $sortDirection;
		const sorted = [...$sortItems].sort((a, b) => {
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

	const handleSearchInput = (event: Event) => {
		//console.log(event.target.value);
	};

	const handleCreateNew = () => {
		resetNewsStore();
		EditMode.set('new');
		goto('/admin/newsadmin/create');
	};

	const handleOpenItem = (id: string) => {
		const selectedNews = $NewsItemsStore.find((item) => item.id === id);
		if (!selectedNews) {
			return;
		}
		NewsStore.set(selectedNews.data as News);
		EditMode.set('update');
		goto('/admin/newsadmin/' + id);
	};

	const handleDelete = async () => {
		showModal = false;
		await deleteDoc(doc(newsColRef, deleteID));
		await loadData();
	};

	const openModal = (id: string) => {
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
	{#if loading}
		<div class="w-full">Loading...</div>
	{:else}
		<div class="w-full">
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
							<td
								><button class="underline" on:click={() => handleOpenItem(item.id)}
									>{item.data.title}</button
								></td
							>
							<td>{item.data.text}</td>
							<td>{item.data.publishdate}</td>
							<td>{item.data.author}</td>
							<td>
								<div class="flex justify-between">
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
	{/if}
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
