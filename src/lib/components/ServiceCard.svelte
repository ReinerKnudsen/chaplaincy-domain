<script>
	import Icon from '$lib/components/Icon.svelte';

	export let service;

	const container = 'rounded-2xl border border-slate-200 py-5 px-3 shadow-xl';
	const content = 'flex flex-col items-center justify-start';
	const cardIcon = 'flex min-h-[80px] items-center justify-center';
	const h3 = 'mb-0 mt-1';
	const p = 'my-0';
</script>

<div class={container}>
	<div class={`icon ${cardIcon}`}>
		<Icon name={service.icon === 'people' ? 'onsite' : 'users_online'} width="3rem" height="3rem" />
	</div>
	<div class={content}>
		<h3 class={h3}>{service.name}</h3>
		<p class={p}>{service.time}</p>
		<h3 class={h3}>{service.kind}</h3>
		<p class={p}>{service.subtitle ? service.subtitle : ''}</p>
	</div>
	<div class="location text-center">
		<h4 class="mt-2">{service.place_church}</h4>
		<a class="font-semibold text-link-primary" href={service.url} target="_blank"
			>{@html service.place_address}</a
		>
	</div>
</div>

<style>
</style>
