<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageHeader {headerData} textStyle="white" />

<div class=" flex flex-col">
	<ItemCardFav item={favNews} kind="news" />
	<div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
		{#each newsItems as newsItem}
			<ItemCard item={newsItem} kind="news" />
		{/each}
	</div>
</div>

<div>
	Worshipping God together is at the heart of the chaplaincy’s life. Before bringing our gifts to
	the altar table, it is tradition to offer one another a sign of peace (demonstrated through the
	shaking of hands). We do this in response to the words of Jesus himself: "When you are offering
	your gift at the altar, first be reconciled to your brother and sister, and then come to offer
	your gift" (Matthew 5:23-24). "Sharing the peace" is our way of acknowledging the love and unity
	that Jesus gives to us. In the Eucharistic Prayer, we ask God to take the bread and wine, and make
	them into Jesus' body and blood as a way to remember him. Jesus said "This is my body..." so
	receiving the bread and wine is like receiving Jesus himself and knowing that he is present with
	us. We invite all believing Christians to receive Holy Communion. If you do not wish to do so, you
	are invited to come forward with everyone else to be blessed in the name of Jesus.
</div>

<style>
</style>
