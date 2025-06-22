<script lang="ts">
	import type { ActionData } from './$types';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import { authStore } from '$lib/stores/AuthStore';
	import mainhero from '$lib/assets/mainhero.webp';

	import Icon from '@iconify/svelte';

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

	import type { Service } from '$lib/types';

	// Manually convert the services object into an array with proper typing
	const servicesArray = servicesData.services.map(
		(service): Service => ({
			...service,
			place_address: service.place_address?.replace(/\n/g, '<br>') ?? '',
			mode: service.mode as 'onsite' | 'online',
		}),
	);

	let user = $state();
	let loading = $state(true);

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();

	onMount(async () => {
		await loadItems(CollectionType.News);
		await loadItems(CollectionType.FutureEvents);
		await loadDocument(DocumentType.WeeklySheet);
		await loadDocument(DocumentType.Newsletter);
		loading = false;
	});

	$effect(() => {
		user = $authStore.user;
	});

	let whiteCount = $derived(
		[
			true, // Services always white
			$LatestNewsStore.length > 0, // News section if present
			$NextEventsStore.length > 0, // Events section if present
		].filter(Boolean).length,
	);

	let shouldBeWhite = $derived((sectionIndex: number) => (sectionIndex + whiteCount) % 2 === 0);
</script>

<section class="bg-white-smoke">
	<main class="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
		<div class="page-title">Anglican Chaplaincy of Bonn and Cologne</div>
		<div class="page-subtitle">St. Boniface, Bonn and All Saints, Cologne</div>
		<div class="image-container">
			<img src={mainhero} alt="main hero" />
		</div>
	</main>
</section>

