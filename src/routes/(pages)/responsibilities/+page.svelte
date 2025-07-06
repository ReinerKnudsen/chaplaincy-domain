<script lang="ts">
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import { profiles, churchCouncil } from '$lib/data/data.json';

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
	<div class="page-title">Who is who?</div>
</div>
<div class="mx-auto w-full sm:w-3/4">
	{#each profiles as profile, index}
		<ProfileCard {profile} imagePosition={positionImage(index)} />
	{/each}
</div>
<div class="mx-auto w-full sm:w-3/4">
	<h2 class="pt-20">Additional members of the church council</h2>
	<table>
		<tbody>
			{#each churchCouncil as member}
				<tr><td>{member.name}</td><td>{member.location}</td><td>{member.description}</td></tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	td {
		padding: 10px 20px;
	}
</style>
