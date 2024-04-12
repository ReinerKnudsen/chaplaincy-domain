<script>
	import { formatDate } from '/src/utils/utils';
	import Icon from '$lib/components/Icon.svelte';

	export let data;
	const thisItem = data.thisItem;
</script>

<div class="container">
	<div class="headline">
		{thisItem.title}
	</div>
	<div class="news-data">
		<div class="entry">
			<Icon name="calendar" />
			{thisItem.publishdate}
		</div>
		<div class="entry">
			<Icon name="author" />
			{thisItem.author}
		</div>
		<div class="entry">
			<Icon name="tags" />
			{thisItem.tags}
		</div>
	</div>
	<div class="news-image">
		<img src={thisItem.image} alt={thisItem.title} />
	</div>
	<div class="news-description">
		{thisItem.text}
	</div>
</div>
<div class="links">
	<Icon name="left" />
	<a href="/news">Take me back to overview</a>
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

	.news-data {
		display: inline-flex;
		gap: 30px;
		margin-bottom: 40px;
	}

	.news-data .entry {
		display: inline-flex;
		gap: 10px;
		align-items: center;
	}

	.news-image {
		width: 100%;
		height: 300px;
		overflow: hidden;
		border-radius: 10px;
		margin-bottom: 40px;
	}

	.news-image img {
		width: 100%;
		object-fit: cover; /* Crop the image to fill its container */
		height: 100%; /* Maintain the fixed height of 500px */
	}

	.news-description {
		font-size: 1.5rem;
		line-height: 2rem;
		margin-bottom: 40px;
	}

	.links {
		display: inline-flex;
		gap: 10px;
		align-items: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.links a {
		text-decoration: underline;
		font-weight: 600;
		@apply text-link-primary;
	}
</style>
