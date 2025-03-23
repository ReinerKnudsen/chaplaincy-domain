<script>
	export let item;
	export let kind;

	const containerSM =
		'sm:grid-col-1 my-5 grid rounded-2xl border border-slate-200 px-4 py-4 shadow-xl bg-white';
	const containerLG = 'lg:grid-col-3';
	//const containerXL = 'xl:bg-white';
	const mainContent = 'justify-between';
	const mainContentMd = 'md:flex md:gap-5';
</script>

<div class={` ${containerSM} ${containerLG} `}>
	<div class="head-line mb-4 py-2 text-xl font-semibold">
		<a href="/{kind}/{item.id}">{item.data.title}</a>
	</div>
	<div class={`main-content ${mainContent} ${mainContentMd}`}>
		<div class="image mb-5 flex h-auto w-full align-middle sm:w-[40%]">
			<img class="w-full rounded-2xl" src={item.data.image} alt={item.data.imageAlt} />
		</div>
		<div class="article w-full md:w-[60%]">
			<div class="mb-8">
				{item.data.slug}
			</div>
		</div>
	</div>
	<div class="read-more no-wrap grid grid-flow-row gap-4 md:grid-flow-col">
		<div class="justify-self-start font-medium text-slate-400">{item.data.author}</div>
		<div class="justify-self-start font-medium text-slate-400 md:justify-self-center">
			{kind === 'news' ? item.data.publishdate : item.data.startdate}
		</div>
		<div class="justify-self-end font-medium text-link-primary">
			<a href="/{kind}/{item.id}">Read more...</a>
		</div>
	</div>
</div>

<style>
</style>
