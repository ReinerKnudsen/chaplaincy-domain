<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore, unloadUser } from '$lib/stores/AuthStore';
	import { auth } from '$lib/firebase/firebaseConfig';
	import { signOut } from 'firebase/auth';

	import caplogo from '$lib/assets/chaplaincy_logo.png';
	import { menu } from '$lib/data/menu.json';

	import { Button } from '$lib/components/ui/button';

	interface MenuItem {
		title: string;
		url: string;
		active: boolean;
		subMenu?: MenuItem[];
	}

	let user = $state<any>(null);
	let mobileMenuOpen = $state(false);

	$effect(() => {
		user = $authStore.user;
	});

	const handleLogout = async () => {
		try {
			await signOut(auth);
			goto('/');
			unloadUser();
		} catch (error) {
			console.error('Error signing out:', error);
		}
		mobileMenuOpen = false;
	};

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};

	const closeMobileMenu = () => {
		mobileMenuOpen = false;
	};

	const handleLogin = () => {
		goto('/login');
		mobileMenuOpen = false;
	};
</script>

<nav
	class="sticky top-0 z-50 flex h-full min-h-28 w-full items-center justify-between border-b border-gray-100 bg-white px-4 py-2.5 text-gray-700 shadow-xl"
>
	<!-- Logo -->
	<div class="nav-container flex w-full justify-between">
		<a href="/" class="flex items-center">
			<img class="logo-image me-3 h-9 lg:h-[70%]" src={caplogo} alt="Chaplaincy Logo" />
		</a>

		<!-- Mobile Menu Button -->
		<div class="lg:hidden">
			<button
				type="button"
				class="rounded-lg p-2 hover:bg-gray-100"
				aria-label="Toggle mobile menu"
				onclick={toggleMobileMenu}
			>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
				</svg>
			</button>
		</div>

		<!-- Desktop Menu -->
		<div class="hidden lg:flex lg:items-center lg:space-x-6">
			{#each menu as menuItem}
				{#if menuItem.active}
					{#if menuItem.subMenu && menuItem.subMenu.length > 0}
						<!-- Desktop Dropdown -->
						<div class="group relative">
							<Button variant="menu">
								{menuItem.title}
								<svg class="ml-1 inline h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									></path>
								</svg>
							</Button>
							<div
								class="invisible absolute left-0 z-50 mt-2 w-48 rounded-md bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100"
							>
								{#each menuItem.subMenu as subItem}
									{#if subItem.active}
										<a href={subItem.url} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
											{subItem.title}
										</a>
									{/if}
								{/each}
							</div>
						</div>
					{:else}
						<Button variant="menu">
							<a href={menuItem.url} class="px-3 py-2 font-medium text-gray-700 hover:text-blue-600">
								{menuItem.title}
							</a>
						</Button>
					{/if}
				{/if}
			{/each}

			<!-- Admin Link -->
			{#if $authStore?.role === 'admin' || $authStore?.role === 'author' || $authStore?.role === 'editor'}
				<Button variant="menu"
					><a href="/admin/" class="px-3 py-2 font-medium text-gray-700 hover:text-blue-600">Admin</a></Button
				>
			{/if}
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="absolute top-full left-0 z-40 w-full bg-white shadow-lg lg:hidden">
			<div class="px-4 py-2">
				{#each menu as menuItem}
					{#if menuItem.active}
						{#if menuItem.subMenu && menuItem.subMenu.length > 0}
							<div class="py-2">
								<div class="py-2 font-medium text-gray-900">{menuItem.title}</div>
								<div class="pl-4">
									{#each menuItem.subMenu as subItem}
										{#if subItem.active}
											<a
												href={subItem.url}
												onclick={closeMobileMenu}
												class="block py-2 text-gray-600 hover:text-blue-600"
											>
												{subItem.title}
											</a>
										{/if}
									{/each}
								</div>
							</div>
						{:else}
							<a
								href={menuItem.url}
								onclick={closeMobileMenu}
								class="block py-3 font-medium text-gray-700 hover:text-blue-600"
							>
								{menuItem.title}
							</a>
						{/if}
					{/if}
				{/each}

				<div class="mt-2 border-t pt-2">
					{#if $authStore?.role === 'admin' || $authStore?.role === 'author' || $authStore?.role === 'editor'}
						<a href="/admin/" onclick={closeMobileMenu} class="block py-2 font-medium text-gray-700 hover:text-blue-600"
							>Admin</a
						>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</nav>
