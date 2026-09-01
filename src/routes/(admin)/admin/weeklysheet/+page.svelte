<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto, invalidateAll } from '$app/navigation';

	import { doc, deleteDoc } from 'firebase/firestore';
	import { documentsColRef } from '$lib/firebase/firebaseConfig';

	import { pathName } from '$lib/stores/NavigationStore';
	import { notificationStore } from '$lib/stores/notifications';

	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	import { makeDate } from '$lib/utils/dateUtils';
	import { Messages } from '$lib/utils/messages';
	import { deletePDFFromStorage, getPDFStorageName } from '$lib/services/fileService';

	import type { WeeklySheet } from '$lib/stores/ObjectStore';

	// Get the data from the server
	interface Props {
		data: { documents: WeeklySheet[] };
	}

	let { data }: Props = $props();

	onMount(() => {
		pathName.set(page.url.pathname);
	});

	// Sort table items
	let sortKey = $state('date'); // default sort key
	let sortDirection = $state(-1); // default sort direction (ascending)
	let sortItems = $state(data.documents);

	// Define a function to sort the items
	const sortTable = (key: string) => {
		// If the same key is clicked, reverse the sort direction
		if (sortKey === key) {
			sortDirection = sortDirection * -1;
		} else {
			sortKey = key;
			sortDirection = 1;
		}
	};

	$effect(() => {
		const key = sortKey;
		const direction = sortDirection;
		const sorted = [...data.documents].sort((a, b) => {
			const aVal = a[key];
			const bVal = b[key];
			if (aVal < bVal) {
				return -direction;
			} else if (aVal > bVal) {
				return direction;
			}
			return 0;
		});

		sortItems = sorted;
	});

	const handleSearchInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
	};

	const handleClick = () => {
		goto('/admin/weeklysheet/upload');
	};

	const handleOpenItem = (id: string) => {
		if (!id) return;
		goto(`/admin/weeklysheet/${id}`);
	};

	// Delete
	let showDeleteDialog = $state(false);
	let isDeleting = $state(false);
	let deleteItem: WeeklySheet | null = $state(null);

	const openDeleteModal = (item: WeeklySheet) => {
		deleteItem = item;
		showDeleteDialog = true;
	};

	const closeDeleteModal = () => {
		showDeleteDialog = false;
		deleteItem = null;
	};

	const handleDelete = async () => {
		const item = deleteItem;
		if (!item?.id || isDeleting) return;

		isDeleting = true;
		try {
			// Storage first: if this fails the document stays, so the file is
			// never orphaned without a record pointing at it.
			const pdfFileName = getPDFStorageName(item.pdfName, item.pdfFile);
			if (pdfFileName) {
				await deletePDFFromStorage(pdfFileName, 'weeklysheet');
			}

			await deleteDoc(doc(documentsColRef, item.id));
			await invalidateAll();

			notificationStore.addToast('success', Messages.DELETESUCCESS);
			closeDeleteModal();
		} catch (error) {
			console.error('Failed to delete weekly sheet:', error);
			notificationStore.addToast('error', Messages.DELETEERROR);
		} finally {
			isDeleting = false;
		}
	};
</script>

<div class="px-4">
	<h1>Weekly sheets</h1>
	<div class="mb-6 grid grid-cols-2 items-center gap-2 lg:gap-20">
		<div>
			<input class="w-full rounded-lg" placeholder="Search (not yet active)" type="text" oninput={handleSearchInput} />
		</div>
		<div class="justify-self-end">
			<Button variant="primary" size="lg" onclick={handleClick}>Upload</Button>
		</div>
	</div>
	<div class="">
		<table class="admin-table locations-table">
			<thead class="table-row">
				<tr class="table-row">
					<th class="table-header table-cell" onclick={() => sortTable('date')}>
						<div>Date</div>
					</th>
					<th class="table-header table-cell" onclick={() => sortTable('publishdate')}>
						<div>Publish</div>
					</th>
					<th class="table-header table-cell" onclick={() => sortTable('unpublishdate')}>
						<div>Unpublish</div>
					</th>
					<th class="table-header table-cell">Link</th>
					<th class="table-header table-cell">Actions</th>
				</tr>
			</thead>
			<tbody class="table-row">
				{#each sortItems as item (item.id)}
					<tr class="table-row">
						<td class="table-data table-cell">
							<Button variant="listItem" onclick={() => handleOpenItem(item.id)}>{makeDate(item.date)}</Button>
						</td>
						<td class="table-data table-cell">{makeDate(item.publishdate)}</td>
						<td class="table-data table-cell">{makeDate(item.unpublishdate)}</td>
						<td class="table-data table-cell">
							<Button variant="listItem">
								<a href={item.pdfFile} target="_blank">View PDF</a>
							</Button>
						</td>
						<td class="table-data table-cell">
							<Button
								variant="destructive"
								title="Delete weekly sheet"
								class="min-w-0"
								onclick={() => openDeleteModal(item)}
							>
								<Icon icon="mdi-light:delete" class="size-6" />
							</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<ConfirmDialog
	open={showDeleteDialog}
	title="Confirm Delete"
	message="Deleting a weekly sheet also removes its PDF from storage and cannot be undone.<br />Do you really want to delete this item?"
	confirmText={isDeleting ? 'Deleting…' : 'Delete'}
	cancelText="Cancel"
	confirmVariant="destructive"
	onConfirm={handleDelete}
	onCancel={closeDeleteModal}
/>

<ToastContainer />

<style>
	.locations-table {
		display: grid;
		grid-template-columns:
			minmax(150px, 1fr)
			minmax(130px, 1fr)
			minmax(130px, 1fr)
			minmax(130px, 1fr)
			minmax(100px, auto);
	}
</style>
