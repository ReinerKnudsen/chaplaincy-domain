<script lang="ts">
	import { goto } from '$app/navigation';

	import { updateDoc } from 'firebase/firestore';
	import type { DocumentReference } from 'firebase/firestore';

	import UploadPDF from '$lib/components/UploadPDF.svelte';
	import Label from '$lib/components/Label.svelte';
	import { Button } from '$lib/components/ui/button';

	type WeeklySheet = {
		date: string;
		docRef: DocumentReference | null;
	};

	let newItem: WeeklySheet = $state({
		date: '',
		docRef: null,
	});

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

<div class="form bg-white-primary">
	<h1 class="mx-10">Upload weekly sheet</h1>
	<form class="mx-10" enctype="multipart/form-data" onsubmit={handleSubmit}>
		<!-- Date -->
		<div>
			<Label child="date" class="mt-8 mb-2 text-xl font-semibold">Date *</Label>
			<input type="date" class="input input-bordered input-lg w-full" id="date" bind:value={newItem.date} required />
		</div>

		<div>
			<Label child="" class="mt-8 mb-2 text-xl font-semibold">PDF Document</Label>
			<div class="flex flex-col items-center justify-center">
				<UploadPDF target="weeklysheet" onUpload={saveDocRef} />
			</div>
		</div>
		<!-- Buttons -->
		<div class="mt-10 mb-20 flex flex-row justify-center gap-32">
			<Button variant="outline" type="reset" color="light" onclick={() => goto('/admin/weeklysheet')}>Cancel</Button>
			<Button variant="primary" type="submit">Complete</Button>
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
