<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { pathName } from '$lib/stores/NavigationStore';
	import { getAuth, type Auth, onAuthStateChanged, type User } from 'firebase/auth';
	import { screenSize } from '$lib/stores/ScreenSizeStore';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let auth: Auth = getAuth();
	let loading = $state(true);
	let screenWidth: number = $derived($screenSize);

	
	onMount(() => {
		$pathName = page.url.pathname;

		onAuthStateChanged(auth, (user: User | null) => {
			if (user) {
				user.getIdTokenResult().then((idTokenResult) => {
					const role = idTokenResult.claims.role as string;
					if (!['admin', 'editor'].includes(role)) {
						goto('/');
					} else {
						loading = false;
					}
				});
			} else {
				goto('/');
			}
		});
	});

	run(() => {
		$pathName = page.url.pathname;
	});

	interface MenuItem {
		name: string;
		url: string;
	}

	const adminMenu: MenuItem[] = [
		{
			name: 'Dashboard',
			url: '/admin',
		},
		{
			name: 'Events',
			url: '/admin/eventsadmin',
		},
		{
			name: 'News',
			url: '/admin/newsadmin',
		},
		{
			name: 'Locations',
			url: '/admin/locationsadmin',
		},
		{
			name: 'Weekly Sheet',
			url: '/admin/weeklysheet',
		},
	];
</script>

{#if loading}
	<div class="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
		<h1 class="text-3xl font-bold text-gray-900">Loading...</h1>
	</div>
{:else}
	<div
		id="content-container"
		class="mx-auto mb-20 flex max-w-[1400px] flex-col px-4 sm:px-6 lg:px-8"
	>
		<nav>
			<div
				id="subNav"
				class="flex h-[60px] w-full flex-row items-center rounded-lg bg-white p-5 shadow-xl"
			>
				{#each adminMenu as item, i}
					<div class="px-8 {i !== adminMenu.length - 1 ? 'border-r border-gray-300' : ''}">
						{#if item.url === $pathName}
							<div class="cursor-not-allowed font-light text-gray-500">{item.name}</div>
						{:else}
							<a href={item.url} class="hover:text-primary-600 font-semibold transition-colors"
								>{item.name}</a
							>
						{/if}
					</div>
				{/each}
			</div>
		</nav>

		<div id="main-content" class="mt-10 mb-10">
			{@render children?.()}
		</div>
	</div>
{/if}
