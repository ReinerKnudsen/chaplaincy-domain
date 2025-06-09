<script lang="ts">
	import { authStore, unloadUser } from '$lib/stores/AuthStore';
	import { auth } from '$lib/firebase/firebaseConfig';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import caplogo from '$lib/assets/chaplaincy_logo.png';
	import { about as aboutItems } from '$lib/data/data.json';

	import NavigationItem from '$lib/components/NavigationItem.svelte';
	import NavigationRollUp from '$lib/components/NavigationRollUp.svelte';

	let user;
	let menuOpen = false;
	let aboutMenuOpen = true;

	$: authStore.subscribe((store) => {
		user = store;
	});

	const handleLogout = async () => {
		try {
			await signOut(auth);
			goto('/');
			unloadUser();
		} catch (error) {
			console.error('Error signing out:', error);
		}
		if (menuOpen) toggleMobileMenu;
	};

	const toggleMobileMenu = () => {
		menuOpen = !menuOpen;
	};

	const toggleAboutMenu = () => {
		aboutMenuOpen = !aboutMenuOpen;
	};

	const handleLogin = () => {
		goto('/login');
		toggleMobileMenu();
	};

	const noop = () => {}; // No-operation function for default onClick
</script>

<nav
	class="sticky top-0 z-50 flex h-full min-h-28 w-full
	items-center justify-between divide-gray-100 rounded-b-2xl border-b
	border-gray-100 bg-white-primary px-4 py-2.5 text-gray-700 shadow-xl
	dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
>
	<!-- Logo -->
	<div class="nav-container flex w-full justify-between">
		<a href="/" class="flex items-center">
			<img class="logo-image me-3 h-9 lg:h-[70%]" src={caplogo} alt="Chaplaincy Logo" />
		</a>

		<!-- Mobile Menu -->
		<div class="mobile-menu-container lg:hidden">
			<button
				type="button"
				id="mobile-menu"
				class="m-0.5 ms-3 whitespace-normal rounded-lg p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:hover:bg-gray-600 lg:hidden"
				aria-label="Open main menu"
				on:click={toggleMobileMenu}
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
			{#if menuOpen}
				<div
					class="mobile-menu absolute left-[20%] top-28 z-20 w-[80%] cursor-pointer rounded-lg bg-white-primary px-4 py-4"
				>
					<ul class="mt-4 flex flex-col gap-2 p-4 text-primary-100">
						<NavigationItem url="/" label="Home" onClick={toggleMobileMenu} />
						<NavigationItem url="/worship" label="Worship" onClick={toggleMobileMenu} />
						<NavigationItem url="/news" label="News" onClick={toggleMobileMenu} />
						<NavigationItem url="/events" label="Events" onClick={toggleMobileMenu} />
						<NavigationItem url="/groups" label="Groups" onClick={toggleMobileMenu} />
						<NavigationItem url="#" label="About us" onClick={toggleAboutMenu} />
						{#if aboutMenuOpen}
							<div class="pl-4">
								<NavigationItem url="/about" label="Who we are" onClick={toggleMobileMenu} />
								<NavigationItem
									url="/about/responsibilities"
									label="Who is who"
									onClick={toggleMobileMenu}
								/>
								<NavigationItem
									url="/about/locations"
									label="Where we are"
									onClick={toggleMobileMenu}
								/>
								<NavigationItem
									url="/about/facbc"
									label="The FACBC e.V."
									onClick={toggleMobileMenu}
								/>
								<NavigationItem
									url="/about/safeguarding"
									label="Safeguarding"
									onClick={toggleMobileMenu}
								/>
								<NavigationItem
									url="/about/contact"
									label="Get in touch"
									onClick={toggleMobileMenu}
								/>
							</div>
						{/if}

						{#if $authStore.role === 'admin' || $authStore.role === 'editor'}
							<hr class="mb-4" />
							<NavigationItem url="/admin" label="Admin" onClick={toggleMobileMenu} />
						{/if}
					</ul>
				</div>
			{/if}
		</div>

		<!-- Desktop Menu -->
		<div class="menu hidden w-full cursor-pointer lg:block lg:w-auto">
			<ul
				class="mt-4 flex flex-col p-4 text-primary-100 lg:mt-0 lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium"
			>
				<NavigationItem url="/" label="Home" onClick={noop} />
				<NavigationItem url="/worship" label="Worship" onClick={noop} />
				<NavigationItem url="/news" label="News" onClick={noop} />
				<NavigationItem url="/events" label="Events" onClick={noop} />
				<NavigationItem url="/groups" label="Groups" onClick={noop} />
				<NavigationRollUp menuItems={aboutItems} title="About us" />
				{#if $authStore.role === 'admin' || $authStore.role === 'editor'}
					<NavigationItem url="/admin" label="Admin" onClick={noop} />
				{/if}
			</ul>
		</div>
	</div>
</nav>
