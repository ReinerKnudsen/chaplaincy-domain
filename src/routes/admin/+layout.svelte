<script>
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="page-container">
	<div class="sidebar col-span-1 ml-2 mt-8">
		<Sidebar />
	</div>
	<div class="main-content col-span-11 p-5">
		<slot />
	</div>
</div>

<style>
	.page-container {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
	}
</style>
