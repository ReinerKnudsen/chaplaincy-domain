<script>
	import { page } from '$app/stores';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownDivider,
		DropdownItem
	} from 'flowbite-svelte';
	import Icon from '$lib/components/Icon.svelte';

	import { authStore, unloadUser } from '$lib/stores/AuthStore';
	import { auth, imgStorageRef } from '$lib/firebase/firebaseConfig';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import caplogo from '$lib/assets/chaplaincy_logo.png';

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

<Navbar class="sticky top-0 w-full border-b px-2 py-5 sm:px-4">
	<NavBrand href="/">
		<img src={caplogo} class="me-3 sm:h-9" alt="Chaplaincy Logo" />
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl} class="cursor-pointer">
		<NavLi href="/">Home</NavLi>
		<NavLi href="/news">News</NavLi>
		<!-- <NavLi href="/activities">Activities</NavLi> -->
		<NavLi href="/events">Events</NavLi>
		<NavLi href="/groups">Groups</NavLi>
		<NavLi href="/prayers">Pray with us</NavLi>
		<NavLi class="cursor-pointer">About us</NavLi>
		<Dropdown class=" z20 w-44">
			<DropdownItem href="/about">Who we are</DropdownItem>
			<DropdownItem href="/about/responsibilities">Responsibilities</DropdownItem>
			<DropdownItem href="/about/safeguarding">Safeguarding</DropdownItem>
			<DropdownDivider />
			<DropdownItem href="/about/contact">Get in touch</DropdownItem>
		</Dropdown>
		{#if $authStore.role === 'admin' || $authStore.role === 'editor'}
			<NavLi href="/admin">Admin</NavLi>
		{/if}
		{#if !$authStore.isLoggedIn}
			<NavLi href="/login">Register/Sign in</NavLi>
		{:else}
			<NavLi on:click={handleLogout}>Sign out</NavLi>
		{/if}
	</NavUl>
</Navbar>
