<script lang="ts">
	import { decodeHtml } from '$lib/utils/HTMLfunctions';

	import Icon from '@iconify/svelte';

	import { type Service } from '$lib/types';

	interface Props {
		service: Service;
	}

	let { service }: Props = $props();

	const icon = service.mode === 'onsite' ? 'fa6-solid:people-roof' : 'fa:wifi';

	const container = 'rounded-2xl border border-slate-200 py-5 px-3 shadow-xl';
	const content = 'flex flex-col items-center justify-start';
	const cardIcon = 'flex min-h-[80px] items-center justify-center';
	const h3 = 'mb-0 mt-1';
	const p = 'my-0';
</script>

<div class={container}>
	<div class={`icon ${cardIcon}`}>
		<Icon icon={icon} class="h-12 w-12" />
	</div>
	<div class={content}>
		<h3 class={h3}>{service.name}</h3>
		<p class={p}>{service.time}</p>
		<h3 class={h3}>{service.kind}</h3>
		<p class={p}>{service.subtitle ? service.subtitle : ''}</p>
	</div>
	<div class="location text-center">
		<h4 class="mt-2">{service.place_church}</h4>
		<a class="underline underline-offset-4" href={service.url} target="_blank"
			>{decodeHtml( service.place_address)}</a
		>
	</div>
</div>

<style>
</style>
