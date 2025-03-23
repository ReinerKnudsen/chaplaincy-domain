<script>
	import { page } from '$app/stores';
	import { pathName } from '$lib/stores/NavigationStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';

	import { size } from '$lib/utils/constants';

	import Sidebar from '$lib/components/Sidebar.svelte';
	import { screenSize } from '$lib/stores/ScreenSizeStore';

	let auth = getAuth();
	let loading = true;

	$: screenWidth = $screenSize;
	onMount(() => {
		$pathName = $page.url.pathname;

		onAuthStateChanged(auth, (user) => {
			if (user) {
				user.getIdTokenResult().then((idTokenResult) => {
					if (!['admin', 'editor'].includes(idTokenResult.claims.role)) {
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

	const adminMenu = [
		{
			name: 'Activities',
			url: '/admin/activities',
		},
		{
			name: 'News',
			url: '/admin/news',
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
	<!-- <div class="page-container">
		<div class="sidebar col-span-1 ml-2 mt-8 hidden sm:block">
			<Sidebar />
		</div> -->
	<div class="main-content col-span-11 p-5">
		<slot />
	</div>
	<!-- </div> -->
{/if}

<style>
	.page-container {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
	}
</style>
