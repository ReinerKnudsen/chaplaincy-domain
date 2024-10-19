<script lang="ts">
	import type { MenuItem } from '$lib/types';

	export let title: string;
	export let menuItems: MenuItem[];

	let showDropdown = false;

	const toggleDropdown = () => {
		showDropdown = !showDropdown;
	};
</script>

<div>
	<li class="group relative">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<button class="text-xl" on:click|preventDefault={toggleDropdown}>{title}</button>
		{#if showDropdown}
			<div
				class="ring-black absolute left-0 mt-2 w-48 rounded-md bg-white-primary shadow-lg ring-1 ring-opacity-5"
			>
				{#each menuItems as menuItem}
					<div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
						<a
							href={menuItem.url}
							class="block px-4 py-2 text-sm text-primary-100 hover:bg-gray-100 hover:text-gray-900"
							role="menuitem"
							on:click={toggleDropdown}>{menuItem.title}</a
						>
					</div>
				{/each}
			</div>
		{/if}
	</li>
</div>
