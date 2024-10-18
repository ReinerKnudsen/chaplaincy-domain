<script>
  import { page } from "$app/stores";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Dropdown,
    DropdownDivider,
    DropdownItem,
  } from "flowbite-svelte";
  import Icon from "$lib/components/Icon.svelte";

  import { authStore, unloadUser } from "$lib/stores/AuthStore";
  import { auth, imgStorageRef } from "$lib/firebase/firebaseConfig";
  import { goto } from "$app/navigation";
  import { signOut } from "firebase/auth";
  import caplogo from "$lib/assets/chaplaincy_logo.png";

  let user;

  $: activeUrl = $page.url.pathname;

  $: authStore.subscribe((store) => {
    user = store;
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      goto("/");
      console.log("User signed out");
      unloadUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  let showDropdown = false;
  const toggleDropdown = () => {
    showDropdown = !showDropdown;
  };

  const textSizeMenu = "text-xl";
</script>

<nav
  class="z-999 sticky top-0 flex h-full min-h-28 w-full items-center divide-gray-100 rounded-b-2xl border-b border-gray-100 bg-white-primary px-2 py-2.5 align-middle text-gray-700 shadow-xl dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 sm:px-4"
>
  <div class="container mx-auto flex flex-wrap items-center justify-between">
    <a href="/" class="flex items-center">
      <img class="me-3 sm:h-9" src={caplogo} alt="Chaplaincy Logo" />
    </a>
    <button
      type="button"
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
    <div class="w-full cursor-pointer md:block md:w-auto" hidden="true">
      <ul
        class="mt-4 flex flex-col p-4 text-primary-100 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
      >
        <li>
          <a
            href="/"
            class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
            >Home</a
          >
        </li>
        <li>
          <a
            href="/news"
            class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
            >News</a
          >
        </li>
        <li>
          <a
            href="/events"
            class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
            >Events</a
          >
        </li>
        <li>
          <a
            href="/groups"
            class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
            >Groups</a
          >
        </li>
        <li>
          <a
            href="/prayers"
            class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
            >Pray with us</a
          >
        </li>
        <li class="group relative">
          <a href="" class="text-xl" on:click|preventDefault={toggleDropdown}
            >About us</a
          >
          {#if showDropdown}
            <div
              class="ring-black absolute left-0 mt-2 w-48 rounded-md bg-white-primary shadow-lg ring-1 ring-opacity-5"
            >
              <div
                class="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="/about"
                  class="block px-4 py-2 text-sm text-primary-100 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  on:click={toggleDropdown}>Who we are</a
                >
                <a
                  href="/about/responsibilities"
                  class="block px-4 py-2 text-sm text-primary-100 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  on:click={toggleDropdown}>Responsibilities</a
                >
                <a
                  href="/about/safeguarding"
                  class="block px-4 py-2 text-sm text-primary-100 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  on:click={toggleDropdown}>Safeguarding</a
                >
                <a
                  href="/about/contact"
                  class="block px-4 py-2 text-sm text-primary-100 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  on:click={toggleDropdown}>Get in touch</a
                >
              </div>
            </div>
          {/if}
        </li>
        {#if $authStore.role === "admin" || $authStore.role === "editor"}
          <li>
            <a
              href="/admin"
              class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
              >Admin</a
            >
          </li>
        {/if}
        {#if !$authStore.isLoggedIn}
          <li>
            <a
              href="/login"
              class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
              >Sign in</a
            >
          </li>
        {:else}
          <li>
            <button
              class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
              on:click={handleLogout}>Sign out</button
            >
            <!--<div
							role="link"
							href=""
							class="md:hover:text-primary-700 md:dark:hover:text-white dark:hover:text-white block rounded py-2 pe-4 ps-3 text-xl text-primary-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:border-0 md:p-0 md:hover:bg-transparent md:dark:hover:bg-transparent"
							on:click={handleLogout}
						>
							Sign out
						</div>-->
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>
