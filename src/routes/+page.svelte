<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { STORAGE_IMAGES } from '$lib/utils/constants';

	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import ItemCard from '../lib/components/ItemCard.svelte';
	import EventCard from '../lib/components/EventCard.svelte';

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
	const sectionHeader = 'text-2xl text-justify w-full px-5 pt-5 pb-2 font-semibold';
	const sectionHeaderLg = 'lg:text-3xl lg:px-10 lg:pt-14 lg:pt-5 lg:pb-10';
	const sectionHeaderXl = 'xl:text-4xl xl:px-10 xl:pt-20 xl:pt-5 xl:pb-10';
	const container = 'mb-5';
	const containerLg = 'lg:mb-10';
	const containerXl = 'xl:mb-10';
	const services = 'px-5 py-5 grid grid-cols-2 gap-2';
	const servicesLg = 'lg:grid-cols-2 lg:gap-10 lg:px-10 ';
	const servicesXL = 'xl:grid xl:grid-cols-4 xl:gap-14 xl:px-5 ';
	const itemContainer = 'grid grid-cols-1 grid-flow-row';
	const itemContainerLg = 'lg:px-10 grid grid-cols-2 gap-5';
	const itemContainerXL = 'xl:px-10 grid grid-cols-2 gap-5';

	/*



	*/
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
			<ItemCard {item} />
		{/each}
	</div>
	<div class="more-link mb-8">
		<a class="cool-link" href="/news">See all news articles</a>
	</div>
</div>
<hr class="mx-auto w-[80%]" />

<!-- Section: Events 	-->
<div class="section-header">Upcoming Events</div>
<div class="container mb-10">
	<div class="mx-10 grid grid-cols-2 gap-5">
		{#if data.events.length > 0}
			{#each data.events as event}
				<EventCard item={event} />
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
<div class="section-header">Who we are</div>
<div class="single-post">
	<div class="more-link">
		<a class="cool-link" href="/about">Learn more</a>
	</div>
</div>

<!-- Safeguarding -->
<div class="section-header">Safeguarding</div>
<div class="single-post">
	<div class="more-link">
		<a class="cool-link" href="/about">Learn more</a>
	</div>
</div>

<div class="downloads">
	<h2 class="mb-5 ml-11 mt-5 text-2xl font-semibold">Downloads</h2>
</div>
<div class="item-container">
	<div class="download-item">
		Weekly Sheet
		<div class="circle">
			<span class="icon"><Icon name="sheet" width="24px" height="24px" /></span>
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

	.item-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
		padding-left: 40px;
		padding-right: 40px;
		gap: 20px;
	}
</style>
