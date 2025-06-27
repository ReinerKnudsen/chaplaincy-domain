<script lang="ts">
	import type { MenuItem } from '$lib/types.d';
	import { onMount } from 'svelte';

	interface Props {
		title: string;
		menuItems: MenuItem[];
	}

	let { title, menuItems }: Props = $props();

	let showDropdown = $state(false);

	const toggleDropdown = () => {
		showDropdown = !showDropdown;
		console.log(showDropdown);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (!event.target) return;

		const target = event.target as HTMLElement;
		const isMenuButton = target.closest('#showMenue');
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
		id="showMenue"
		class="btn btn-outline border-0 text-xl font-semibold"
		onclick={toggleDropdown}><span class="text-primary-80">{title}</span></button
	>
	{#if showDropdown}
		<div
			class="dropdown nav-menu bg-white-primary absolute right-8 z-50 mt-10 w-48 rounded-md border border-gray-200 py-4 shadow-lg"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="options-menu"
		>
			{#each menuItems as menuItem}
				<a
					href={menuItem.url}
					class="text-primary-100 block px-6 py-3 text-sm transition-colors first:rounded-t-md last:rounded-b-md hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-50"
					role="menuitem"
					onclick={toggleDropdown}
				>
					{menuItem.title}
				</a>
			{/each}
		</div>
	{/if}
</div>
