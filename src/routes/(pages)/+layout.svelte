<script>
	import Footer from '$lib/components/Footer.svelte';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div id="page-content" class="mx-auto mb-20 max-w-[1400px] flex-1 px-4 sm:px-6 lg:px-8">
	{@render children?.()}
</div>

<style>
</style>
