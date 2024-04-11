<script>
	export let item;
	console.log(item);
</script>

<div class="container my-2 rounded-2xl border border-slate-200 p-4 shadow-xl">
	<div class="main-content">
		<div class="image">
			<!-- Bild links  -->
			<img class="image rounded-2xl" src={item.data.image} alt={item.data.imagealt} />
		</div>
		<div class="article">
			<div class="mb-4 text-2xl font-semibold">
				<a href="/news/{item.id}">{item.data.title}</a>
			</div>
			<div class="mb-4">
				{item.data.slug}
			</div>
		</div>
	</div>
	<div class="read-more">
		<div class="justify-self-start text-slate-400">{item.data.author}</div>
		<div class="justify-self-center text-slate-400">{item.data.startdate}</div>
		<div class="justify-self-end font-medium text-primary-700">
			<a href="/news/{item.id}">Read more...</a>
		</div>
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: minmax(3fr 1fr);
		height: 250px;
	}

	.main-content {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-template-rows: 2;
		column-gap: 20px;
		align-items: start;
	}
	.image {
	}

	.article {
		display: grid;
		grid-template-rows: minmax(1fr 2fr);
	}

	.read-more {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-self: end;
	}
</style>
