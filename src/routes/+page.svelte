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
</script>

<div class="header-title">Anglican Chaplaincy of Bonn and Cologne</div>
<div class="sub-title">St. Boniface, Bonn and All Saints, Cologne</div>
<div class="image-container">
	<img src={mainhero} alt="main hero" />
</div>

<!-- Section: Service Times -->
<div class="section-header">Our regular worship services</div>
<div class="container mb-10">
	<div class="services">
		{#each ourServices as service}
			<ServiceCard {service} />
		{/each}
	</div>
</div>
<hr class="mx-auto w-[80%]" />

<!-- News -->
<div class="section-header">News and Notices</div>
<div class="container mb-10">
	<div class="mx-10 grid grid-cols-2 gap-5">
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

	.section-header {
		font-size: 2rem;
		line-height: 2.5rem;
		font-weight: 600;
		margin: 40px 0 0 40px;
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

	.item-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
		padding-left: 40px;
		padding-right: 40px;
		gap: 20px;
	}

	.header-title {
		font-size: 4rem;
		width: 100vw;
		text-align: justify;
		margin: 30px auto 20px 20px;
	}

	.sub-title {
		font-size: 2rem;
		width: 100vw;
		text-align: justify;
		margin: 0px auto 30px 20px;
	}

	.image-container {
		position: relative;
		height: 300px;
		background-size: cover;
		background-position: center;
		color: white;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 20px 0;
		pointer-events: none;
		overflow: scroll;
	}

	.services {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 60px;
		padding: 0 20px;
		margin: 30px 20px;
	}
</style>
