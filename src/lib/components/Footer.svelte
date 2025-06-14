<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { auth } from '$lib/firebase/firebaseConfig';
	import { signOut } from 'firebase/auth';
	import { doc, getDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';

	import { authStore, unloadUser } from '$lib/stores/AuthStore';
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
			unloadUser();
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};
</script>

<footer class="bg-white-primary w-screen">
	<div
		class="bg-white-smoke mx-auto max-w-[1400px] rounded-t-3xl border border-slate-300 px-4 pb-4 sm:px-6 lg:px-8"
	>
		<div class="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-4">
			<!-- Resources -->
			<div>
				<h2 class="mb-4 text-lg font-semibold tracking-wide text-gray-800 uppercase">Resources</h2>
				<nav class="flex flex-col space-y-2">
					<a href="/newsletter/archive" class="text-gray-600 hover:text-gray-900"
						>Newsletter Archive</a
					>
				</nav>
			</div>

			<!-- Follow us -->
			<div>
				<h2 class="mb-4 text-lg font-semibold tracking-wide text-gray-800 uppercase">Follow us</h2>
				<nav class="flex flex-col space-y-2">
					<a
						href="https://www.facebook.com/AnglicanBonnCologne"
						target="_blank"
						class="text-gray-600 hover:text-gray-900">Facebook</a
					>
				</nav>
			</div>

			<!-- Legal -->
			<div>
				<h2 class="mb-4 text-lg font-semibold tracking-wide text-gray-800 uppercase">Legal</h2>
				<nav class="flex flex-col space-y-2">
					<a href="/legal" class="text-gray-600 hover:text-gray-900">Privacy Policy</a>
					<a href="/impressum" class="text-gray-600 hover:text-gray-900">Impressum</a>
				</nav>
			</div>

			<!-- User -->
			<div>
				<h2 class="mb-4 text-lg font-extrabold tracking-wide text-gray-800 uppercase">User</h2>
				<nav class="flex flex-col space-y-2">
					{#if !$authStore.isLoggedIn}
						<button class="text-left text-gray-600 hover:text-gray-900" on:click={handleLogin}
							>Login</button
						>
					{:else}
						<button class="text-left text-gray-600 hover:text-gray-900" on:click={handleLogout}
							>Sign out</button
						>
					{/if}
				</nav>
			</div>
		</div>

		<hr class="my-4 border-gray-200" />

		<div class="flex flex-col items-center justify-between py-4 sm:flex-row">
			<div class="text-gray-500">© {new Date().getFullYear()} Sleepy Panda</div>
			<div class="mt-4 flex space-x-6 sm:mt-0">
				<a
					href="https://www.facebook.com/AnglicanBonnCologne/"
					class="text-gray-500 hover:text-gray-900"
					target="_blank"
				>
					<Icon name="facebook" class="h-5 w-5" />
				</a>
				<a
					href="https://www.achurchnearyou.com/church/8388/"
					class="text-gray-500 hover:text-gray-900"
					target="_blank"
				>
					<Icon name="churchnearyou" class="h-5 w-5" />
				</a>
				<a
					href="https://www.achurchnearyou.com/church/8389/"
					class="text-gray-500 hover:text-gray-900"
					target="_blank"
				>
					<Icon name="churchnearyou" class="h-5 w-5" />
				</a>
				<a href="/about/contact" class="text-gray-500 hover:text-gray-900">
					<Icon name="email" class="h-5 w-5" />
				</a>
			</div>
		</div>
	</div>
</footer>
