<script lang="ts">
	import { onMount } from 'svelte';

	import { NoticesStore, CollectionType, loadItems } from '$lib/stores/ObjectStore';

	import { decodeHtml } from '$lib/utils/HTMLfunctions';

	import Button from '$lib/components/ui/button/button.svelte';

	const loadData = async () => {
		await loadItems(CollectionType.Notices);
	};

	let loading = $state(true);

	onMount(async () => {
		await loadData();

		loading = false;
		console.log($NoticesStore);
	});

	const handleCreateNew = () => {
		console.log('New');
	};
</script>

<div>
	<h1>News</h1>
	<div class="mb-6 grid grid-cols-12 items-center gap-2 lg:gap-20">
		<div class="col-span-3 justify-self-end py-2">
			<Button variant="primary" size="lg" onclick={handleCreateNew}>Create News</Button>
		</div>
	</div>

	{#if loading}
		<div class="w-full">Loading...</div>
	{:else}
		<div class="w-full">
			<div class="my-8 w-full rounded-xl border-1 p-4">
				<table class="admin-table">
					<thead class="table-row">
						<tr class="table-row">
							<th class="table-header table-cell">Due Date</th>
							<th class="table-header table-cell">Notice Text (HTML)</th>
						</tr>
					</thead>
					<tbody class="table-row">
						{#each $NoticesStore as item}
							<tr>
								<td class="table-data table-cell">{item.data.due.toDate().toLocaleString('de-DE')}</td>
								<td class="table-data table-cell">{@html item.data.text}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
