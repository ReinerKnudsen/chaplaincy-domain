<script>
	import { page } from '$app/stores';
	import NavButton from './NavButton.svelte';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

	$: activeUrl = $page.url.pathname;
	let activeClass =
		'flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
	let nonActiveClass =
		'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700';
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
			<SidebarItem label="User" href="/admin/useradmin">
				<!-- <svelte:fragment slot="icon">
					<UserSolid class="h-5 w-5" />
				</svelte:fragment> -->
			</SidebarItem>
			<SidebarItem label="Settings" href="/admin/settings">
				<!-- <svelte:fragment slot="icon">
					<ArrowRightToBracketSolid class="h-5 w-5" />
				</svelte:fragment> -->
			</SidebarItem>
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>

<!-- <div class="container">
	<NavButton label={'Dashboard'} url={'/admin'} />
	<NavButton label={'News'} url={'/admin/newsadmin'} />
	<NavButton label={'Events'} url={'/admin/eventsadmin'} />
	<NavButton label={'User'} url={'/admin/useradmin'} />
	<NavButton label={'Settings'} url={'/admin/settings'} />
</div> -->

<style>
	/* .container {
		height: 100vh;
		border-right: 1px solid #e5e5e5;
		box-shadow: 2px 2px 2px #e5e5e5;
	} */
</style>
