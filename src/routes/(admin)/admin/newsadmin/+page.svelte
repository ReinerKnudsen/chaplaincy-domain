<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import { doc, deleteDoc, type DocumentData } from 'firebase/firestore';
	import { newsColRef } from '$lib/firebase/firebaseConfig';

	import { pathName } from '$lib/stores/NavigationStore';
	import { decodeHtml } from '$lib/utils/HTMLfunctions';
	import ToastContainer from '$lib/components/ToastContainer.svelte';


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

	let deleteDialog: HTMLDialogElement | null = $state(null);
	let deleteID: string = '';
	let loading = $state(true);

	onMount(async () => {
		$pathName = page.url.pathname;
		await loadData();
		// Initial sort settings are already loaded from session storage
		// The $effect block will handle the initial sort
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

	const sortTable = (key: NewsSortableFields) => {
		if ($sortKey === key) {
			sortDirection.update((val) => (val === 1 ? -1 : 1));
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

	// Update sorting and sessionStorage when sort settings or items change
	$effect(() => {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ key: $sortKey, direction: $sortDirection }),
			);
		}

		// Sort items if available
		if ($NewsItemsStore?.length) {
			const sorted = [...$NewsItemsStore].sort((a, b) => {
				const aVal = a.data[$sortKey];
				const bVal = b.data[$sortKey];
				if (aVal < bVal) {
					return -$sortDirection;
				} else if (aVal > bVal) {
					return $sortDirection;
				}
				return 0;
			});
			sortItems.set(sorted);
		}
	});

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
		if (!deleteDialog || !deleteID) return;

		await deleteDoc(doc(newsColRef, deleteID));
		await loadData();
		NewsItemsStore.set($NewsItemsStore.filter((item) => item.id !== deleteID));
		deleteDialog.close();
		deleteID = '';
	};

	const openModal = (id: string) => {
		if (!deleteDialog) return;
		deleteID = id;
		deleteDialog.showModal();
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
				<button class="btn btn-error" onclick={() => handleDelete()}>Delete</button>
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
				oninput={handleSearchInput}
			/>
		</div>
		<div class="col-span-3 justify-self-end py-2">
			<button onclick={handleCreateNew} class="btn btn-primary btn-lg">Create News</button>
		</div>
	</div>

	{#if loading}
		<div class="w-full">Loading...</div>
	{:else}
		<div class="w-full">
			<table class="admin-table">
				<thead class="table-row">
					<tr class="table-row">
						<th class="table-header table-cell" onclick={() => sortTable('title')}>Title</th>
						<th class="table-header table-cell" onclick={() => sortTable('text')}>News Text</th>
						<th class="table-header table-cell" onclick={() => sortTable('publishdate')}
							>Publish date</th
						>
						<th class="table-header table-cell" onclick={() => sortTable('author')}>Author</th>
						<th class="table-header table-cell">Actions</th>
					</tr>
				</thead>
				<tbody class="table-row">
					{#each $sortItems as item}
						<tr class="table-row">
							<td class="table-data table-cell">
								<button class="btn btn-link px-0" onclick={() => handleOpenItem(item.id)}
									>{item.data.title}</button
								>
							</td>
							<td class="table-data table-cell">{decodeHtml(item.data.text)}</td>
							<td class="table-data table-cell">{item.data.publishdate}</td>
							<td class="table-data table-cell">{item.data.author}</td>
							<td class="table-data table-cell">
								<div class="flex flex-row justify-between">
									<button class="btn-sm btn-custom-delete" onclick={() => openModal(item.id)}
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

<ToastContainer />

<style>
	.admin-table {
		display: grid;
		grid-template-columns:
			minmax(150px, 2.5fr) minmax(130px, 2.5fr) minmax(130px, 1fr) minmax(150px, 1fr)
			minmax(150px, 1fr);
	}

	
</style>
