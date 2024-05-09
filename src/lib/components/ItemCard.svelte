<script>
	export let item;
	export let kind;
</script>

<div class="container my-5 rounded-2xl border border-slate-200 px-4 py-8 shadow-xl">
	<div class="head-line mb-4 py-2 text-xl font-semibold">
		<a href="/{kind}}/{item.id}">{item.data.title}</a>
	</div>
	<div class="main-content">
		<div class="image">
			<img class="image rounded-2xl" src={item.data.image} alt={item.data.imagealt} />
		</div>
		<div class="article">
			<div class="mb-4">
				{item.data.slug}
			</div>
		</div>
	</div>
	<div class="read-more">
		<div class="justify-self-start text-slate-400">{item.data.author}</div>
		<div class="justify-self-center text-slate-400">
			{kind === 'news' ? item.data.publishdate : item.data.startdate}
		</div>
		<div class="justify-self-end font-medium text-link-primary">
			<a href="/{kind}/{item.id}">Read more...</a>
		</div>
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: minmax(3fr 1fr);
	}

	.main-content {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-rows: 2;
		column-gap: 20px;
		align-items: start;
	}

	.article {
		display: grid;
		grid-template-rows: minmax(1fr 2fr);
	}

	.read-more {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-self: end;
		padding-top: 10px;
	}
</style>
