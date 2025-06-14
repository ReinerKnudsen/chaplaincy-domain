<script lang="ts">
	import type { MenuItem } from '$lib/types.d';
	import { onMount } from 'svelte';

	export let title: string;
	export let menuItems: MenuItem[];

	let showDropdown = false;

	const toggleDropdown = () => {
		showDropdown = !showDropdown;
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (!event.target) return;

		const target = event.target as HTMLElement;
		const isMenuButton = target.closest('button.menuitem');
		const isDropdown = target.closest('.dropdown');

		// Don't close if clicking the menu button (let toggleDropdown handle it)
		if (isMenuButton) return;

		// Don't close if clicking inside the dropdown
		if (isDropdown) return;

		// Close the dropdown for clicks outside
		showDropdown = false;
	};

	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div>
	<button
		type="button"
		class="menuitem btn btn-outline text-primary-80 border-0 text-xl font-semibold"
		on:click|preventDefault={toggleDropdown}>{title}</button
	>
	{#if showDropdown}
		<div
			class="nav-menu bg-white-primary absolute right-8 z-50 mt-2 w-48 rounded-md border border-gray-200 py-4 shadow-lg"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="options-menu"
		>
			{#each menuItems as menuItem}
				<a
					href={menuItem.url}
					class="text-primary-100 block px-6 py-3 text-sm transition-colors first:rounded-t-md last:rounded-b-md hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-50"
					role="menuitem"
					on:click={toggleDropdown}
				>
					{menuItem.title}
				</a>
			{/each}
		</div>
	{/if}
</div>
