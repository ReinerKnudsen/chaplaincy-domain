<script lang="ts">
	import { onMount } from 'svelte';

	import {
		NoticesStore,
		CollectionType,
		loadItems,
		type NoticeForm,
		type CollectionItem,
	} from '$lib/stores/ObjectStore';

	import { decodeHtml } from '$lib/utils/HTMLfunctions';

	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Timestamp } from 'firebase/firestore';

	const loadData = async () => {
		await loadItems(CollectionType.Notices);
	};

	let loading = $state(true);

	onMount(async () => {
		await loadData();

		loading = false;
	});

	const initialNotice: NoticeForm = { due: '', text: '' };

	let thisNotice = $state(initialNotice);

	const handleCreateNew = () => {
		console.log('New');
	};

	const dateToLocalDatetimeString = (date: Date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		// padStart: fill the string with "0" to a total length of 2 from the left
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

	const handleEdit = (item: CollectionItem) => {
		const jsDate = item.data.due.toDate();
		thisNotice.due = dateToLocalDatetimeString(jsDate);
		thisNotice.text = item.data.text;
		console.log('Item: ', item.data.due);
		console.log(thisNotice);
	};

	const handleSubmit = () => {
		console.log('Ich speichere das Item');
	};

	const handleReset = () => {
		console.log('Ich lösche das Formular');
	};
</script>

<div>
	<h1>Notices</h1>
	<div class="mb-10 rounded-xl bg-slate-100 p-4">
		Notices will show on the home page below the services times. They are meant to carry information about changes or
		cancellations.
	</div>
	<div class="mb-6 grid grid-cols-12 items-center gap-2 lg:gap-20">
		<div class="col-span-3 justify-self-end py-2"></div>
	</div>

	<div class="w-full rounded-xl border p-4">
		<form id="form-container" enctype="multipart/form-data" onsubmit={handleSubmit} onreset={handleReset}>
			<fieldset>
				<Label for="duedate">Due Date*</Label>
				<Input type="datetime-local" id="duedate" bind:value={thisNotice.due} required />
			</fieldset>
			<fieldset>
				<Label for="text">Notice Text*</Label>
				<Input type="text" id="text" bind:value={thisNotice.text} required />
				<p class="py-2 text-sm">Use &lt;b&gt;TEXT&lt;/b&gt; to print <b>TEXT</b></p>
			</fieldset>
			<div class="flex flex-row items-center justify-center gap-8">
				<Button variant="secondary" size="lg" onclick={handleReset}>Reset form</Button>
				<Button variant="primary" size="lg" onclick={handleCreateNew}>Create News</Button>
			</div>
		</form>
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
							<th class="table-header table-cell">Actions</th>
						</tr>
					</thead>
					<tbody class="table-row">
						{#each $NoticesStore as item}
							<tr>
								<td class="table-data table-cell">{item.data.due.toDate().toLocaleString('de-DE')}</td>
								<td class="table-data table-cell">{@html item.data.text}</td>
								<td class="table-data table-cell">
									<div class="flex justify-between gap-2">
										<Button variant="primary" class="min-w-0" onclick={() => handleEdit(item)}>
											<Icon icon="fluent-mdl2:edit" class="size-6" />
										</Button>
										<Button variant="destructive" title="Delete Item" class="min-w-0"
											><Icon icon="mdi-light:delete" class="size-6" /></Button
										>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
