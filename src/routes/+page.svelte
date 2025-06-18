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
		authStore.subscribe((store) => {
			user = store.user;
		});
	});

	let whiteCount = $derived(
		[
			true, // Services always white
			$LatestNewsStore.length > 0, // News section if present
			$NextEventsStore.length > 0, // Events section if present
		].filter(Boolean).length,
	);

	let shouldBeWhite = $derived((sectionIndex: number) => (sectionIndex + whiteCount) % 2 === 0);

	const header = 'text-2xl text-justify w-[80%] text-center px-4 py-4 font-semibold';
	const headerLg = 'lg:text-4xl lg:px-10 lg:w-full';
	const headerXl = 'xl:text-6xl xl:px-10 xl:py-6';
	const subTitle = 'text-md text-justify px-5 py-3 w-full ';
	const subTitleLg = 'lg:text-2xl lg:px-10 lg:py-2';
	const subTitleXl = 'xl:text-4xl xl:px-10 xl:py-5';
	const sectionHeader = 'text-2xl w-full px-10 font-semibold md:text-3xl xl:text-4xl ';
	const services = 'px-5 py-5 grid grid-cols-1 gap-5 w-full';
	const servicesMd = 'md:grid md:grid-cols-2 md:gap-8 md:px-10 ';
	const servicesXL = 'lg:grid lg:grid-cols-4 lg:gap-8 lg:px-5 ';
	const itemContainer =
		'px-5 grid grid-cols-1 lg:px-10 lg:grid lg:grid-cols-2 lg:gap-5 xl:px-10 xl:grid xl:grid-cols-2 xl:gap-5';

	const downloadContainer = 'flex flex-row gap-8 justify-center px-5';
	const downloadContainerLg = 'lg:flex lg:flex-row lg:justifycenter lg:gap-10 lg:px-5';
	const downloadContainerXL = 'xl:flex xl:flex-row xl:justify-center gap-10 xl:px-5';
</script>

<section class="bg-white-smoke">
	<main class="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
		<div class={`page-title ${header} ${headerLg} ${headerXl}`}>
			Anglican Chaplaincy of Bonn and Cologne
		</div>
		<div class={`sub-title ${subTitle} ${subTitleLg} ${subTitleXl} `}>
			St. Boniface, Bonn and All Saints, Cologne
		</div>
		<div class="image-container">
			<img src={mainhero} alt="main hero" />
		</div>
	</main>
</section>

<!-- Section: Service Times -->
<section>
	<div class="content-container">
		<div class={`sectionHeader  ${sectionHeader}`}>Come and worship with us</div>
		<div class="w-full">
			<div class={`services ${services} ${servicesMd} ${servicesXL}`}>
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
				<h2 class={`sectionHeader  ${sectionHeader}`}>What's up?</h2>
				<div class={itemContainer}>
					{#each $LatestNewsStore as item}
						<ItemCard {item} kind="news" />
					{/each}
				</div>
				<div class="more-link">
					<a href="/news" class="link">See all news</a>
				</div>
			</div>
		</section>
	{/if}

	<!-- Events section -->
	{#if $NextEventsStore.length > 0}
		<section class={$LatestNewsStore.length > 0 ? 'bg-white-smoke' : 'bg-white-primary'}>
			<div class="content-container">
				<h2 class={`sectionHeader  ${sectionHeader}`}>Upcoming Events</h2>
				<div class={itemContainer}>
					{#each $NextEventsStore as item}
						<ItemCard {item} kind="events" />
					{/each}
				</div>
				<div class="more-link">
					<a href="/events" class="link">See all events</a>
				</div>
			</div>
		</section>
	{/if}
{/if}
<hr class="mx-auto w-[80%]" />

<!-- About us 
<div class={`sectionHeader ${sectionHeader} ${sectionHeaderMd} ${sectionHeaderXl}`}>Who we are</div>
<div class="single-post">
	<div class="more-link">
		<a class="border-b-2 border-b-purple-100 pb-1" href="/about">Learn more</a>
	</div>
</div>
<hr class="mx-auto w-[80%]" /> -->

<!-- Safeguarding -->
<section class={shouldBeWhite(3) ? 'bg-white-primary' : 'bg-white-smoke'}>
	<div class="content-container">
		<h2 class={`sectionHeader  ${sectionHeader}`}>Safeguarding</h2>
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
				<a class="link" href="/about">Learn more</a>
			</div>
		</div>
	</div>
</section>
<hr class="mx-auto w-[80%]" />

<!-- signup section-->
<section class={shouldBeWhite(2) ? 'bg-white-primary' : 'bg-white-smoke'}>
	<div class="content-container">
		<div class={`sectionHeader  ${sectionHeader}`}>Sign up for our news</div>
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
							class="w-full rounded-lg border p-2"
						/>
					</div>

					<div class="flex flex-1 flex-col space-y-2">
						<label for="lastName">Last Name</label>
						<input type="text" id="lastName" name="lastName" class="w-full rounded-lg border p-2" />
					</div>

					<div class="flex flex-1 flex-col space-y-2">
						<label for="email">Email *</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="w-full rounded-lg border p-2"
						/>
					</div>
				</div>

				<button type="submit" class="calltoaction">Subscribe to Newsletter</button>

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
<section class={shouldBeWhite(1) ? 'bg-white-primary' : 'bg-white-smoke'}>
	<div class="content-container">
		<div class="downloads">
			<h2 class={`sectionHeader  ${sectionHeader}`}>Downloads</h2>
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
</section>

<style>
	.more-link {
		text-align: center;
		margin: 20px;
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

	.content-container {
		margin-left: auto;
		margin-right: auto;
		max-width: 1400px;
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
