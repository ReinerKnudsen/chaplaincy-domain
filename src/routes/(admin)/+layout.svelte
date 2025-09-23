<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { pathName } from '$lib/stores/NavigationStore';
	import { getAuth, type Auth, onAuthStateChanged, type User } from 'firebase/auth';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let auth: Auth = getAuth();
	let loading = $state(true);

	onMount(() => {
		pathName.set(page.url.pathname);
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
			name: 'Notices',
			url: '/admin/noticesadmin',
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
	<div id="content-container" class="mx-auto mb-20 flex flex-col px-4 sm:px-6 md:max-w-[1400px] lg:px-8">
		<nav>
			<div
				id="subNav"
				class="flex h-[60px] w-full flex-row flex-wrap items-center rounded-lg bg-white px-2 shadow-xl md:flex-nowrap md:p-5"
			>
				{#each adminMenu as item, i}
					<div class="px-2 md:px-8 md:py-4">
						<a
							href={item.url}
							class="hover:text-primary-600
							{item.url === $pathName ? 'text-seablue-100 font-bold' : 'text-primary-100 font-semibold'} 

transition-colors">{item.name}</a
						>
					</div>
				{/each}
			</div>
		</nav>

		<div id="main-content" class="mt-10 mb-10">
			{@render children?.()}
		</div>
	</div>
{/if}
