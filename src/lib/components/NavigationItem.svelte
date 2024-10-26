<script lang="ts">
	export let url;
	export let label;
</script>

<li>
	<a
		href={url}
		class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
		>{label}</a
	>
</li>
