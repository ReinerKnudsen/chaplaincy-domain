<script lang="ts">
	import { onMount } from 'svelte';
	import { type StorageReference, getDownloadURL } from 'firebase/storage';

	import { listAllImages, deleteImageFromStorage, getStorageFileSize } from '$lib/services/fileService';
	import { doc, getDoc, getDocs, query, where } from 'firebase/firestore';
	import { eventsColRef, imageUsageColRef, newsColRef, database } from '$lib/firebase/firebaseConfig';
	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import { Messages, notificationStore, TOAST_DURATION } from '$lib/stores/notifications';

	let loading = $state(true);
	let images: StorageReference[] = $state([]);
	let eventTitles: Record<string, string> = $state({});
	let newsTitles: Record<string, string> = $state({});
	let allUsageData: any[] = $state([]);
	let showDeleteDialog = $state(false);
	let deleteImage: string = $state('');

	onMount(async () => {
		images = await listAllImages();

		// 1. Get ALL usage records for ALL images at once
		const allUsages = await getDocs(imageUsageColRef);

		// 2. Group by document type and collect unique IDs
		const eventIds = new Set<string>();
		const newsIds = new Set<string>();

		allUsages.docs.forEach((usage) => {
			const data = usage.data();
			if (data.documentType === 'events') {
				eventIds.add(data.documentId);
			} else if (data.documentType === 'news') {
				newsIds.add(data.documentId);
			}
		});
		// Results in two lists of document ids (events and news) with images from the usage db

		// 3. Batch fetch all event and news titles
		const tempEventTitles: Record<string, string> = {};
		const tempNewsTitles: Record<string, string> = {};

		for (const id of eventIds) {
			const item = await getDoc(doc(eventsColRef, id as string));
			tempEventTitles[id] = item.data()?.title;
		}
		// Stores the title as value with the document id as key

		for (const id of newsIds) {
			const item = await getDoc(doc(newsColRef, id as string));
			tempNewsTitles[id] = item.data()?.title;
		}
		// Stores the title as value with the document id as key

		// 4. Store in component state
		eventTitles = tempEventTitles;
		newsTitles = tempNewsTitles;
		allUsageData = allUsages.docs.map((doc) => doc.data());
		// Trasnfers all UsageData to state

		loading = false;
	});

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const sizes = ['B', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
	};

	// Helper to get download URL for display
	const getImageUrl = async (ref: StorageReference): Promise<string> => {
		try {
			return await getDownloadURL(ref);
		} catch (error) {
			console.error('Error getting URL for', ref.name, error);
			return '';
		}
	};

	const getImageUsage = (imageName: string) => {
		// Filter cached usage data for this image
		const usages = allUsageData.filter((usage) => usage.imageId === imageName);

		return usages.map((usage) => {
			const title = usage.documentType === 'events' ? eventTitles[usage.documentId] : newsTitles[usage.documentId];

			return {
				documentType: usage.documentType,
				documentId: usage.documentId,
				title: title || 'Unknown Title',
				editUrl: `/admin/${usage.documentType}admin/${usage.documentId}`,
			};
		});
	};

	const getUsageNumber = (imageName: string) => {
		return allUsageData.filter((usage) => usage.imageId === imageName).length === 0;
	};

	const openModal = (imageName: string) => {
		showDeleteDialog = true;
		deleteImage = imageName;
	};

	const handleDelete = async () => {
		if (!deleteImage) return;
		try {
			await deleteImageFromStorage(deleteImage);
			images = await listAllImages();
			notificationStore.addToast('success', Messages.DELETESUCCESS, TOAST_DURATION);
		} catch (error) {
			console.error(error);
			notificationStore.addToast('error', Messages.DELETEERROR, TOAST_DURATION);
		}
		showDeleteDialog = false;
		deleteImage = '';
	};
</script>

<div>
	<h1>Media Management</h1>

	{#if loading}
		<div class="w-full">Loading...</div>
	{:else}
		<div class="mt-10 w-full">
			<table class="admin-table events-table">
				<thead class="table-row">
					<tr class="table-row">
						<th class="table-header table-cell">Image</th>
						<th class="table-header table-cell">Path</th>
						<th class="table-header table-cell">Usage</th>
						<th class="table-header table-cell">Size</th>
						<th class="table-header table-cell">Actions</th>
					</tr>
				</thead>
				<tbody class="table-row">
					{#each images as image}
						<tr class="table-row">
							<td class="table-data table-cell">
								{#await getImageUrl(image)}
									<div class="flex h-[200px] w-[200px] items-center justify-center bg-gray-200">Loading...</div>
								{:then url}
									<img src={url} alt={image.name} class="max-h-[200px] max-w-[200px] object-contain" />
								{:catch error}
									<div class="flex h-[200px] w-[200px] items-center justify-center bg-red-100">Error loading image</div>
								{/await}
							</td>
							<td class="table-data table-cell">{image.name}</td>
							<td class="table-data table-cell">
								{#each [getImageUsage(image.name)] as usages}
									{#if usages.length > 0}
										<div class="flex flex-col gap-1">
											{#each usages as usage}
												<a href={usage.editUrl} class="text-sm text-blue-600 hover:underline">
													{usage.title} ({usage.documentType})
												</a>
											{/each}
										</div>
									{:else}
										<span class="text-sm text-gray-500">Unused</span>
									{/if}
								{/each}
							</td>
							<td class="table-data table-cell">
								{#await getStorageFileSize(image)}
									<span class="text-gray-500">Loading...</span>
								{:then size}
									<span class="text-sm">{formatFileSize(size)}</span>
								{:catch}
									<span class="text-gray-500">-</span>
								{/await}
							</td>
							<td class="table-data table-cell">
								{#if getUsageNumber(image.name)}
									<Button
										variant="destructive"
										title="Delete Item"
										class="min-w-0 "
										onclick={() => openModal(image.name)}><Icon icon="mdi-light:delete" class="size-6" /></Button
									>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<ToastContainer />

<ConfirmDialog
	open={showDeleteDialog}
	title="Confirm Delete"
	message="Deleting an item can not be undone. <br \>Do you really want to delete this item?"
	confirmText="Delete"
	cancelText="Cancel"
	confirmVariant="destructive"
	onConfirm={handleDelete}
	onCancel={() => (showDeleteDialog = false)}
/>

<style>
	.events-table {
		display: grid;
		grid-template-columns:
			minmax(150px, 1fr)
			minmax(130px, 1fr)
			minmax(130px, 1fr)
			minmax(80px, 0.5fr)
			minmax(80px, 0.5fr);
	}
</style>
