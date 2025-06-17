<script lang="ts">
	import { run } from 'svelte/legacy';

	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	// Get the data from the server
	interface Props {
		data: { documents: Array<Record<string, any>> };
	}

	let { data }: Props = $props();

	// Sort table items
	const sortKey = writable<string>('date'); // default sort key
	const sortDirection = writable<number>(1); // default sort direction (ascending)
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

	run(() => {
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
		//console.log(target.value);
	};

	const handleClick = () => {
		goto('/admin/weeklysheet/upload');
	};
</script>

<div class="px-4">
	<h1>Weekly sheets</h1>
	<div class="mb-6 grid grid-cols-2 items-center gap-2 lg:gap-20">
		<div>
			<input
				class="w-full rounded-lg"
				placeholder="Search (not yet active)"
				type="text"
				oninput={handleSearchInput}
			/>
		</div>
		<div class="justify-self-end">
			<button onclick={handleClick} class="btn btn-c btn-primary">Upload</button>
		</div>
	</div>
	<div class="">
		<table class="admin-table">
			<thead class="table-row">
				<tr class="table-row">
					<th class="table-header table-cell" onclick={() => sortTable('date')}>
						<div>Date</div>
					</th>
					<th class="table-header table-cell">Link</th>
				</tr>
			</thead>
			<tbody class="table-row">
				{#each $sortItems as item}
					<tr class="table-row">
						<td class="table-data table-cell">{item.date}</td>
						<td class="table-data table-cell"
							><a href={item.path} target="_blank">Open in browser</a></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.admin-table {
		display: grid;
		border-collapse: collapse;
		min-width: 100%;
		grid-template-columns: minmax(150px, 2.5fr) minmax(130px, 2.5fr);
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
