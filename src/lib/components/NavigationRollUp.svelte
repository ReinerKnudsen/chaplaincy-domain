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
		if (event.target) {
			/** if the target of the click was the menu item, don't close the dropdown */
			if (showDropdown && (event.target as HTMLElement).classList.contains('menuitem')) {
				return;
			}

			/** if the target of the click was the dropdown, don't close the dropdown */
			const dropdownElement = document.querySelector('.dropdown');
			if (!dropdownElement) {
				return;
			}

			/** if the event target is NOT child of the dropdown, close the dropdown */
			if (!dropdownElement.contains(event.target as Node)) {
				showDropdown = false;
			}
		}
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
		<button class="menuitem text-md xl:text-xl" on:click|preventDefault={toggleDropdown}
			>{title}</button
		>
		{#if showDropdown}
			<div
				class="dropdown bg-white-primary ring-opacity-5 absolute right-0 z-50 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black"
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
