<script>
	import Footer from '$lib/components/Footer.svelte';
</script>

<div id="layout container" class="flex min-h-screen flex-col">
	<div id="main content" class="mx-5 mb-10 mt-10 flex-grow md:mx-10 lg:mx-20">
		<slot />
	</div>
	<Footer />
</div>

<style>
</style>
