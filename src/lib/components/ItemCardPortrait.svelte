<script>
	export let newsItem;
</script>

<div class="container my-5 grid grid-rows-2 rounded-2xl border border-slate-200 p-4 shadow-xl">
	<div class="image max-h-32 w-full" hidden={!newsItem.data.image}>
		<img class="rounded-2xl" src={newsItem.data.image} alt="einText" />
	</div>
	<div class="grid grid-rows-5">
		<div class="Title py-6 text-center text-3xl font-semibold">
			<a href="/news/{newsItem.id}">{newsItem.data.title}</a>
		</div>
		<div class="metadata">
			<div class="text-right">{newsItem.data.author}</div>
			<div class="text-left">{newsItem.data.publishdate}</div>
		</div>
		<div class="row-span-2 text-lg">{newsItem.data.slug}</div>
		<div class="read-more">
			<a href="/news/{newsItem.id}">Read more...</a>
		</div>
	</div>
</div>

<style>
	.container {
		max-height: 650px;
	}
	.metadata {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-content: space-around;
		gap: 15px;
		color: rgb(148 163 184);
	}
	.read-more {
		text-align: right;
		font-weight: 500;
		color: rgb(28 100 242);
		align-content: space-around;
	}
</style>
