<script>
	import Icon from '$lib/components/Icon.svelte';

	export let service;
</script>

<div class="container">
	<div class="card">
		<div class="icon">
			<Icon
				name={service.icon === 'people' ? 'onsite' : 'users_online'}
				width="3rem"
				height="3rem"
			/>
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
		border: 1px solid #efefef;
		border-radius: 20px;
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
