<script>
	import { page } from '$app/stores';
	import NavButton from './NavButton.svelte';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

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
	{#if $page.url.pathname.includes('create')}
		<div class="mt-10 bg-slate-100 py-2 pl-7 text-slate-600">
			<h4>Using the editor</h4>
			<div class="text-sm">
				<p class="mb-2">This is how to use the editor:</p>
				<p class="mb-2">
					Add <b>line breaks</b> as required. The text will be displayed as it shown in the editor.
				</p>
				<p class="mb2">Enclose text in &lt;b&gt; and &lt;/b&gt; to print <b>bold</b> text.</p>
				<pre class="mb-2">&lt;b&gt;bold text&lt;/b&gt;</pre>
				<p class="mb2">Enclose text in &lt;i&gt; and &lt;/i&gt; to print <i>italic</i> text.</p>
				<pre class="mb-2">&lt;i&gt;italic text&lt;/i&gt;</pre>
				<p class="mb-2"></p>
			</div>
		</div>
	{/if}
</Sidebar>

<style>
</style>
