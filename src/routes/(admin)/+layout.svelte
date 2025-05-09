<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { pathName } from '$lib/stores/NavigationStore';
	import { getAuth, type Auth, onAuthStateChanged, type User } from 'firebase/auth';
	import { screenSize } from '$lib/stores/ScreenSizeStore';

	let auth: Auth = getAuth();
	let loading = true;
	let screenWidth: number;

	$: screenWidth = $screenSize;
	onMount(() => {
		$pathName = $page.url.pathname;

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

	$: $pathName = $page.url.pathname;

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
	<div class="w-100 ml-3">
		<h1>Loading...</h1>
	</div>
{:else}
	<nav>
		<div class="subNav">
			{#each adminMenu as item}
				<div class="subNavItem">
					{#if item.url === $pathName}
						<div class="inactive">{item.name}</div>
					{:else}
						<a href={item.url}>{item.name}</a>
					{/if}
				</div>
			{/each}
		</div>
	</nav>

	<div class="main-content p-5">
		<slot />
	</div>
{/if}

<style>
	.subNav {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 20px;
		background-color: white;
		width: 100%;
		border-radius: 10px;
		height: 60px;

		@apply shadow-xl;
	}

	.subNavItem {
		border-right: 1px solid #c3c3c3;
		padding: 0 30px;
	}

	.inactive {
		cursor: not-allowed;
		font-weight: 300;
	}

	.subNavItem > a {
		font-weight: 900;
	}

	.subNavItem:last-child {
		border-right: none;
	}
</style>
