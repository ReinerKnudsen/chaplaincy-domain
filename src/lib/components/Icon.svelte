<script>
	import author from '$lib/assets/icons/author.svg?raw';
	import calendar from '$lib/assets/icons/calendar.svg?raw';
	import clock from '$lib/assets/icons/clock.svg?raw';
	import left from '$lib/assets/icons/arrow-left.svg?raw';
	import location from '$lib/assets/icons/location.svg?raw';
	import onsite from '$lib/assets/icons/people-roof.svg?raw';
	import tags from '$lib/assets/icons/tags.svg?raw';
	import users_online from '$lib/assets/icons/users-online.svg?raw';

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
		left: {
			box: 24,
			svg: left
		},
		location: {
			box: 24,
			svg: location
		},
		onsite: {
			box: 24,
			svg: onsite
		},
		tags: {
			box: 24,
			svg: tags
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
