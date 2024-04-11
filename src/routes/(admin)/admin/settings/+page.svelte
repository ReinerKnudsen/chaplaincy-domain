<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { pathName } from '$lib/stores/NavigationStore';

	onMount(() => {
		$pathName = $page.url.pathname;
	});
</script>

<div></div>

<style>
</style>
