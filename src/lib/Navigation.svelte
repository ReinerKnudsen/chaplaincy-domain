<script>
	import { page } from '$app/stores';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	$: activeUrl = $page.url.pathname;
</script>

<Navbar class="sticky top-0 z-20 w-full border-b px-2 py-2.5 sm:px-4">
	<NavBrand href="/">
		<img src="/src/lib/assets/chaplaincy_logo.png" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
		<span class="text-md self-center whitespace-nowrap font-semibold dark:text-white"
			>Anglican Chaplaincy of Bonn and Cologne</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/news">News</NavLi>
		<NavLi href="/activities">Activities</NavLi>
		<NavLi href="/groups">Groups</NavLi>
		<NavLi href="/events">Events</NavLi>
		<NavLi href="/about">About us</NavLi>
	</NavUl>
</Navbar>

<!-- <nav
	class="sticky top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900"
>
	<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
		<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
			<img src="/src/images/chaplaincy_logo.png" class="h-8" alt="Chaplaincy Logo" />
			<span class="self-center whitespace-nowrap text-lg font-semibold dark:text-white"
				>Anglican Chaplaincy of Bonn and Cologne</span
			>
		</a>

		<div
			class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
			id="navbar-sticky"
		>
			<ul
				class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse"
			>
				<li>
					<a
						href="/"
						class="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
						aria-current="page">Home</a
					>
				</li>
				<li>
					<a
						href="/articles"
						class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
						>Articles</a
					>
				</li>
				<li>
					<a
						href="/events"
						class="hover:bg-gray-100dark:border-gray-700 block rounded px-3 py-2 text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
						>Events</a
					>
				</li>
				<li>
					<a
						href="/about"
						class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
						>About us</a
					>
				</li>
			</ul>
		</div>
	</div>
</nav> -->
