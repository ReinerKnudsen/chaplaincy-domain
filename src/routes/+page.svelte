<script>
	import { onMount } from 'svelte';
	import { STORAGE_IMAGES } from '$lib/utils/constants';

	import ServiceCard from '$lib/components/ServiceCard.svelte';

	import mainhero from '$lib/assets/mainhero.webp';
	import Icon from '$lib/components/Icon.svelte';
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
<div class="image-container">
	<img src={mainhero} alt="main hero" />
</div>
<div class="services">
	{#each ourServices as service}
		<ServiceCard {service} />
	{/each}
</div>
<hr />
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
	.downloads {
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

	.item-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-items: center;
		padding-left: 40px;
		padding-right: 40px;
		gap: 20px;
	}

	.item-container .item {
		display: flex;
		align-items: center;
		gap: 10px;
	}

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
		gap: 60px;
		padding: 0 20px;
		margin: 60px 20px;
	}
</style>
