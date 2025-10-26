<script lang="ts">
	import { onMount } from 'svelte';

	import { Timestamp } from 'firebase/firestore';

	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import UploadPDF from './UploadPDF.svelte';
	import { type WeeklySheet, initialWeeklySheet, getNextSunday } from '$lib/stores/ObjectStore';

	import { makeDate, makeTimestamp } from '$lib/utils/dateUtils';

	interface Props {
		onSubmit: (selectedPDF: File | null, newItem: WeeklySheet) => void;
		onCancel: () => void;
		item?: WeeklySheet;
	}

	let { onSubmit, onCancel, item }: Props = $props();

	let newItem: WeeklySheet = $state(initialWeeklySheet);
	let selectedPDF: File | null = $state(null);

	// Reactive variables for form inputs (strings)
	let dateString = $state('');
	let publishDateString = $state('');
	let unpublishDateString = $state('');

	onMount(() => {
		if (item) {
			newItem = item;
			// Convert existing timestamps to strings for display
			dateString = makeDate(newItem.date);
			publishDateString = makeDate(newItem.publishdate);
			unpublishDateString = makeDate(newItem.unpublishdate);
		} else {
			// Set defaults
			newItem.date = Timestamp.fromDate(getNextSunday());
			newItem.publishdate = Timestamp.fromDate(new Date());

			const unpublishDate = new Date();
			unpublishDate.setDate(unpublishDate.getDate() + 8);
			newItem.unpublishdate = Timestamp.fromDate(unpublishDate);
		}
	});

	// Update timestamps when strings change
	$effect(() => {
		if (dateString) newItem.date = makeTimestamp(dateString, '09:30');
	});

	$effect(() => {
		if (publishDateString) newItem.publishdate = makeTimestamp(publishDateString, '00:00');
	});

	$effect(() => {
		if (unpublishDateString) newItem.unpublishdate = makeTimestamp(unpublishDateString, '23:59');
	});

	const handleNewPDFSelected = (pdf: File) => {
		selectedPDF = pdf;
		newItem = { ...newItem, pdfFile: pdf.name, pdfName: pdf.name };
	};
</script>

<div id="content-container" class="form bg-white-primary mx-auto box-border">
	<h1 class="mx-10">Upload weekly sheet</h1>
	<form
		class="flex w-full flex-col items-center md:mx-10"
		enctype="multipart/form-data"
		onsubmit={(e) => {
			e.preventDefault();
			onSubmit(selectedPDF, newItem);
		}}
	>
		<!-- Date -->
		<div class="mr-auto ml-10 w-[200px]">
			<Label>Date *</Label>
			<Input type="date" class="md:w-[200px]" id="date" bind:value={dateString} required />
		</div>
		<div class="mr-auto ml-10 w-[200px]">
			<Label>Publish Date *</Label>
			<Input type="date" class="md:w-[200px]" id="date" bind:value={publishDateString} required />
		</div>
		<div class="mr-auto ml-10 w-[200px]">
			<Label>Unpublish Date *</Label>
			<Input type="date" class="md:w-[200px]" id="date" bind:value={unpublishDateString} required />
		</div>

		<div class="mt-4 mr-auto ml-10 w-[80%] md:w-[400px]">
			<Label>PDF Document</Label>
			<div class="flex flex-col">
				<UploadPDF
					existingPdf={newItem.pdfName && newItem.pdfFile ? { name: newItem.pdfName, path: newItem.pdfFile } : null}
					pdftype="weeklysheet"
					onNewFileSelected={handleNewPDFSelected}
				/>
			</div>
		</div>
		<!-- Buttons -->
		<div class="mt-10 mb-20 flex w-[80%] flex-row justify-center gap-10 md:w-1/2 md:gap-32">
			<Button variant="outline" type="reset" color="light" onclick={onCancel}>Cancel</Button>
			<Button variant="primary" type="submit" disabled={!selectedPDF && !newItem.pdfFile}>Complete</Button>
		</div>
	</form>
</div>

<style>
	.form {
		border: 1px solid #eaeaea;
		border-radius: 20px;
	}
	@media (win-width: 640px) {
		.form {
			max-width: 90%;
		}
	}
</style>
