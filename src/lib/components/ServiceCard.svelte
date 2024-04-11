<script>
	import { Fa } from 'svelte-fa';
	import { faPeopleRoof, faUsersRectangle } from '@fortawesome/free-solid-svg-icons';

	export let service;
	console.log(service);
</script>

<div class="container">
	<div class="card">
		<div class="icon">
			<Fa icon={service.icon === 'people' ? faPeopleRoof : faUsersRectangle} class="text-5xl" />
		</div>
		<div class="content">
			<h3 class="my-0">{service.name}</h3>
			<p>{service.time}</p>
			<h3 class="my-0">{service.kind}</h3>
			<p>{service.subtitle ? service.subtitle : ''}</p>
		</div>
		<div class="location">
			<h4 class="mt-2 text-lg font-semibold">{service.place_church}</h4>
			<a href={service.url}>{service.place_address}</a>
		</div>
	</div>
</div>

<style>
	.container {
		padding: 10px;
		border: 1px solid #cdcdcd;
		border-radius: 5px;
	}

	.card {
		display: grid;
		grid-template-rows: 1fr 2fr 1fr;
	}

	.card .icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.card .content,
	.card .location {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.card a {
		@apply text-link-primary;
		font-weight: 600;
	}
</style>
