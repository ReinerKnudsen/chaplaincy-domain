<script lang="ts">
	import { onMount } from 'svelte';
	import ProfileImage from './ProfileImage.svelte';

	type ProfileData = {
		name: string;
		role: string;
		description: string;
		photoUrl: string;
	};

	interface Props {
		imagePosition: 'left' | 'right';
		profile: ProfileData;
	}

	let { imagePosition, profile }: Props = $props();
	//export let index: number;

	let screenWidth: number = $state(window.innerWidth);
	let photo = { url: profile.photoUrl, name: profile.name };

	const updateScreenWidth = () => {
		screenWidth = window.innerWidth;
	};

	onMount(() => {
		updateScreenWidth();
		window.addEventListener('resize', updateScreenWidth);

		return () => {
			window.removeEventListener('resize', updateScreenWidth);
		};
	});
</script>

{#if screenWidth > 1024}
	<div
		class="profile-card my-10 flex w-full {imagePosition === 'left'
			? 'flex-row'
			: 'flex-row-reverse'}  rounded-xl border border-slate-200 shadow-xl"
	>
		<ProfileImage {photo} />
		<div class="profile-data my-auto flex w-full flex-col px-6">
			<div class="mb-2 text-2xl font-bold">{profile.name}</div>
			<div class="mb-2 text-xl font-semibold">{profile.role}</div>
			<quote class="text-md mb-2 font-medium lg:block lg:text-lg">{profile.description}</quote>
		</div>
	</div>
{:else}
	<div
		class="profile-card-mobile my-6 flex w-full flex-col rounded-xl border border-slate-200 shadow-xl sm:my-10"
	>
		<div class="flwx-row flex w-full">
			<div class="profile-image-and-name">
				<ProfileImage {photo} />
			</div>
			<div class="profile-data-mobile my-auto flex w-full flex-col px-6">
				<div class="text-md mb-1 font-bold sm:mb-2 sm:text-2xl">{profile.name}</div>
				<div class="text-md mb-1 font-semibold sm:mb-2 sm:text-xl">{profile.role}</div>
			</div>
		</div>
		<quote class="sm:text-md mb-2 px-2 py-2 text-sm font-medium lg:block lg:text-lg"
			>{profile.description}</quote
		>
	</div>
{/if}
