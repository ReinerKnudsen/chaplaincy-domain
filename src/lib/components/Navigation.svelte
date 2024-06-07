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

	const textSizeMenu = 'text-xl';
</script>

<nav
	class="z-999 sticky top-0 flex h-full min-h-28 w-full items-center rounded-b-2xl border-b bg-white-primary px-2 align-middle shadow-xl sm:px-4"
>
	<a href="/" class="mr-4">
		<img src={caplogo} alt="Chaplaincy Logo" class="h-8" />
	</a>
	<ul class="flex space-x-4">
		<li><a href="/" class="text-xl">Home</a></li>
		<li><a href="/news" class="text-xl">News</a></li>
		<li><a href="/events" class="text-xl">Events</a></li>
		<li><a href="/groups" class="text-xl">Groups</a></li>
		<li><a href="/prayers" class="text-xl">Pray with us</a></li>
		<li><a href="/about" class="text-xl">About us</a></li>
		<!-- Add more links as needed -->
	</ul>
</nav>

<Navbar
	class="z-999 sticky top-0 flex h-full min-h-28 w-full items-center  rounded-b-2xl border-b bg-white-primary px-2 align-middle shadow-xl sm:px-4"
>
	<NavBrand href="/">
		<img src={caplogo} class="me-3 sm:h-9" alt="Chaplaincy Logo" />
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl} class="cursor-pointer">
		<NavLi class={textSizeMenu} href="/">Home</NavLi>
		<NavLi class={textSizeMenu} href="/news">News</NavLi>
		<!-- <NavLi class={textSizeMenu} href="/activities">Activities</NavLi> -->
		<NavLi class={textSizeMenu} href="/events">Events</NavLi>
		<NavLi class={textSizeMenu} href="/groups">Groups</NavLi>
		<NavLi class={textSizeMenu} href="/prayers">Pray with us</NavLi>
		<NavLi class={textSizeMenu}>About us</NavLi>
		<Dropdown class=" z20 w-44">
			<DropdownItem href="/about">Who we are</DropdownItem>
			<DropdownItem href="/about/responsibilities">Responsibilities</DropdownItem>
			<DropdownItem href="/about/safeguarding">Safeguarding</DropdownItem>
			<DropdownDivider />
			<DropdownItem href="/about/contact">Get in touch</DropdownItem>
		</Dropdown>
		{#if $authStore.role === 'admin' || $authStore.role === 'editor'}
			<NavLi class={textSizeMenu} href="/admin">Admin</NavLi>
		{/if}
		{#if !$authStore.isLoggedIn}
			<NavLi class={textSizeMenu} href="/login">Register/Sign in</NavLi>
		{:else}
			<NavLi class={textSizeMenu} on:click={handleLogout}>Sign out</NavLi>
		{/if}
	</NavUl>
</Navbar>
