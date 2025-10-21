<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import { pathName } from '$lib/stores/NavigationStore';

	import { Button } from '$lib/components/ui/button';

	import { makeDate } from '$lib/utils/dateUtils';

	// Get the data from the server
	interface Props {
		data: { documents: Array<Record<string, any>> };
	}

	let { data }: Props = $props();

	onMount(() => {
		pathName.set(page.url.pathname);
	});

	// Sort table items
	const sortKey = writable<string>('date'); // default sort key
	const sortDirection = writable<number>(-1); // default sort direction (ascending)
	const sortItems = writable(data.documents);

	// Define a function to sort the items
	const sortTable = (key: string) => {
		// If the same key is clicked, reverse the sort direction
		if ($sortKey === key) {
			sortDirection.update((val) => -val);
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

	$effect(() => {
		const key = $sortKey;
		const direction = $sortDirection;
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

		sortItems.set(sorted);
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
				</tr>
			</thead>
			<tbody class="table-row">
				{#each $sortItems as item}
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
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.locations-table {
		display: grid;
		grid-template-columns:
			minmax(150px, 1fr)
			minmax(130px, 1fr)
			minmax(130px, 1fr)
			minmax(130px, 1fr);
	}
</style>
