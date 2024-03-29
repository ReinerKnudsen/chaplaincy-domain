<script>
	export let newsItem;
</script>

<div class=" my-5 grid grid-cols-3 rounded-2xl border border-slate-200 p-8 shadow-xl">
	<div class="image col-span-1 my-auto">
		<!-- Bild links  -->
		<img class=" rounded-2xl" src={newsItem.data.image} alt={newsItem.data.imagealt} />
	</div>
	<div class="article col-span-2 ml-6 grid-rows-3">
		<div class="row2 mb-4 text-2xl font-semibold">
			<a href="/news/{newsItem.id}">{newsItem.data.title}</a>
		</div>
		<div class="mb-8">
			{newsItem.data.slug}
		</div>
		<div class="ReadMore mt-auto flex flex-row flex-nowrap justify-between">
			<div class="justify-start text-slate-400">{newsItem.data.author}</div>
			<div class="justify-center text-slate-400">{newsItem.data.publishdate}</div>
			<div class="justify-end font-medium text-primary-700">
				<a href="/news/{newsItem.id}">Read more...</a>
			</div>
		</div>
	</div>
</div>

<style>
</style>
