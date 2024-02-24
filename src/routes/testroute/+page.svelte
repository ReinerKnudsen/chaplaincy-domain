<script>
	import NavButton from '../../lib/components/NavButton.svelte';
	import Sidebar from '../../lib/components/Sidebar.svelte';
</script>

<div class="page-container">
	<div class="sidebar col-span-1 ml-2">
		<Sidebar />
	</div>
	<div class="main-content p-5">Guck guck</div>
</div>

<style>
	.page-container {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
	}
</style>
