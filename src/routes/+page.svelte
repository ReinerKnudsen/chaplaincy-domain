<script lang="ts">
	import { onMount } from 'svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { authStore } from '$lib/stores/AuthStore';
	import mainhero from '$lib/assets/mainhero.webp';
	import Icon from '$lib/components/Icon.svelte';
	import servicesData from '$lib/services.json';
	import {
		CollectionType,
		DocumentType,
		LatestNewsStore,
		NextEventsStore,
		loadItems,
		loadDocument,
		WeeklySheetStore,
		NewsletterStore,
	} from '$lib/stores/ObjectStore';
	import cross from '$lib/assets/icons/cross.svg?raw';

	// Manually convert the services object into an array
	const servicesArray = servicesData.services.map((service) => {
		if (service.place_address) {
			service.place_address = service.place_address.replace(/\n/g, '<br>');
		}
		return service;
	});

	let user;
	let loading = true;

	onMount(async () => {
		await loadItems(CollectionType.News);
		await loadItems(CollectionType.FutureEvents);
		await loadDocument(DocumentType.WeeklySheet);
		await loadDocument(DocumentType.Newsletter);
		loading = false;
	});

	$: authStore.subscribe((store) => {
		user = store.user;
	});

	const header = 'text-2xl text-justify w-[80%] text-center px-4 py-4 font-semibold';
	const headerLg = 'lg:text-4xl lg:px-10 lg:w-full';
	const headerXl = 'xl:text-6xl xl:px-10 xl:py-6';
	const subTitle = 'text-md text-justify px-5 py-3 w-full ';
	const subTitleLg = 'lg:text-2xl lg:px-10 lg:py-2';
	const subTitleXl = 'xl:text-4xl xl:px-10 xl:py-5';
	const sectionHeader = 'text-xl text-justify w-full px-5 pt-4 font-semibold';
	const sectionHeaderMd = 'md:text-3xl md:px-10 md:pt-10 md:py-3';
	const sectionHeaderXl = 'xl:text-4xl xl:px-10 xl:pt-14 xl:py-5 ';
	const container = 'mb-5 w-full';
	const containerLg = 'lg:mb-10';
	const services = 'px-5 py-5 grid grid-cols-1 gap-5 w-full';
	const servicesMd = 'md:grid md:grid-cols-2 md:gap-8 md:px-10 ';
	const servicesXL = 'lg:grid lg:grid-cols-4 lg:gap-8 lg:px-5 ';
	const itemContainer = 'px-5 grid grid-cols-1';
	const itemContainerLg = 'lg:px-10 lg:grid lg:grid-cols-2 lg:gap-5';
	const itemContainerXL = 'xl:px-10 xl:grid xl:grid-cols-2 xl:gap-5';
	const downloadContainer = 'grid grid-cols-2 justify-items-center px-5';
	const downloadContainerLg = 'lg:grid lg:grid-cols-4 lg:justify-items-center lg:px-5';
	const downloadContainerXL = 'xl:flex xl:flex-row xl:justify-center gap-10 xl:px-5';
</script>

<div class={`page-title ${header} ${headerLg} ${headerXl}`}>
	Anglican Chaplaincy of Bonn and Cologne
</div>
<div class={`sub-title ${subTitle} ${subTitleLg} ${subTitleXl} `}>
	St. Boniface, Bonn and All Saints, Cologne
</div>
<div class="image-container">
	<img src={mainhero} alt="main hero" />
</div>

<!-- Section: Service Times -->
<div class={`sectionHeader ${sectionHeader} ${sectionHeaderMd} ${sectionHeaderXl}`}>
	Our regular worship services
