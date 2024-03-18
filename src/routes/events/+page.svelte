<script>
	import { authStore } from '$lib/stores/AuthStore';
</script>

<div class="my-3 w-full px-20">
	<h1>Events</h1>
	On this page there will be a card for each event.

	<div class="text-lg font-semibold">{$authStore.firstname + ' ' + $authStore.lastname}</div>
</div>
