<script>
	import { onMount } from 'svelte';
	import { STORAGE_IMAGES } from '$lib/utils/constants';

	import ServiceCard from '$lib/components/ServiceCard.svelte';

	import mainhero from '$lib/assets/mainhero.webp';
	import servicesData from '$lib/services.json';
	// Manually convert the services object into an array
	const servicesArray = Object.keys(servicesData).map((key) => servicesData[key]);
	const ourServices = servicesArray[0];

	let imageUrl;
	onMount(() => {
		//imageUrl = `url(${STORAGE_IMAGES}heroes/mainhero.png)`;
	});
</script>

<div class="header-title">Anglican Chaplaincy of Bonn and Cologne</div>
<div class="image-container" style="background-image:{mainhero}"></div>
<div class="services">
	{#each ourServices as service}
		<ServiceCard {service} />
	{/each}
</div>

<style>
	.header-title {
		text-align: center;
		font-size: 4rem;
		width: 100vw;
		text-align: justify;
		margin: 30px auto 30px 20px;
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

	.title {
		font-size: 3rem;
		font-weight: bold;
		margin-bottom: 10px;
		text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		color: whitesmoke;
	}

	.subtitle {
		font-size: 1.5rem;
	}

	.services {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 20px;
		padding: 0 20px;
	}
</style>
