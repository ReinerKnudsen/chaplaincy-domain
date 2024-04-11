<script>
	export let newsItem;
</script>

<div class="container my-5 rounded-2xl border border-slate-200 p-4 shadow-xl">
	<div class="image w-full overflow-clip rounded-2xl" hidden={!newsItem.data.image}>
		<img class="rounded-2xl" src={newsItem.data.image} alt="einText" />
	</div>
	<div class="data-container">
		<div class="Title pb-4 pt-6 text-center text-3xl font-semibold">
			<a href="/news/{newsItem.id}">{newsItem.data.title}</a>
		</div>
		<div class="metadata pb-4">
			<div class="text-left">{newsItem.data.author}</div>
			<div class="text-right">{newsItem.data.publishdate}</div>
		</div>
		<div class="text-lg">{newsItem.data.slug}</div>
		<div class="read-more">
			<a href="/news/{newsItem.id}">Read more...</a>
		</div>
	</div>
</div>

<style>
	.container {
		max-height: 650px;
		display: grid;
		grid-template-rows: [image] 350px [data] 300px;
		overflow: hidden;
	}
	.data-container {
		display: flex;
		flex-direction: column;
	}
	.metadata {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-content: space-around;
		gap: 5px;
		color: rgb(148 163 184);
	}
	.read-more {
		padding-top: 10px;
		text-align: right;
		font-weight: 500;
		@apply text-link-primary;
		align-content: space-around;
	}
</style>
