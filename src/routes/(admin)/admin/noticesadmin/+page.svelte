<script lang="ts">
	import { onMount } from 'svelte';

	import { addDoc, updateDoc, doc, type DocumentReference, deleteDoc } from 'firebase/firestore';
	import { noticeColRef } from '$lib/firebase/firebaseConfig';

	import {
		NoticesStore,
		CollectionType,
		loadItems,
		createHashableString,
		type Notice,
		type CollectionItem,
	} from '$lib/stores/ObjectStore';
	import { notificationStore, TOAST_DURATION, Messages } from '$lib/stores/notifications';

	import Button from '$lib/components/ui/button/button.svelte';
	import Icon from '@iconify/svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import ToastEditor from '$lib/components/ToastEditor.svelte';
	const loadData = async () => {
		await loadItems(CollectionType.Notices);
		console.log($NoticesStore);
	};

	let loading = $state(true);
	let mode: 'new' | 'update' = $state('new');
	let showDeleteDialog = $state(false);
	let deleteID = $state('');
	let updateId = '';

	onMount(async () => {
		await loadData();

		loading = false;
	});

	const initialNotice: Notice = { due: '', text: '' };

	let thisNotice = $state(initialNotice);

	const convertDate = (date: string) => {
		return date.slice(0, 10);
	};

	const handleEdit = (item: CollectionItem) => {
		mode = 'update';
		updateId = item.id;
		thisNotice.due = convertDate(item.data.due);
		thisNotice.text = item.data.text;
	};

	const handleSubmit = async () => {
		if (!thisNotice.due || !thisNotice.text) {
			notificationStore.addToast('warning', 'Please fill out all mandatory fields', TOAST_DURATION);
			return;
		}
		const noticeData = {
			due: thisNotice.due + 'T23:59:00',
			text: thisNotice.text,
		};
		if (mode === 'new') {
			try {
				const res = await addDoc(noticeColRef, noticeData);
				const newNotices = [...$NoticesStore, { id: res.id, data: noticeData }];
				NoticesStore.set(newNotices);
				notificationStore.addToast('success', Messages.SAVESUCCESS, TOAST_DURATION);
				handleReset();
			} catch (error) {
				notificationStore.addToast('error', Messages.SAVERROR, TOAST_DURATION);
			}
		} else if (mode === 'update') {
			try {
				const docRef = doc(noticeColRef, updateId);
				await updateDoc(docRef, noticeData);
				const updatedNotices = $NoticesStore.map((item) => {
					if (item.id === updateId) {
						return { id: item.id, data: noticeData };
					}
					return item;
				});
				NoticesStore.set(updatedNotices);
				notificationStore.addToast('success', Messages.UPDATESUCCESS, TOAST_DURATION);
				handleReset();
			} catch (error) {
				console.log(error);
				notificationStore.addToast('error', Messages.UPDATEERROR, TOAST_DURATION);
			}
		}
	};

	const openModal = (id: string) => {
		deleteID = id;
		showDeleteDialog = true;
	};

	const handleDelete = async () => {
		try {
			const docRef = doc(noticeColRef, deleteID);
			await deleteDoc(docRef);
			notificationStore.addToast('success', Messages.DELETESUCCESS, TOAST_DURATION);
			const newNotices = $NoticesStore.filter((notice) => notice.id != deleteID);
			NoticesStore.set(newNotices);
		} catch (error) {
			notificationStore.addToast('error', Messages.DELETEERROR, TOAST_DURATION);
		}
	};

	const handleReset = () => {
		thisNotice = initialNotice;
		mode = 'new';
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
		<h2>{mode === 'new' ? 'Create new notice' : 'Edit notice'}</h2>
		<form id="form-container" enctype="multipart/form-data">
			<fieldset>
				<Label for="duedate">Due Date*</Label>
				<Input type="date" id="duedate" bind:value={thisNotice.due} required />
			</fieldset>
			<fieldset>
				<Label for="text">Notice Text*</Label>
				<Input type="text" id="text" bind:value={thisNotice.text} required />
				<p class="py-2 text-sm">Use &lt;b&gt;TEXT&lt;/b&gt; to print <b>TEXT</b>; use &lt;br&gt; to add a new line</p>
			</fieldset>
			<div class="flex flex-row items-center justify-center gap-8">
				<Button variant="secondary" size="lg" onclick={handleReset}>Reset form</Button>
				<Button variant="primary" size="lg" onclick={handleSubmit}>Save</Button>
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
								<td class="table-data table-cell">{convertDate(item.data.due)}</td>
								<td class="table-data table-cell">{@html item.data.text}</td>
								<td class="table-data table-cell">
									<div class="flex justify-between gap-2">
										<Button variant="primary" class="min-w-0" onclick={() => handleEdit(item)}>
											<Icon icon="fluent-mdl2:edit" class="size-6" />
										</Button>
										<Button variant="destructive" title="Delete Item" class="min-w-0" onclick={() => openModal(item.id)}
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

<ConfirmDialog
	open={showDeleteDialog}
	title="Confirm Delete"
	message="Deleting an item can not be undone. <br \>Do you really want to delete this item?"
	confirmText="Delete"
	cancelText="Cancel"
	confirmVariant="destructive"
	onConfirm={handleDelete}
	onCancel={() => (showDeleteDialog = false)}
/>

<ToastContainer />
