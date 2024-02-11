<script>
	export let event;
	import { formatDate } from '/src/utils/utils';
</script>

<div
	class="mb-5 flex max-h-full flex-col flex-nowrap justify-start rounded-lg border border-gray-200 bg-white shadow-lg shadow-slate-400 dark:border-gray-700 dark:bg-gray-800"
	max-height="450px"
>
	<img class="rounded-t-lg shadow-md shadow-slate-400" src={event.image} alt="Konzertfoto" />
	<h3 class="px-3">{event.title}</h3>
	<p class="font-sm mb-4 mt-2 px-3 lg:font-medium">
		Start: {formatDate(event.start)}
		{#if event.end.length > 1}<br />End: {formatDate(event.end)}{/if}
	</p>
	<p class="grow px-3 text-sm">{event.shorttext}</p>
	<div class="my-5 inline-flex w-full justify-end px-3 text-sm">
		<a href="/events/{event.cid}"> Read more... </a>
	</div>
</div>

<style>
</style>