<!-- Section: Service Times -->
<section>
	<div class="content-container">
		<h2 class="section-header">Come and worship with us</h2>
		<div class="w-full">
			<div class="services">
				{#each servicesArray as service}
					<ServiceCard {service} />
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Section: Mission Statement-->
<section class="bg-white-smoke">
	<div class="content-container">
		<div class="ml-[10%] flex w-[80%] flex-col">
			<h2 class="text-xl font-bold">Our Mission Statement</h2>
			<div class="flex flex-row items-center gap-10">
				<div class="hidden md:block">
					<Icon icon="fa-solid:cross" class="h-12 w-12" />
				</div>
				<div class="font-lg italic">
					A welcoming, safe, diverse and open congregation, inclusive of all. Our worship tradition
					is Eucharistic, to which we welcome everyone. We invite people of whatever background,
					age, ethnicity, gender and sexuality to share our worship and to join our church family,
					wherever they may be on their spiritual journey. We welcome and enjoy having children of
					all ages worshipping with us.
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Section: News and Notices -->
{#if !loading}
	<!-- News section -->
	{#if $LatestNewsStore.length > 0}
		<section class="bg-white-primary">
			<div class="content-container">
				<h2 class="section-header">What's up?</h2>
				<div class="itemContainer">
					{#each $LatestNewsStore as item}
						<ItemCard {item} kind="news" />
					{/each}
				</div>
				<div class="more-link">
					<a href="/news"><button class="calltoaction">See all news</button></a>
				</div>
			</div>
		</section>
	{/if}

	<!-- Events section -->
	{#if $NextEventsStore.length > 0}
		<section class={$LatestNewsStore.length > 0 ? 'bg-white-smoke' : 'bg-white-primary'}>
			<div class="content-container">
				<h2 class="section-header">Upcoming Events</h2>
				<div class="itemContainer">
					{#each $NextEventsStore as item}
						<ItemCard {item} kind="events" />
					{/each}
				</div>
				<div class="more-link">
					<a href="/events"><button class="calltoaction">See all events</button></a>
				</div>
			</div>
		</section>
	{/if}
{/if}
<hr class="mx-auto w-[80%]" />

<!-- About us 
<div class="section-header">Who we are</div>
<div class="single-post">
	<div class="more-link">
		<a class="border-b-2 border-b-purple-100 pb-1" href="/about">Learn more</a>
	</div>
</div>
<hr class="mx-auto w-[80%]" /> -->

<!-- Safeguarding -->
<section class={shouldBeWhite(3) ? 'bg-white-primary' : 'bg-white-smoke'}>
	<div class="content-container">
		<h2 class="section-header">Safeguarding</h2>
		<div class="pl-10 text-lg">
			<p>
				Our chaplaincy in Bonn and Cologne is committed to safeguarding children, young people and
				adults from harm. We follow the House of Bishops guidance and policies and have our own
				Chaplaincy Safeguarding Officer.
			</p>
			<p class="pt-4">
				Our Diocese of Europe’s safeguarding pages contain vital links and information including
				contacts for the Diocesan Safeguarding Advisor who advises our Safeguarding Officer. If you
				are concerned that a child or adult has been harmed or may be at risk of harm, <a
					href="about/safeguarding"
					class="link">please contact our Safeguarding Officer Patra Al-Saadi</a
				> or the Diocesan Safeguarding Advisor.
			</p>
			<p class="pt-4 font-semibold">
				If you have immediate concerns about the safety of someone, please contact the police and
				your local authority’s children or adult social care services.
			</p>
			<div class="more-link">
				<a href="/about/safeguarding"><button class="calltoaction">Learn more</button></a>
			</div>
		</div>
	</div>
</section>
<hr class="mx-auto w-[80%]" />

<!-- signup section-->
<section class={shouldBeWhite(2) ? 'bg-white-primary' : 'bg-white-smoke'}>
	<div class="content-container">
		<div class="section-header">Sign up for our news</div>
		<div class="mt-4 mb-10 pl-10 text-lg">
			We provide you with the latest news from our chaplaincy and the diocese in our regular email
			news.

			<form
				method="POST"
				action="?/subscribe"
				use:enhance
				class="flex w-full flex-col space-y-6 pr-10"
			>
				<div class="my-8 flex flex-col gap-4 md:flex-row md:gap-8">
					<div class="flex flex-1 flex-col space-y-2">
						<label for="firstName">First Name</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							class="bg-white-primary w-full rounded-lg border p-2"
						/>
					</div>

					<div class="flex flex-1 flex-col space-y-2">
						<label for="lastName">Last Name</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							class="bg-white-primary w-full rounded-lg border p-2"
						/>
					</div>

					<div class="flex flex-1 flex-col space-y-2">
						<label for="email">Email *</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="bg-white-primary w-full rounded-lg border p-2"
						/>
					</div>
				</div>
				<div class="more-link">
					<button type="submit" class="calltoaction">Subscribe to Newsletter</button>
				</div>
				{#if form?.success}
					<div class="rounded-lg border-2 border-green-500 p-4 text-green-500">
						{form.message}
					</div>
				{/if}
				{#if form?.error}
					<div class="rounded-lg border-2 border-red-700 p-4 text-red-800">
						{form.message}
					</div>
				{/if}
			</form>
		</div>
	</div>
</section>

<!-- Download section-->
<section id="downloads" class={shouldBeWhite(1) ? 'bg-white-primary' : 'bg-white-smoke'}>
	<div class="content-container">
		<h2 class="section-header">Downloads</h2>
		<div class="pl-10">
			<div id="download-section" class="mb-5 w-full lg:mb-10">
				<div class="download-container">
					{#if $WeeklySheetStore}
						<a href={$WeeklySheetStore.path} target="_blank">
							<div class="download-item mt-10">
								Weekly Sheet
								<div class="circle">
									<span class="icon"
										><Icon class="text-primary-text h-10 w-10" icon="la:file-download" /></span
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
									><Icon class="text-primary-text h-10 w-10" icon="la:file-download" /></span
								>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.more-link {
		display: flex;
		justify-content: center;
		text-align: center;
		padding: 40px 0 20px 0;
	}

	section {
		width: 100vw;
		padding: 2.5rem 0;
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
		margin: 0 0 30px 0;
		width: 100%;
		pointer-events: none;
	}
</style>
