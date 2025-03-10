<script lang="ts">
	import { authStore, unloadUser } from '$lib/stores/AuthStore';
	import { auth, settingsColRef } from '$lib/firebase/firebaseConfig';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import caplogo from '$lib/assets/chaplaincy_logo.png';
	import { about as aboutItems } from '$lib/data/data.json';

	import type { MenuItem } from '$lib/types';

	import { page } from '$app/stores';
	import NavigationItem from '$lib/components/NavigationItem.svelte';
	import NavigationRollUp from '$lib/components/NavigationRollUp.svelte';

	let user;

	$: activeUrl = $page.url.pathname;
	$: authStore.subscribe((store) => {
		user = store;
	});

	const handleLogout = async () => {
		try {
			await signOut(auth);
			goto('/');
			console.log('User signed out');
			unloadUser();
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	const textSizeMenu = 'text-xl';
</script>

<nav
	class="sticky top-0 z-50 flex h-full min-h-28 w-full items-center divide-gray-100 rounded-b-2xl border-b border-gray-100 bg-white-primary px-2 py-2.5 align-middle text-gray-700 shadow-xl dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 sm:px-4"
>
	<div class="container mx-auto flex flex-wrap items-center justify-between">
		<a href="/" class="flex items-center">
			<img class="me-3 sm:h-9" src={caplogo} alt="Chaplaincy Logo" />
		</a>
		<button
			type="button"
			id="mobile-menu"
			class="m-0.5 ms-3 whitespace-normal rounded-lg p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:hover:bg-gray-600 md:hidden"
			aria-label="Open main menu"
			><span class="sr-only">Open main menu</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				role="button"
				tabindex="0"
				width="24"
				height="24"
				class="h-6 w-6 shrink-0"
				aria-label="bars 3"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4 6h16M4 12h16M4 18h16"
				></path>
			</svg></button
		>
		<div class="menu hidden w-full cursor-pointer md:block md:w-auto">
			<ul
				class="mt-4 flex flex-col p-4 text-primary-100 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
			>
				<NavigationItem url="/" label="Home" />
				<NavigationItem url="/worship" label="Worship" />
				<NavigationItem url="/news" label="News" />
				<NavigationItem url="/activities" label="Activities" />
				<NavigationItem url="/groups" label="Groups" />
				<NavigationRollUp menuItems={aboutItems} title="About us" />
				{#if $authStore.role === 'admin' || $authStore.role === 'editor'}
					<NavigationItem url="/admin" label="Admin" />
				{/if}
				{#if !$authStore.isLoggedIn}
					<NavigationItem url="/login" label="Login" />
				{:else}
					<li>
						<button
							class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
							on:click={handleLogout}>Sign out</button
						>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>
