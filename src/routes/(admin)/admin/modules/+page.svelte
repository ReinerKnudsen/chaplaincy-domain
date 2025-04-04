<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { iconNames } from '$lib/components/Icon.svelte';

	const handlePrimary = () => {
		console.log('Primary button clicked');
	};

	const handleSecondary = () => {
		console.log('Secondary button clicked');
	};

	let showModal = false;
</script>

<h1>Module Test</h1>

<button class="btn btn-primary" on:click={() => (showModal = !showModal)}>Open Modal</button>

<Modal
	open={showModal}
	type="warning"
	header="Warning Header"
	content="Deleting an item can not be undone.
			<p><em>Do you really want to delete this item?</em></p>"
	primaryBtnText="Do it"
	secondaryBtnText="Cancel"
	on:primary={handlePrimary}
	on:secondary={handleSecondary}
/>
<div class="py-30">&nbsp;</div>
<Modal
	open={!showModal}
	type="info"
	header="News"
	content="This is a news message"
	primaryBtnText="OK"
	secondaryBtnText="I really do not care"
	on:primary={handlePrimary}
	on:secondary={handleSecondary}
/>

<h1>Icons</h1>
{#if iconNames}
	<div class="flex flex-row flex-wrap gap-10">
		{#each iconNames as icon}
			<div class="flex flex-col items-center text-primary-100">
				<h2>{icon}</h2>
				<Icon name={icon} width="3rem" height="3rem" fill="currentColor" />
			</div>
		{/each}
	</div>
{/if}
