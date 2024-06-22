<script>
	export let item;
	export let kind;

	const container =
		'mb-10 grid grid-flow-row gap-5 rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-xl';
	const containerMd = 'md:mx-auto md:grid-cols-2 ';
	const containerXl = ' ';
	const image = 'rounded-xl max-h-[p-200px]';
	const imageLg = 'lg:max-h-[400px]';
	const imageXl = 'xl:max-h-[400px]';
</script>

<div class={`container ${container} ${containerMd} ${containerXl}`}>
	<div class="image-container">
		<img
			class={`image ${image} ${imageLg} ${imageXl}`}
			src={item.data.image}
			alt={item.data.imageAlt}
		/>
	</div>
	<div class="text-area bg-white mr-auto flex flex-col justify-between gap-2 p-2">
		<div class="headline text-left text-lg font-semibold">
			<a href="/{kind}/{item.id}">{item.data.title}</a>
		</div>
		<div class="metadata text-right text-lg text-slate-400">
			<span>{item.data.author}, {item.data.publishdate}</span>
		</div>
		<div class="news-text min-h-[50%] text-left text-base">{item.data.slug}</div>
		<div class="read-more mb-10 text-right font-medium text-link-primary xl:mb-0">
			<a href="/news/{item.id}">Read more...</a>
		</div>
	</div>
</div>

<style>
</style>
