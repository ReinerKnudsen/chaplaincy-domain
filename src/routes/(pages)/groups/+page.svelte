<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { onDestroy, onMount } from 'svelte';
	import groups from './groups.json';
	import GroupCard from '$lib/components/GroupCard.svelte';

	const headerData = {
		title: 'Groups',
		photoName: 'JJ Ying',
		photoUrl: 'https://unsplash.com/@jjying',
		imageUrl:
			'https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fgroups.jpg?alt=media&token=83a5659a-9299-4f6c-bc5a-2bc5608e1b73',
	};

	onMount(() => {
		if (sessionStorage.getItem('previousPage') !== null) {
			const previousPage = sessionStorage.getItem('previousPage') || null;
		}
	});

	onDestroy(() => {
		sessionStorage.setItem('previousPage', '/groups');
	});
</script>

<PageHeader {headerData} textStyle="dark" />
<div class="mx-auto w-[80%] text-lg">
	<div class="intro pb-4">
		Groups are organized by members of the congregation. They are open to everybody. Below you can
		find all information required about the groups of the church.
	</div>
	<div class="border-b-2 pb-4">
		If you want to find out more or would like to join one of the groups, please <a
			class="border-b-2 border-b-purple-100 pb-1"
			href="/contact?page=groups"
			target="_blank">get in touch</a
		> with us.
	</div>

	{#each groups as group}
		<GroupCard {group} />
	{/each}
</div>
