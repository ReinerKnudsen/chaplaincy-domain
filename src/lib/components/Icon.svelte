<script lang="ts">
	import author from '$lib/assets/icons/author.svg?raw';
	import calendar from '$lib/assets/icons/calendar.svg?raw';
	import camera from '$lib/assets/icons/camera.svg?raw';
	import clock from '$lib/assets/icons/clock.svg?raw';
	import left from '$lib/assets/icons/arrow-left.svg?raw';
	import location from '$lib/assets/icons/location.svg?raw';
	import news from '$lib/assets/icons/news.svg?raw';
	import onsite from '$lib/assets/icons/people-roof.svg?raw';
	import sheet from '$lib/assets/icons/sheet.svg?raw';
	import tags from '$lib/assets/icons/tags.svg?raw';
	import users_online from '$lib/assets/icons/users-online.svg?raw';
	import chevron_down from '$lib/assets/icons/chevron-down.svg?raw';
	import chevron_up from '$lib/assets/icons/chevron-up.svg?raw';
	import churchnearyou from '$lib/assets/icons/churchnearyou.svg?raw';
	import email from '$lib/assets/icons/email.svg?raw';
	import facebook from '$lib/assets/icons/facebook.svg?raw';
	import twitter from '$lib/assets/icons/twitter.svg?raw';
	import trash from '$lib/assets/icons/delete.svg?raw';

	interface IconDefinition {
		box: number;
		svg: string;
	}

	const icons = {
		author: { box: 24, svg: author },
		calendar: { box: 24, svg: calendar },
		camera: { box: 24, svg: camera },
		clock: { box: 24, svg: clock },
		chevronDown: { box: 512, svg: chevron_down },
		chevronUp: { box: 512, svg: chevron_up },
		churchnearyou: { box: 24, svg: churchnearyou },
		delete: { box: 24, svg: trash },
		email: { box: 24, svg: email },
		facebook: { box: 24, svg: facebook },
		left: { box: 24, svg: left },
		location: { box: 24, svg: location },
		news: { box: 24, svg: news },
		onsite: { box: 24, svg: onsite },
		sheet: { box: 24, svg: sheet },
		tags: { box: 24, svg: tags },
		twitter: { box: 24, svg: twitter },
		users_online: { box: 24, svg: users_online },
	} satisfies Record<string, IconDefinition>;

	type IconName = keyof typeof icons;

	export let name: IconName;
	export let width = '1rem';
	export let height = '1rem';

	$: displayIcon = icons[name];
</script>

{#if displayIcon}
	<svg
		class={$$props.class}
		{width}
		{height}
		viewBox={`0 0 ${displayIcon.box} ${displayIcon.box}`}
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		{@html displayIcon.svg}
	</svg>
{/if}
