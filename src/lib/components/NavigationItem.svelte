<script>
	export let url;
	export let label;
	export let onClick;
</script>

<li>
	<a
		href={url}
		class="lg:hover:text-primary-700 lg:dark:hover:text-white dark:hover:text-white text-md block rounded py-2 pe-4 ps-3 text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:text-xl lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent"
		on:click={onClick}>{label}</a
	>
</li>
