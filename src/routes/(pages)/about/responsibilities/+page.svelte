<script lang="ts">
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import { profiles } from '$lib/data/data.json';

	type ProfileData = {
		name: string;
		role: string;
		description: string;
		photoUrl: string;
	};

	const imageAlternate: boolean = true;

	const positionImage = (index: number) => {
		if (!imageAlternate) {
			return 'left';
		}
		if (index % 2 === 0) {
			return 'left';
		} else {
			return 'right';
		}
	};
</script>

<div class="my-3 w-full">
	<h1>Who is who?</h1>
</div>
<div class="mx-auto w-full sm:w-3/4">
	{#each profiles as profile, index}
		<ProfileCard {profile} {index} imagePosition={positionImage(index)} />
	{/each}
</div>
