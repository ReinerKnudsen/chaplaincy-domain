<script lang="ts">
	import type { WeeklySheet } from '$lib/stores/ObjectStore';
	import type { DocumentReference } from 'firebase/firestore';

	import WeeklySheetForm from '$lib/components/WeeklySheetForm.svelte';

	interface Props {
		data: {
			sheetItem: WeeklySheet;
			docRef: DocumentReference;
		};
	}

	let { data }: Props = $props();
	const thisSheet = data.sheetItem;

	const handleSaveItem = (selectedPDF, newItem) => {
		console.log('Save called');
	};

	const handleCancel = () => {
		console.log('Cancelled called');
	};
</script>

<div>
	<WeeklySheetForm onSubmit={handleSaveItem} onCancel={handleCancel} item={thisSheet} />
</div>
