<script lang="ts">
	import { onMount } from 'svelte';
	import { doc, getDoc } from 'firebase/firestore';
	import { database } from '$lib/firebase/firebaseConfig';

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
</script>

<footer class="rounded-t-2xl bg-white-primary shadow-xl">
	<div class="justify-left flex flex-row gap-20 px-20">
		<div>
			<h2 class="dark:text-white footer-title mb-6 text-sm font-semibold uppercase text-gray-900">
				Resources
			</h2>
			<div class="footer-link-group">
				<a class="footer-link" href="/newsletter/archive">Newsletter Archive</a>
			</div>
		</div>
		<div>
			<h2 class="dark:text-white footer-title mb-6 text-sm font-semibold uppercase text-gray-900">
				Follow us
			</h2>
			<div class="footer-link-group">
				<a class="footer-link" href="https://www.achurchnearyou.com/church/8388/" target="_blank"
					>A church near you (Bonn)
				</a>
				<a class="footer-link" href="https://www.achurchnearyou.com/church/8389/" target="_blank"
					>A church near you (Cologne)
				</a>
				<a class="footer-link" href="https://www.facebook.com/AnglicanBonnCologne" target="_blank"
					>Facebook
				</a>
			</div>
		</div>
		<div>
			<h2 class="dark:text-white footer-title mb-6 text-sm font-semibold uppercase text-gray-900">
				Legal
			</h2>
			<div class="footer-link-group">
				<a class="footer-link" href="/legal">Privacy Policy</a>
				<a class="footer-link" href="/impressum">Impressum</a>
			</div>
		</div>
	</div>
	<hr class="my-4 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />

	<div class="flex items-center justify-between px-10 pb-6">
		<a class="footer-copyright" href="/">&copy; 2025 Sleepy Panda</a>
		<div class="mt-4 flex flex-row justify-end gap-2">
			<a class="footer-icon" href="https://www.facebook.com/AnglicanBonnCologne/">
				<Icon
					name="facebook"
					class="dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
				/>
			</a>
			<a class="footer-icon" href="https://www.achurchnearyou.com/church/8388/">
				<Icon
					name="churchnearyou"
					class="dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
				/>
			</a>
			<a class="footer-icon" href="https://www.achurchnearyou.com/church/8389/">
				<Icon
					name="churchnearyou"
					class="dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
				/>
			</a>
			<a class="footer-icon" href="/">
				<Icon
					name="email"
					class="dark:hover:text-white h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500"
				/>
			</a>
		</div>
	</div>
</footer>
