<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { pathName } from '$lib/stores/NavigationStore';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Checkbox,
		Search,
		Button
	} from 'flowbite-svelte';

	onMount(() => {
		$pathName = $page.url.pathname;
	});

	export let data;
	const users = data.users;
	console.log(users);
	const handleClick = async () => {
		return;
	};
</script>

<div>
	<h1>User</h1>
	<div class="mb-6 grid grid-cols-12 gap-20">
		<!-- <div class="col-span-9"><Search on:input={handleSearchInput} /></div> -->
		<!-- <div class="col-span-3 justify-self-end">
			<Button on:click={handleClick}>Create Event</Button>
		</div> -->
	</div>
</div>

<style>
</style>
