<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase/firebaseConfig';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { doc, getDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';

	import { authStore, unloadUser } from '$lib/stores/AuthStore';

	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink,
		FooterIcon,
	} from 'flowbite-svelte';

	import Icon from '$lib/components/Icon.svelte';

	let environment;
	let loading = true;

	onMount(async () => {
		const docRef = doc(database, 'settings', 'env');
		const docSnapshot = await getDoc(docRef);
		if (docSnapshot.exists()) {
			environment = docSnapshot.data().name;
		}
		loading = false;
	});

	const handleLogin = () => {
		goto('/login');
	};

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
</script>

<Footer footerType="socialmedia" class=" rounded-t-2xl bg-white-primary shadow-xl ">
	<div class="pl-8 md:flex md:justify-between">
		<div class="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-6 lg:gap-8">
			<div>
				<h2 class="dark:text-white mb-6 text-sm font-semibold uppercase text-gray-900">
					Resources
				</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="/newsletter/archive">Newsletter Archive</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="dark:text-white mb-6 text-sm font-semibold uppercase text-gray-900">
					Follow us
				</h2>
				<FooterLinkGroup>
					<FooterLink
						liClass="mb-4"
						href="https://www.facebook.com/AnglicanBonnCologne"
						target="_blank"
						>Facebook
					</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="dark:text-white mb-6 text-sm font-semibold uppercase text-gray-900">Legal</h2>
				<FooterLinkGroup>
					<FooterLink liClass="mb-4" href="/legal">Privacy Policy</FooterLink>
					<FooterLink liClass="mb-4" href="/impressum">Impressum</FooterLink>
				</FooterLinkGroup>
			</div>
			<div>
				<h2 class="dark:text-white mb-6 text-sm font-semibold uppercase text-gray-900">User</h2>
				<FooterLinkGroup>
					{#if !$authStore.isLoggedIn}
						<button class="text-md" on:click={handleLogin}>Login</button>
					{:else}
						<button class="text-md" on:click={handleLogout}>Sign out</button>
					{/if}
				</FooterLinkGroup>
			</div>
		</div>
	</div>
	<hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
	<div class=" pl-8 pr-8 sm:flex sm:items-center sm:justify-between">
		<FooterCopyright href="/" by="Sleepy Panda " />
		<div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-center rtl:space-x-reverse">
			<FooterIcon href="https://www.facebook.com/AnglicanBonnCologne/">
				<Icon
					name="facebook"
					class="dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
				/>
			</FooterIcon>
			<FooterIcon href="https://www.achurchnearyou.com/church/8388/">
				<Icon
					name="churchnearyou"
					class="dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
				/>
			</FooterIcon>
			<FooterIcon href="/">
				<Icon
					name="email"
					class="dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
				/>
			</FooterIcon>
		</div>
	</div>
</Footer>
