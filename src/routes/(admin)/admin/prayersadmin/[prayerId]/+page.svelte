<script lang="ts">
	import { goto } from '$app/navigation';
	import { updateDoc, type DocumentReference, type Timestamp } from 'firebase/firestore';
	import { notificationStore, Messages } from '$lib/stores/notifications';
	import { Button } from '$lib/components/ui/button';
	import ToastContainer from '$lib/components/ToastContainer.svelte';

	interface Prayer {
		id: string;
		date: Timestamp | string;
		prayer: string;
	}

	interface Props {
		data: { prayer: Prayer | undefined; docRef: DocumentReference | null };
	}

	let { data }: Props = $props();

	const formatDate = (date: Timestamp | string | undefined): string => {
		if (!date) return '';
		if (typeof date === 'string') return date;
		if (typeof date.toDate === 'function') return date.toDate().toISOString().split('T')[0];
		return '';
	};

	let prayerText = $state(data.prayer?.prayer ?? '');
	let isSaving = $state(false);

	const handleSave = async () => {
		if (!data.docRef) return;
		isSaving = true;
		try {
			await updateDoc(data.docRef, { prayer: prayerText.trim() });
			notificationStore.addToast('success', Messages.UPDATESUCCESS);
			goto('/admin/prayersadmin');
		} catch (err) {
			console.error('Error saving prayer:', err);
			notificationStore.addToast('error', Messages.UPDATEERROR);
		} finally {
			isSaving = false;
		}
	};

	const handleCancel = () => {
		goto('/admin/prayersadmin');
	};
</script>

<div class="px-4 max-w-3xl">
	{#if !data.prayer}
		<p class="text-muted-foreground">Prayer entry not found.</p>
		<Button variant="outline" onclick={handleCancel}>Back</Button>
	{:else}
		<h1>Edit Prayer</h1>
		<p class="text-muted-foreground mb-6 text-sm font-medium">{formatDate(data.prayer.date)}</p>

		<div class="mb-6">
			<label class="mb-2 block font-medium" for="prayer-text">Prayer</label>
			<textarea
				id="prayer-text"
				bind:value={prayerText}
				rows={8}
				class="w-full rounded-lg border p-3 text-sm"
			></textarea>
		</div>

		<div class="flex gap-4">
			<Button variant="primary" size="lg" onclick={handleSave} disabled={isSaving}>
				{isSaving ? 'Saving…' : 'Save'}
			</Button>
			<Button variant="outline" size="lg" onclick={handleCancel}>Cancel</Button>
		</div>
	{/if}
</div>

<ToastContainer />
