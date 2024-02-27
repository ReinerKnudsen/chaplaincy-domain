<script>
	import EventCard from '$lib/event/Eventcard.svelte';
	import { isLoggedIn, authUser, authStore } from '../lib/stores/AuthStore';
	import { getCurrentUser } from '../lib/services/authService';

	export let data;
	// if (isLoggedIn) {
	// 	let name = getCurrentUser().displayName;
	// } else {
	// 	let name = 'Guest';
	// }
	// console.log(name);

	const events = data.events;
</script>

{#if isLoggedIn}
	<div class="pr-8 text-right">{getCurrentUser() ? getCurrentUser().displayName : 'Gast'}</div>
{/if}
<div>
	<h3 class="text-lg">This is the homepage which is emtpy for now.</h3>
	<div class="mb-5">
		Please <a href="/register">register</a> with a new user or <a href="/login">sign in</a> to get
		access to the
		<strong>administration</strong> menu
		<div class="my-5 text-lg">Below you see the current work status.</div>
	</div>
</div>

<div class="container">
	<iframe
		class="h-full w-full"
		src="https://twelte.com/edit/f55fd9df699049919e97e5a6b8b08c61ec4828cf86574027bd1e0af6a90e47e0"
		title="Embedded Twelte page"
	></iframe>
</div>

<style>
	.container {
		width: 80vw;
		height: 100vh;
	}
	li {
		margin-bottom: 0.5rem;
	}
	a {
		color: #3b82f6;
	}
</style>
