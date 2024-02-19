<script>
	import { page } from '$app/stores';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { isLoggedIn, unloadUser } from './stores/AuthStore';
	import { auth } from './firebase/firebaseConfig';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';

	$: activeUrl = $page.url.pathname;

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				goto('/');
				console.log('User signed out');
				unloadUser();
			})
			.catch((error) => {
				console.error('Error logging out:', error);
			});
	};
</script>

<Navbar class="sticky top-0 z-20 w-full border-b px-2 py-2.5 sm:px-4">
	<NavBrand href="/">
		<img src="/assets/chaplaincy_logo.png" class="me-3 h-6 sm:h-9" alt="Chaplaincy Logo" />
		<span class="text-md self-center whitespace-nowrap font-semibold dark:text-white"
			>Anglican Chaplaincy of Bonn and Cologne</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl} class="cursor-pointer">
		<NavLi href="/">Home</NavLi>
		<NavLi href="/news">News</NavLi>
		<NavLi href="/activities">Activities</NavLi>
		<NavLi href="/groups">Groups</NavLi>
		<NavLi href="/events">Events</NavLi>
		<NavLi href="/about">About us</NavLi>
		{#if !$isLoggedIn}
			<NavLi href="/login">Register/Login</NavLi>
		{:else}
			<NavLi on:click={handleLogout}>Logout</NavLi>
		{/if}
	</NavUl>
</Navbar>
