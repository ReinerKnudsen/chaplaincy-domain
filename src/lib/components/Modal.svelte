<script lang="ts">
	import Icon from './Icon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let type: 'warning' | 'info' = 'info';
	export let header: string;
	export let content: string;
	export let secondaryBtnText: string;
	export let primaryBtnText: string;
	export let open: boolean = false;
	const dispatch = createEventDispatcher();
</script>

{#if open}
	<div class="modal-container">
		<div class="modal-icon {type}">
			<Icon name={type} width="3rem" height="3rem" />
		</div>
		<div class="modal-header">{header}</div>
		<div class="modal-content">{@html content}</div>
		<div class="modal-buttons">
			<button class="btn btn-secondary" on:click={() => dispatch('secondary')}
				>{secondaryBtnText}</button
			>
			<button class="btn btn-primary {type}" on:click={() => dispatch('primary')}
				>{primaryBtnText}</button
			>
		</div>
	</div>
{/if}
