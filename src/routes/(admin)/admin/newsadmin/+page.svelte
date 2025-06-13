<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { pathName } from '$lib/stores/NavigationStore';

	import { goto } from '$app/navigation';
	import { doc, deleteDoc, type DocumentData } from 'firebase/firestore';
	import { newsColRef } from '$lib/firebase/firebaseConfig';

	import { decodeHtml } from '$lib/services/HTMLfunctions';

	import {
		resetNewsStore,
		EditMode,
		EditModeStore,
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

	let deleteDialog: HTMLDialogElement;
	let deleteID: string = '';
	let loading = true;

	onMount(async () => {
		$pathName = $page.url.pathname;
		await loadData();
		loading = false;
	});

	// Sort table items
	const STORAGE_KEY = 'news_sort';

	const getStoredSortSettings = () => {
		if (typeof window === 'undefined') return { key: 'title', direction: 1 };

		const stored = sessionStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch (e) {
				console.error('Failed to parse sort settings:', e);
				return { key: 'title', direction: 1 };
			}
		}
		return { key: 'title', direction: 1 };
	};

	const { key: initialKey, direction: initialDirection } = getStoredSortSettings();
	const sortKey: Writable<NewsSortableFields> = writable(initialKey);
	const sortDirection: Writable<1 | -1> = writable(initialDirection as 1 | -1);
	const sortItems: Writable<typeof $NewsItemsStore> = writable($NewsItemsStore.slice());

	// Update sessionStorage when sort settings change
	$: {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ key: $sortKey, direction: $sortDirection }),
			);
		}
	}

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
		EditModeStore.set(EditMode.New);
		goto('/admin/newsadmin/create');
	};

	const handleOpenItem = (id: string) => {
		const selectedNews = $NewsItemsStore.find((item) => item.id === id);
		if (!selectedNews) {
			return;
		}
		NewsStore.set(selectedNews.data as News);
		EditModeStore.set(EditMode.Update);
		goto('/admin/newsadmin/' + id);
	};

	const handleDelete = async () => {
		await deleteDoc(doc(newsColRef, deleteID));
		await loadData();
	};

	const openModal = (id: string) => {
		deleteID = id;
		deleteDialog?.showModal();
	};
</script>

<dialog bind:this={deleteDialog} class="modal">
	<div class="modal-box">
		<h3 class="py-4">Confirm Delete</h3>
		<hr class="py-2" />
		<p class="py-4">
			Deleting an item can not be undone.
			<br /><strong>Do you really want to delete this item?</strong>
		</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-default mr-2">Cancel</button>
				<button class="btn btn-error" on:click|preventDefault={() => handleDelete()}>Delete</button>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>Cancel</button>
	</form>
</dialog>

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
		<div class="col-span-3 justify-self-end py-2">
			<button on:click={handleCreateNew} class="btn btn-primary btn-lg">Create News</button>
		</div>
	</div>

	{#if loading}
		<div class="w-full">Loading...</div>
	{:else}
		<div class="w-full">
			<table class="admin-table">
				<thead class="table-row">
					<tr class="table-row">
						<th class="table-header table-cell" on:click={() => sortTable('title')}>Title</th>
						<th class="table-header table-cell" on:click={() => sortTable('text')}>News Text</th>
						<th class="table-header table-cell" on:click={() => sortTable('publishdate')}
							>Publish date</th
						>
						<th class="table-header table-cell" on:click={() => sortTable('author')}>Author</th>
						<th class="table-header table-cell">Actions</th>
					</tr>
				</thead>
				<tbody class="table-row">
					{#each $sortItems as item}
						<tr class="table-row">
							<td class="table-data table-cell">
								<button class="btn btn-link px-0" on:click={() => handleOpenItem(item.id)}
									>{item.data.title}</button
								>
							</td>
							<td class="table-data table-cell">{decodeHtml(item.data.text)}</td>
							<td class="table-data table-cell">{item.data.publishdate}</td>
							<td class="table-data table-cell">{item.data.author}</td>
							<td class="table-data table-cell">
								<div class="flex flex-row justify-between">
									<button class="btn-sm btn-custom-delete" on:click={() => openModal(item.id)}
										>Delete</button
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
	.admin-table {
		display: grid;
		border-collapse: collapse;
		min-width: 100%;
		grid-template-columns:
			minmax(150px, 2.5fr) minmax(130px, 2.5fr) minmax(130px, 1fr) minmax(150px, 1fr)
			minmax(150px, 1fr);
	}

	.table-row {
		display: contents;
	}

	.table-header {
		background-color: white;
		cursor: pointer;
		padding: 0.75rem 0.5rem;
		text-align: left;
		font-size: 0.875rem;
		font-weight: 600;
		color: rgb(17 24 39);
		text-transform: uppercase;
	}

	.table-cell {
		font-size: 0.875rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: rgb(71 85 105);
	}

	.table-data {
		padding: 1.25rem 0.5rem;
		border-bottom: 1px solid rgb(203 213 225);
		align-content: center;
	}
</style>
