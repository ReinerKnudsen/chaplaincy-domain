<script lang="ts">
	import { goto } from '$app/navigation';

	import { auth } from '$lib/firebase/firebaseConfig';
	import { signOut } from 'firebase/auth';

	import { authStore, unloadUser } from '$lib/stores/AuthStore';

	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';

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

<footer class="w-screen">
	<div
		class="bg-white-primary px-4´ mx-auto w-[calc(99%-2rem)] rounded-t-3xl border border-slate-300 pb-4 sm:px-6 lg:px-8"
	>
		<div class="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-4">
			<!-- Resources -->
			<div>
				<h2 class="mb-4 text-lg font-semibold tracking-wide text-gray-800 uppercase">Resources</h2>
				<nav class="flex flex-col space-y-2">
					<!--<a href="#" class="text-gray-600 hover:text-gray-900">Newsletter Archive</a>-->
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
						<Button variant="inactive" class="border-0" onclick={handleLogin}>Login</Button>
					{:else}
						<Button variant="inactive" class="border-0" onclick={handleLogout}>Sign out</Button>
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
					<Icon icon="fa-brands:facebook" class="h-6 w-6" />
				</a>
				<a href="https://www.achurchnearyou.com/church/8388/" class="text-gray-500 hover:text-gray-900" target="_blank">
					<Icon icon="streamline-plump:user-pin" class="h-6 w-6" />
				</a>
				<a href="https://www.achurchnearyou.com/church/8389/" class="text-gray-500 hover:text-gray-900" target="_blank">
					<Icon icon="streamline-plump:user-pin" class="h-6 w-6" />
				</a>
				<a href="/about/contact" class="text-gray-500 hover:text-gray-900">
					<Icon icon="streamline:send-email" class="h-6 w-6" />
				</a>
			</div>
		</div>
	</div>
</footer>
