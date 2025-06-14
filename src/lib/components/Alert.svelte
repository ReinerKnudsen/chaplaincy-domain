<script lang="ts">
	import { Icon, CheckCircle, ExclamationCircle, XCircle } from 'svelte-hero-icons';
	export let role: 'success' | 'warning' | 'error' = 'success';
	export let message: string;

	const roles = [
		{
			kind: 'success',
			icon: CheckCircle,
			color: 'text-white-primary',
		},
		{
			kind: 'warning',
			icon: ExclamationCircle,
			color: 'text-primary-text',
		},
		{
			kind: 'error',
			icon: XCircle,
			color: 'text-primary-text',
		},
	];

	const roleData = roles.find((xrole) => xrole.kind === role);
</script>

{#if roleData}
	<div role={roleData.kind} class={`alert alert-${roleData.kind} ${roleData.color} mb-6`}>
		<div class="flex flex-row items-center justify-start gap-4">
			<Icon src={roleData.icon} class="h-6 w-6" />
			<div>{message}</div>
		</div>
	</div>
{/if}
