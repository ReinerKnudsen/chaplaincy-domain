<script>
	import { page } from '$app/stores';
	import { authStore } from '$lib/stores/AuthStore';

	import NavButton from './NavButton.svelte';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

	let userRole = $authStore.role;

	$: activeUrl = $page.url.pathname;
	let activeClass =
		'flex items-center p-2 text-lg font-semibold text-white-primary bg-primary-100 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-60 dark:hover:bg-gray-700';
	let nonActiveClass =
		'flex items-center p-2 text-lg font-normal text-green-900 rounded-lg dark:text-white hover:bg-primary-20 dark:hover:bg-green-700';
</script>

<Sidebar {activeUrl} {activeClass} {nonActiveClass}>
	<SidebarWrapper>
		<SidebarGroup>
			<SidebarItem label="Dashboard" href="/admin">
				<!-- <svelte:fragment slot="icon">
					<HomeOutline class="h-5 w-5" />
				</svelte:fragment> -->
			</SidebarItem>
			<SidebarItem label="Events" href="/admin/eventsadmin">
				<!-- <svelte:fragment slot="icon">
					<GridSolid class="h-5 w-5" />
				</svelte:fragment> -->
			</SidebarItem>
			<SidebarItem label="News" href="/admin/newsadmin">
				<!-- <svelte:fragment slot="icon">
					<MailBoxSolid class="h-5 w-5" />
				</svelte:fragment> -->
			</SidebarItem>
		</SidebarGroup>
		{#if userRole === 'admin'}
			<SidebarGroup>
				<SidebarItem label="User" href="/admin/useradmin">
					<!-- <svelte:fragment slot="icon">
					<UserSolid class="h-5 w-5" />
				</svelte:fragment> -->
				</SidebarItem>
				<SidebarItem label="" href="/admin/settings">
					<!-- <svelte:fragment slot="icon">
					<ArrowRightToBracketSolid class="h-5 w-5" />
				</svelte:fragment> -->
				</SidebarItem>
			</SidebarGroup>
		{/if}
	</SidebarWrapper>
</Sidebar>

<style>
</style>
