<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { pathName } from '$lib/stores/NavigationStore';
	import { Button } from '$lib/components/ui/button';
	import type { Timestamp } from 'firebase/firestore';

	interface Prayer {
		id: string;
		date: Timestamp | string;
		prayer: string;
	}

	interface Props {
		data: { prayers: Prayer[] };
	}

	let { data }: Props = $props();

	onMount(() => {
		pathName.set(page.url.pathname);
	});

	const formatDate = (date: Timestamp | string): string => {
		if (typeof date === 'string') return date;
		if (date && typeof date.toDate === 'function') {
			return date.toDate().toISOString().split('T')[0];
		}
		return '';
	};

	const truncate = (text: string, max = 160): string =>
		text.length > max ? text.slice(0, max) + '…' : text;
</script>

<div class="px-4">
	<h1>Prayers</h1>
	<div class="mb-6 flex items-center justify-between">
		<p class="text-muted-foreground text-sm">{data.prayers.length} entries</p>
		<Button variant="primary" size="lg" onclick={() => goto('/admin/prayersadmin/import')}>
			Import JSON
		</Button>
	</div>

	<table class="admin-table prayers-table">
		<thead class="table-row">
			<tr class="table-row">
				<th class="table-header table-cell">Date</th>
				<th class="table-header table-cell">Prayer</th>
			</tr>
		</thead>
		<tbody class="table-row">
			{#each data.prayers as prayer (prayer.id)}
				<tr class="table-row">
					<td class="table-data table-cell">
						<Button variant="listItem" onclick={() => goto(`/admin/prayersadmin/${prayer.id}`)}>
							{formatDate(prayer.date)}
						</Button>
					</td>
					<td class="table-data table-cell text-muted-foreground truncate text-sm">
						{truncate(prayer.prayer)}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.prayers-table {
		display: grid;
		grid-template-columns: minmax(120px, 160px) minmax(200px, 1fr);
	}
</style>
