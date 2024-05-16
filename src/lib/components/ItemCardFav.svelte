<script>
	export let newsItem;

	const container =
		'mx-auto mb-10 grid max-h-[300px] grid-cols-2 gap-5 rounded-2xl border border-slate-200 bg-slate-300 p-4 shadow-xl';
	const containerLg =
		'mx-auto mb-10 grid max-h-[500px] grid-cols-2 gap-5 rounded-2xl border border-slate-200 bg-slate-300 p-4 shadow-xl';
	const containerXl =
		'mx-auto mb-10 grid max-h-[500px] grid-cols-2 gap-5 rounded-2xl border border-slate-200 bg-slate-300 p-4 shadow-xl';
	const imageLg = 'lg:max-h-[400px]';
	const imageXl = 'xl:max-h-[400px]';
	n;
</script>

<div class={`container ${container} ${containerLg} ${containerXl}`}>
	<div class="place-content-center">
		<img
			class={`image ${imageLg} ${imageXl}`}
			src={newsItem.data.image}
			alt="darstellung fuer diesen Beitrag"
		/>
	</div>
	<div class="text-area mr-auto flex flex-col justify-between gap-2 bg-white p-2">
		<div class="headline text-left text-lg font-semibold">
			{newsItem.data.title}
		</div>
		<div class="metadata text-right text-xs text-slate-400">
			<span>{newsItem.data.author}, {newsItem.data.publishdate}</span>
		</div>
		<div class="news-text min-h-[50%] text-left text-base">{newsItem.data.slug}</div>
		<div class="read-more text-right text-sm font-medium text-link-primary">
			<a href="/news/{newsItem.id}">Read more...</a>
		</div>
	</div>
</div>

<style>
</style>
