<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { STORAGE_IMAGES } from '$lib/utils/constants';

	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import ItemCard from '../lib/components/ItemCard.svelte';

	import mainhero from '$lib/assets/mainhero.webp';
	import Icon from '$lib/components/Icon.svelte';
	import servicesData from '$lib/services.json';
	// Manually convert the services object into an array
	const servicesArray = Object.keys(servicesData).map((key) => servicesData[key]);
	const ourServices = servicesArray[0];

	export let data;
	console.log(data);

	let imageUrl;
	onMount(() => {
		//imageUrl = `url(${STORAGE_IMAGES}heroes/mainhero.png)`;
	});

	const header = 'text-2xl text-justify w-full px-5 font-semibold';
	const headerLg = 'lg:text-4xl lg:px-10 lg:py-2';
	const headerXl = 'xl:text-6xl xl:px-10 xl:py-5';
	const subTitle = 'text-xl text-justify w-full px-5 py-3 ';
	const subTitleLg = 'lg:text-2xl lg:px-10 lg:py-2';
	const subTitleXl = 'xl:text-4xl xl:px-10 xl:py-5';
	const sectionHeader = 'text-2xl text-justify w-full px-5 py-6 font-semibold';
	const sectionHeaderLg = 'lg:text-3xl lg:px-10 lg:pt-10';
	const sectionHeaderXl = 'xl:text-4xl xl:px-10 xl:pt-14 ';
	const container = 'mb-5';
	const containerLg = 'lg:mb-10';
	const containerXl = 'xl:mb-10';
	const services = 'px-5 py-5 grid grid-cols-2 gap-2';
	const servicesLg = 'lg:grid-cols-2 lg:gap-10 lg:px-10 ';
	const servicesXL = 'xl:grid xl:grid-cols-4 xl:gap-14 xl:px-5 ';
	const itemContainer = 'px-5 grid grid-cols-1';
	const itemContainerLg = 'lg:px-10 lg:grid lg:grid-cols-2 lg:gap-5';
	const itemContainerXL = 'xl:px-10 xl:grid xl:grid-cols-2 xl:gap-5';
	const downloadContainer = 'grid grid-cols-2 justify-items-center px-5';
	const downloadContainerLg = 'lg:grid lg:grid-cols-4 lg:justify-items-center lg:px-5';
	const downloadContainerXL = 'xl:grid xl:grid-cols-4 xl:justify-items-center xl:px-5';
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
<div class={`sectionHeader ${sectionHeader} ${sectionHeaderLg} ${sectionHeaderXl}`}>
	Our regular worship services
</div>
<div class={`container ${container} ${containerLg} ${containerXl}`}>
	<div class={`services ${services} ${servicesLg} ${servicesXL}`}>
		{#each ourServices as service}
			<ServiceCard {service} />
		{/each}
	</div>
</div>
<hr class="mx-auto w-[80%]" />

<!-- News -->
<div class={`sectionHeader ${sectionHeader} ${sectionHeaderLg} ${sectionHeaderXl}`}>
	News and Notices
</div>
<div class={`container ${container} ${containerLg} ${containerXl}`}>
	<div class={`item-container ${itemContainer} ${itemContainerLg} ${itemContainerXL}`}>
		{#each data.news as item}
			<ItemCard {item} kind="news" />
		{/each}
	</div>
	<div class="more-link mb-8">
		<a class="cool-link" href="/news">See all news articles</a>
	</div>
</div>
<hr class="mx-auto w-[80%]" />

<!-- Section: Events 	-->
<div class={`sectionHeader ${sectionHeader} ${sectionHeaderLg} ${sectionHeaderXl}`}>
	Upcoming Events
</div>
<div class={`container ${container} ${containerLg} ${containerXl}`}>
	<div class={`item-container ${itemContainer} ${itemContainerLg} ${itemContainerXL}`}>
		{#if data.events.length > 0}
			{#each data.events as event}
				<ItemCard item={event} kind="events" />
			{/each}
		{:else}
			<p>Currently there are no events scheduled</p>
		{/if}
	</div>
	{#if data.events.length > 1}
		<div class="more-link mb-8">
			<a class="cool-link" href="/news">See all events</a>
		</div>
	{/if}
</div>
<hr class="mx-auto w-[80%]" />
<!-- About us -->
<div class={`sectionHeader ${sectionHeader} ${sectionHeaderLg} ${sectionHeaderXl}`}>Who we are</div>
<div class="single-post">
	<div class="more-link">
		<a class="cool-link" href="/about">Learn more</a>
	</div>
</div>

<!-- Safeguarding -->
<div class={`sectionHeader ${sectionHeader} ${sectionHeaderLg} ${sectionHeaderXl}`}>
	Safeguarding
</div>
<div class="single-post">
	<div class="more-link">
		<a class="cool-link" href="/about">Learn more</a>
	</div>
</div>

<div class="downloads">
	<h2 class={`sectionHeader ${sectionHeader} ${sectionHeaderLg} ${sectionHeaderXl}`}>Downloads</h2>
</div>
<div class={`container ${container} ${containerLg} ${containerXl}`}>
	<!--<div
		class={`download-container ${downloadContainer} ${downloadContainerLg} ${downloadContainerXL}`}
	>-->
	<div
		class={`download-container ${downloadContainer} ${downloadContainerLg} ${downloadContainerXL}`}
	>
		<div class="download-item mt-10">
			Weekly Sheet
			<div class="circle">
				<span class="icon"><Icon name="sheet" width="24px" height="24px" /></span>
			</div>
		</div>
		<div class="download-item mt-10">
			Newsletter
			<div class="circle">
				<span class="icon"><Icon name="sheet" width="24px" height="24px" /></span>
			</div>
		</div>
	</div>
</div>

<style>
	.more-link {
		text-align: center;
		margin: 20px;
	}

	.cool-link {
		border-bottom: solid 2px #a07b9f;
		padding-bottom: 3px;
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
		position: relative;
		max-height: 300px;
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
