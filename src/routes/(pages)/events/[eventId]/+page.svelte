<script>
	import { formatDate } from '/src/utils/utils';
	import Fa from 'svelte-fa';
	import { faCalendar, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';

	export let data;
	const thisEvent = data.thisEvent;
</script>

<div class="container">
	<div class="headline">
		{thisEvent.title}
	</div>
	<div class="event-data">
		<div class="entry">
			<Fa icon={faCalendar} />
			{thisEvent.startdate}
		</div>
		<div class="entry">
			<Fa icon={faClock} />
			{thisEvent.starttime}
		</div>
		<div class="entry">
			<!-- Refactor: Add link to location document -->
			<Fa icon={faLocationDot} />
			{thisEvent.location}
		</div>
	</div>
	<div class="event-image">
		<img src={thisEvent.image} alt={thisEvent.title} />
	</div>
	<div class="event-description">
		{thisEvent.description}
	</div>
</div>
<div class="links">
	<a href="/events">Take me back to events</a>
</div>

<style>
	.container {
		margin-bottom: 40px;
		width: 80%;
	}
	.headline {
		font-size: 2rem;
		line-height: 2.5rem;
		font-weight: 600;
		margin: 20px 0;
	}

	.event-data {
		display: inline-flex;
		gap: 30px;
		margin-bottom: 40px;
	}

	.event-data .entry {
		display: inline-flex;
		gap: 10px;
		align-items: center;
	}

	.event-image {
		width: 100%;
		height: 300px;
		overflow: hidden;
		border-radius: 10px;
		margin-bottom: 40px;
	}

	.event-image img {
		width: 100%;
		object-fit: cover; /* Crop the image to fill its container */
		height: 100%; /* Maintain the fixed height of 500px */
	}

	.event-description {
		font-size: 1.5rem;
		line-height: 2rem;
		margin-bottom: 40px;
	}

	.links a {
		text-decoration: underline;
		font-weight: 600;
		@apply text-link-primary;
	}
</style>
