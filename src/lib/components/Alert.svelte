<script lang="ts">
	import Icon from '@iconify/svelte';

	interface Props {
		role?: 'success' | 'warning' | 'error';
		message: string;
	}

	let { role = 'success', message }: Props = $props();

	const roles = [
		{
			kind: 'success',
			icon: 'heroicons-outline:check-circle',
			color: 'text-white-primary',
		},
		{
			kind: 'warning',
			icon: 'heroicons-outline:exclamation-circle',
			color: 'text-primary-text',
		},
		{
			kind: 'error',
			icon: 'heroicons-outline:x-circle',
			color: 'text-primary-text',
		},
	];

	const roleData = roles.find((xrole) => xrole.kind === role);
</script>

{#if roleData}
	<div role={roleData.kind} class={`alert alert-${roleData.kind} ${roleData.color} mb-6`}>
		<div class="flex flex-row items-center justify-start gap-4">
			<Icon icon={roleData.icon} class="h-6 w-6" />
			<div>{message}</div>
		</div>
	</div>
{/if}
