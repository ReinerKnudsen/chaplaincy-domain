<script lang="ts">
	import { goto } from '$app/navigation';
	interface Props {
		label: string;
		url: string;
	}

	let { label, url }: Props = $props();

	const handleClick = () => {
		goto(url);
	};
</script>

<div>
	<button class="h-12 w-full pl-5 text-left font-semibold" onclick={handleClick}>{label}</button>
</div>

<style>
	button:hover {
		@apply bg-slate-300;
	}
</style>
