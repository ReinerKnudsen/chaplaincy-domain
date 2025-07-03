<script>
	import { page } from '$app/state';

	import { getDownloadURL, ref } from 'firebase/storage';
	import { headerStorageRef } from '$lib/firebase/firebaseConfig';

	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();

	let headerImageUrl = $state('');
	let imageLoading = $state(true);
	let pageName = $state('');
	let pageTitle = $derived(page.data.title);
	let pageCaption = $derived(page.data.caption);

	// Get page name from current route
	const getPageName = (routeId) => {
		if (!routeId) return 'fallback';
		// Extract page name from route like '/(pages)/groups' -> 'groups'
		const parts = routeId.split('/').filter((part) => part && !part.includes('('));
		return parts[parts.length - 1] || 'fallback';
	};

	// Load header image based on current page
	const loadHeaderImage = async (pageName) => {
		try {
			const imageRef = ref(headerStorageRef, `${pageName}.jpg`);
			return await getDownloadURL(imageRef);
		} catch (error) {
			console.log(`Header image not found for ${pageName}, using fallback`);
			// Fallback to default header
			const fallbackRef = ref(headerStorageRef, 'fallback.jpg');
			return await getDownloadURL(fallbackRef);
		}
	};

	$effect(async () => {
		pageName = getPageName(page.route.id);
		headerImageUrl = await loadHeaderImage(pageName);
		imageLoading = false;
		if (page.data?.headerImage) {
			imageLoading = true;
			headerImageUrl = await loadHeaderImage(pageName);
			imageLoading = false;
		}
	});
</script>

<div class="mx-auto mb-8 max-w-[1400px] px-4 sm:px-6 lg:px-8">
	<!-- Header Image -->
	<div class="flex h-[250px] w-full items-center justify-center bg-gray-200">
		{#if imageLoading}
			<div class="text-gray-500">Loading header...</div>
		{:else}
			<img src={headerImageUrl} alt="Page header" class="h-full w-full object-cover" />
		{/if}
	</div>

	<!-- Caption -->
	{#if pageCaption}
		<div class="mt-2 text-right text-sm text-gray-600">{pageCaption}</div>
	{/if}

	<!-- Page Title -->
	<h1 class="page-title">
		{#if pageTitle}
			{pageTitle}
		{:else}
			Page Title
		{/if}
	</h1>

	<!-- Page Content -->
	<div class="mx-auto lg:w-[1000px]">
		{@render children?.()}
	</div>
</div>

<style>
</style>
