<script lang="ts">
	import type { MenuItem } from '$lib/types';
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
	<li class="group relative">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<button
			class="menuitem btn btn-outline text-primary-80 border-0 text-xl font-semibold"
			on:click|preventDefault={toggleDropdown}
			><a href="#" class="text-primary-80">{title}</a></button
		>
		{#if showDropdown}
			<div
				class="dropdown bg-white-primary ring-opacity-5 absolute right-0 z-50 mt-14 w-48 rounded-md shadow-lg ring-1 ring-black"
			>
				{#each menuItems as menuItem}
					<div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
						<a
							href={menuItem.url}
							class="text-primary-100 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
							role="menuitem"
							on:click={toggleDropdown}>{menuItem.title}</a
						>
					</div>
				{/each}
			</div>
		{/if}
	</li>
</div>
