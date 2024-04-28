<script>
	import author from '$lib/assets/icons/author.svg?raw';
	import calendar from '$lib/assets/icons/calendar.svg?raw';
	import clock from '$lib/assets/icons/clock.svg?raw';
	import left from '$lib/assets/icons/arrow-left.svg?raw';
	import location from '$lib/assets/icons/location.svg?raw';
	import news from '$lib/assets/icons/news.svg?raw';
	import onsite from '$lib/assets/icons/people-roof.svg?raw';
	import sheet from '$lib/assets/icons/sheet.svg?raw';
	import tags from '$lib/assets/icons/tags.svg?raw';
	import users_online from '$lib/assets/icons/users-online.svg?raw';
	import chevron_down from '$lib/assets/icons/chevron-down.svg?raw';
	import churchnearyou from '$lib/assets/icons/churchnearyou.svg?raw';
	import email from '$lib/assets/icons/email.svg?raw';
	import facebook from '$lib/assets/icons/facebook.svg?raw';
	import twitter from '$lib/assets/icons/twitter.svg?raw';

	export let name;
	export let width = '1rem';
	export let height = '1rem';
	let icons = {
		author: {
			box: 24,
			svg: author
		},
		calendar: {
			box: 24,
			svg: calendar
		},
		clock: {
			box: 24,
			svg: clock
		},
		chevronDown: {
			box: 24,
			svg: chevron_down
		},
		churchnearyou: {
			box: 24,
			svg: churchnearyou
		},
		email: {
			box: 24,
			svg: email
		},
		facebook: {
			box: 24,
			svg: facebook
		},
		left: {
			box: 24,
			svg: left
		},
		location: {
			box: 24,
			svg: location
		},
		news: {
			box: 24,
			svg: news
		},
		onsite: {
			box: 24,
			svg: onsite
		},
		sheet: {
			box: 24,
			svg: sheet
		},
		tags: {
			box: 24,
			svg: tags
		},
		twitter: {
			box: 24,
			svg: twitter
		},
		users_online: {
			box: 24,
			svg: users_online
		}
	};
	let displayIcon = icons[name];
</script>

<svg class={$$props.class} {width} {height} viewBox="0 0 {displayIcon.box} {displayIcon.box}"
	>{@html displayIcon.svg}</svg
>
