<script lang="ts">
	import { goto } from '$app/navigation';

	import { updateDoc } from 'firebase/firestore';
	import type { DocumentReference } from 'firebase/firestore';

	import UploadPDF from '$lib/components/UploadPDF.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	type WeeklySheet = {
		date: string;
		docRef: DocumentReference | null;
	};

	let newItem: WeeklySheet = $state({
		date: '',
		docRef: null,
	});

	let isValid = $derived(!!newItem.date && !!newItem.docRef);

	const saveDocRef = (e) => {
		newItem.docRef = e.detail.docRef;
	};

	const handleSubmit = async () => {
		if (!newItem.date) {
			alert('Please enter a date');
			return;
		}
		if (!newItem.docRef) {
			alert('Please upload a document');
			return;
		}
		try {
			await updateDoc(newItem.docRef, {
				date: newItem.date,
			});
			goto('/admin/weeklysheet');
		} catch (error) {
			console.error('Error updating document:', error);
		}
	};
</script>

<div class="form bg-white-primary mx-auto">
	<h1 class="mx-10">Upload weekly sheet</h1>
	<form class="mx-10 flex flex-col items-center" enctype="multipart/form-data" onsubmit={handleSubmit}>
		<!-- Date -->
		<div class="w-1/2">
			<Label>Date *</Label>
			<Input type="date" class="w-[400px]" id="date" bind:value={newItem.date} required />
		</div>

		<div class="mt-4 w-1/2">
			<Label>PDF Document</Label>
			<div class="flex flex-col">
				<UploadPDF target="weeklysheet" onUpload={saveDocRef} />
			</div>
		</div>
		<!-- Buttons -->
		<div class="mt-10 mb-20 flex w-1/2 flex-row justify-start gap-32">
			<Button variant="outline" type="reset" color="light" onclick={() => goto('/admin/weeklysheet')}>Cancel</Button>
			<Button variant="primary" disabled={!isValid} type="submit">Complete</Button>
		</div>
	</form>
</div>

<style>
	.form {
		max-width: 90%;
		border: 1px solid #eaeaea;
		border-radius: 20px;
	}
</style>
