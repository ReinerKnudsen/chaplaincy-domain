<script>
	export let newsItem;
</script>

<div class="container rounded-2xl border border-slate-200 p-8 shadow-xl">
	<div class="">
		<img class="image" src={newsItem.data.image} alt="darstellung fuer diesen Beitrag" />
	</div>
	<div class="text-area">
		<div class="headline">
			{newsItem.data.title}
		</div>
		<div class="metadata">
			<span>{newsItem.data.author}, {newsItem.data.publishdate}</span>
		</div>
		<div class="news-text">{newsItem.data.slug}</div>
		<div class="read-more">
			<a href="/news/{newsItem.id}">Read more...</a>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;

		flex-direction: row;
		flex-wrap: nowrap;
		max-height: 500px;
		@apply mx-auto;
		padding: 30px;
		background: #f1f1f1f2;
		margin-bottom: 100px;
	}
	.text-area {
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 20px;
		margin-right: auto;
		max-width: 50%;
	}

	.headline {
		text-align: left;
		font-size: 1.8rem;
		line-height: 2.5rem;
		font-weight: 700;
		padding: 20px 0 10px 0;
		margin-left: 40px;
	}

	.image {
		height: 100%;
	}

	.metadata {
		text-align: right;
		margin-right: 40px;
		color: rgb(148 163 184);
	}

	.news-text {
		text-align: left;
		font-size: 1.4rem;
		line-height: 1.8rem;
		padding: 20px 40px;
		min-height: 50%;
	}
	.read-more {
		text-align: right;
		font-weight: 500;
		@apply text-primary-700;
		align-content: space-around;
		width: 100%;
		padding: 0 40px 20px 0;
	}
</style>
