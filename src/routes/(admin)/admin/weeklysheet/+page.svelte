<script lang="ts">
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	import Icon from '$lib/components/Icon.svelte';
	import { Button } from 'flowbite-svelte';

	// Get the data from the server
	export let data: { documents: Array<Record<string, any>> };

	type IconName = 'chevronDown' | 'chevronUp';

	// Sort table items
	const sortKey = writable<string>('date'); // default sort key
	const sortDirection = writable<number>(1); // default sort direction (ascending)
	const sortItems = writable(data.documents);
	const sortIcon = writable<IconName>('chevronDown');

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

	$: {
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
	}

	$: {
		sortIcon.set($sortDirection === 1 ? 'chevronDown' : 'chevronUp');
	}

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
				on:input={handleSearchInput}
			/>
		</div>
		<div class="justify-self-end">
			<Button on:click={handleClick} class="bg-primary-100 text-lg font-semibold text-white-primary"
				>Upload</Button
			>
		</div>
	</div>
	<div class="">
		<table>
			<thead>
				<tr>
					<th class="flex flex-row justify-between" on:click={() => sortTable('date')}>
						<div>Date</div>
						<div class="mr-4">
							<Icon name={$sortIcon} />
						</div>
					</th>
					<th>Link</th>
				</tr>
			</thead>
			<tbody>
				{#each $sortItems as item}
					<tr>
						<td>{item.date}</td>
						<td><a href={item.path} target="_blank">Open in browser</a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<style>
		table {
			display: grid;
			border-collapse: collapse;
			min-width: 100%;
			grid-template-columns:
				minmax(150px, 2.5fr)
				minmax(130px, 1fr);
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
</div>
