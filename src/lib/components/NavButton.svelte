<script lang="ts">
	import { goto } from '$app/navigation';
	export let label: string;
	export let url: string;

	const handleClick = () => {
		goto(url);
	};
</script>

<div>
	<button class="h-12 w-full pl-5 text-left font-semibold" on:click={handleClick}>{label}</button>
</div>

<style>
	button:hover {
		@apply bg-slate-300;
	}
</style>
