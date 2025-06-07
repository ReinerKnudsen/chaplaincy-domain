<script lang="ts">
	import { goto } from '$app/navigation';

	import { updateDoc } from 'firebase/firestore';
	import type { DocumentReference } from 'firebase/firestore';

	import UploadPDF from '$lib/components/UploadPDF.svelte';
	import { Input, Label, Checkbox, Textarea, Helper, Button, Tooltip } from 'flowbite-svelte';

	type WeeklySheet = {
		date: string;
		docRef: DocumentReference | null;
	};

	let newItem: WeeklySheet = {
		date: '',
		docRef: null,
	};

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
	<form class="mx-10" enctype="multipart/form-data" on:submit={handleSubmit}>
		<!-- Date -->
		<div>
			<Label for="date" class="mb-2 mt-8 text-xl font-semibold">Date *</Label>
			<Input type="date" id="date" bind:value={newItem.date} required />
		</div>

		<div>
			<Label class="mb-2 mt-8 text-xl font-semibold">PDF Document</Label>
			<div class="flex flex-col items-center justify-center">
				<UploadPDF target="weeklysheet" on:upload={saveDocRef} />
			</div>
		</div>
		<!-- Buttons -->
		<div class="mb-20 mt-10 flex flex-row justify-center gap-32">
			<Button
				class="font-semibold"
				type="reset"
				color="light"
				on:click={() => goto('/admin/weeklysheet')}>Cancel</Button
			>
			<Button class="bg-primary-100  font-semibold text-white-primary" type="submit"
				>Complete</Button
			>
		</div>
	</form>
</div>

<style>
	.form {
		max-width: 90%;
		border: 1px solid #eaeaea;
		border-radius: 20px;
	}

	.explanation {
		margin: 10px 4px;
		font-size: 0.8rem;
	}
	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 80px;
		padding: 0 50px;
		justify-content: space-between;
		width: 100%;
		padding: 0 50px;
	}
</style>