</div>
<div class=" w-full">
	<div class={`services ${services} ${servicesMd} ${servicesXL}`}>
		{#each servicesArray as service}
			<ServiceCard {service} />
		{/each}
	</div>
</div>
<hr class="mx-auto my-10 w-[80%]" />

<!-- Section: Mission Statement-->
<div class="ml-[10%] flex w-[80%] flex-col">
	<h2 class="text-xl font-bold">Our Mission Statement</h2>
	<div class="flex flex-row items-center gap-10">
		<div class="hidden md:block">
			{@html cross.replace(
				'<svg',
				'<svg viewBox="0 0 90 90" preserveAspectRatio="xMidYMid meet" class="h-full w-full lg:h-[75%] lg:w-[75%] fill-current text-primary-100"',
			)}
		</div>
		<div class="font-lg italic">
			A welcoming, safe, diverse and open congregation, inclusive of all. Our worship tradition is
			Eucharistic, to which we welcome everyone. We invite people of whatever background, age,
			ethnicity, gender and sexuality to share our worship and to join our church family, wherever
			they may be on their spiritual journey. We welcome and enjoy having children of all ages
			worshipping with us.
		</div>
	</div>
</div>

<hr class="mx-auto mt-10 w-[80%]" />
<!-- Section: News and Notices -->

{#if !loading}
	<!-- News section -->
	{#if $LatestNewsStore.length > 0}
		<div class={container + ' ' + containerLg}>
			<h2 class={sectionHeader + ' ' + sectionHeaderMd + ' ' + sectionHeaderXl}>Latest News</h2>
			<div class={itemContainer + ' ' + itemContainerLg + ' ' + itemContainerXL}>
				{#each $LatestNewsStore as item}
					<ItemCard {item} kind="news" />
				{/each}
			</div>
			<div class="mt-4 text-center">
				<a href="/news" class="text-purple-600 underline hover:text-purple-800">See all news</a>
			</div>
		</div>
	{/if}
	<hr class="mx-auto w-[80%]" />

	<!-- Events section -->
	{#if $NextEventsStore.length > 0}
		<div class={container + ' ' + containerLg}>
			<h2 class={sectionHeader + ' ' + sectionHeaderMd + ' ' + sectionHeaderXl}>Upcoming Events</h2>
			<div class={itemContainer + ' ' + itemContainerLg + ' ' + itemContainerXL}>
				{#each $NextEventsStore as item}
					<ItemCard {item} kind="events" />
				{/each}
			</div>
			<div class="mt-4 text-center">
				<a href="/events" class="text-purple-600 underline hover:text-purple-800">See all events</a>
			</div>
		</div>
	{/if}
{/if}
<hr class="mx-auto w-[80%]" />

<!-- About us -->
<div class={`sectionHeader ${sectionHeader} ${sectionHeaderMd} ${sectionHeaderXl}`}>Who we are</div>
<div class="single-post">
	<div class="more-link">
		<a class="border-b-2 border-b-purple-100 pb-1" href="/about">Learn more</a>
	</div>
</div>
<hr class="mx-auto w-[80%]" />

<!-- Safeguarding -->
<div class={`sectionHeader ${sectionHeader} ${sectionHeaderMd} ${sectionHeaderXl}`}>
	Safeguarding
</div>
<div class="single-post">
	<div class="more-link">
		<a class="border-b-2 border-b-purple-100 pb-1" href="/about">Learn more</a>
	</div>
</div>
<hr class="mx-auto w-[80%]" />
<div class="downloads">
	<h2 class={`sectionHeader ${sectionHeader} ${sectionHeaderMd} ${sectionHeaderXl}`}>Downloads</h2>
</div>
<div class="mb-5 w-full lg:mb-10">
	<div
		class={`download-container ${downloadContainer} ${downloadContainerLg} ${downloadContainerXL}`}
	>
		{#if $WeeklySheetStore}
			<a href={$WeeklySheetStore.path} target="_blank">
				<div class="download-item mt-10">
					Weekly Sheet
					<div class="circle">
						<span class="icon"
							><Icon class="text-primary-text" name="sheet" width="24px" height="24px" /></span
						>
					</div>
				</div></a
			>
		{/if}
		{#if $NewsletterStore}
			<div class="download-item mt-10">
				Newsletter
				<div class="circle">
					<span class="icon"
						><Icon class="text-primary-text" name="sheet" width="24px" height="24px" /></span
					>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.more-link {
		text-align: center;
		margin: 20px;
	}

	.download-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 200px;
		height: 100px;
		background-color: #a07b9f;
		color: white;
		text-align: center;
		position: relative;
		cursor: pointer;
		border-radius: 5px;
		font-weight: 600;
	}

	.circle {
		width: 60px;
		height: 60px;
		background-color: whitesmoke;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: -30px;
	}

	.image-container {
		max-height: 400px;
		background-size: cover;
		background-position: center;
		color: white;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0px;
		width: 100%;
		pointer-events: none;
		overflow: scroll;
	}
</style>
