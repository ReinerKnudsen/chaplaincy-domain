<script lang="ts">
	import { goto } from '$app/navigation';
	import { doc, setDoc, Timestamp } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';
	import { notificationStore } from '$lib/stores/notifications';
	import { Button } from '$lib/components/ui/button';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	interface PrayerEntry {
		date: string;
		prayer: string;
	}

	let jsonText = $state('');
	let fileName = $state('');
	let validationError = $state('');
	let parsedEntries: PrayerEntry[] = $state([]);
	let isImporting = $state(false);

	const validateSchema = (data: unknown): PrayerEntry[] => {
		if (!Array.isArray(data)) throw new Error('JSON must be an array of prayer entries.');

		return data.map((item, i) => {
			if (typeof item !== 'object' || item === null) {
				throw new Error(`Entry ${i + 1}: must be an object.`);
			}
			const entry = item as Record<string, unknown>;

			if (typeof entry.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) {
				throw new Error(`Entry ${i + 1}: "date" must be a string in YYYY-MM-DD format.`);
			}
			if (typeof entry.prayer !== 'string' || entry.prayer.trim() === '') {
				throw new Error(`Entry ${i + 1}: "prayer" must be a non-empty string.`);
			}

			return { date: entry.date, prayer: entry.prayer.trim() };
		});
	};

	const parseInput = (raw: string) => {
		validationError = '';
		parsedEntries = [];
		if (!raw.trim()) return;

		try {
			const data = JSON.parse(raw);
			parsedEntries = validateSchema(data);
		} catch (err) {
			validationError = err instanceof Error ? err.message : 'Invalid JSON.';
		}
	};

	const handleFileUpload = (event: Event) => {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		if (!file.name.endsWith('.json')) {
			validationError = 'Please upload a .json file.';
			return;
		}

		fileName = file.name;
		const reader = new FileReader();
		reader.onload = (e) => {
			jsonText = (e.target?.result as string) ?? '';
			parseInput(jsonText);
		};
		reader.readAsText(file);
	};

	const handleTextInput = () => {
		parseInput(jsonText);
	};

	const handleImport = async () => {
		if (parsedEntries.length === 0) return;
		isImporting = true;

		try {
			const writes = parsedEntries.map((entry) => {
				const docRef = doc(database, 'prayers', entry.date);
				const date = Timestamp.fromDate(new Date(`${entry.date}T12:00:00.000Z`));
				return setDoc(docRef, { date, prayer: entry.prayer });
			});

			await Promise.all(writes);
			notificationStore.addToast('success', `${parsedEntries.length} prayers imported successfully.`);
			goto('/admin/prayersadmin');
		} catch (err) {
			console.error('Import error:', err);
			notificationStore.addToast('error', 'Import failed. Please try again.');
		} finally {
			isImporting = false;
		}
	};
</script>

<div class="px-4 max-w-3xl">
	<h1>Import Prayers</h1>
	<p class="text-muted-foreground mb-6 text-sm">
		Upload a JSON file or paste JSON content. Existing entries with the same date will be
		overwritten.
	</p>

	<div class="mb-6">
		<label class="mb-2 block font-medium" for="file-upload">Upload JSON file</label>
		<input
			id="file-upload"
			type="file"
			accept=".json"
			onchange={handleFileUpload}
			class="block w-full cursor-pointer rounded-lg border p-2 text-sm"
		/>
		{#if fileName}
			<p class="text-muted-foreground mt-1 text-xs">{fileName}</p>
		{/if}
	</div>

	<div class="mb-2">
		<label class="mb-2 block font-medium" for="json-input">Or paste JSON here</label>
		<textarea
			id="json-input"
			bind:value={jsonText}
			oninput={handleTextInput}
			rows={12}
			placeholder={'[\n  { "date": "2026-07-01", "prayer": "..." }\n]'}
			class="w-full rounded-lg border p-3 font-mono text-sm"
		></textarea>
	</div>

	{#if validationError}
		<div class="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
			{validationError}
		</div>
	{/if}

	{#if parsedEntries.length > 0}
		<div class="mb-6 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
			{parsedEntries.length} valid entries ready to import
			({parsedEntries[0].date} – {parsedEntries[parsedEntries.length - 1].date})
		</div>
	{/if}

	<div class="flex gap-4">
		<Button variant="primary" size="lg" onclick={handleImport} disabled={parsedEntries.length === 0 || isImporting}>
			{isImporting ? 'Importing…' : `Import ${parsedEntries.length > 0 ? parsedEntries.length + ' entries' : ''}`}
		</Button>
		<Button variant="outline" size="lg" onclick={() => goto('/admin/prayersadmin')}>Cancel</Button>
	</div>
</div>

<ToastContainer />
