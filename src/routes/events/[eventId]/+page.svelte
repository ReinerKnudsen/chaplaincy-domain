<script>
	import { formatDate } from '/src/utils/utils';
	export let data;
	const thisEvent = data.thisEvent[0];
</script>

<!-- <div
	class="prose-lead:text-gray prose mx-20 my-5 max-w-lg prose-headings:no-underline prose-lead:text-xl"
>
	<h1>{thisEvent.title}</h1>
	<img src={thisEvent.image} alt="Konzert" class="max-w-lg" />
	<span class="">Start {formatDate(thisEvent.start)}</span>
	<p class="lead">{thisEvent.shorttext}</p>
	<p>{thisEvent.description}</p>
</div> -->

<div
	class="mx-20 my-10 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
>
	<div class="relative overflow-hidden bg-cover bg-no-repeat">
		<img class="rounded-t-lg" src={thisEvent.image} alt="Konzert" />
	</div>
	<div class="p-6">
		<h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
			{thisEvent.title}
		</h5>
		<p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
			{thisEvent.description}
		</p>
		<p class="text-base text-neutral-600 dark:text-neutral-200">
			<small class="text-neutral-500 dark:text-neutral-400">Last updated 3 mins ago</small>
		</p>
	</div>
</div>
