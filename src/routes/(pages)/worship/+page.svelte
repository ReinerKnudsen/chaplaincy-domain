<script>
	import PageHeader from '$lib/components/PageHeader.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import ItemCardFav from '$lib/components/ItemCardFav.svelte';

	const headerData = {
		title: 'Worship',
		photoName: 'Milada Vigerova',
		photoUrl: 'https://unsplash.com/@milada_vigerova',
		imageUrl:
			'https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fprayer.jpg?alt=media&token=d2840015-356f-43dc-8408-19637a86e9bd',
	};
</script>

<PageHeader {headerData} textStyle="white" />

<div class="mx-auto w-[80%] text-xl">
	Worshipping God together is at the heart of the chaplaincy’s life. Before bringing our gifts to
	the altar table, it is tradition to offer one another a sign of peace (demonstrated through the
	shaking of hands). We do this in response to the words of Jesus himself:
	<blockquote class="my-8 border-l-4 border-gray-300 bg-gray-50 p-4">
		<p class="text-xl font-medium italic leading-relaxed text-gray-900">
			When you are offering your gift at the altar, first be reconciled to your brother and sister,
			and then come to offer your gift.
		</p>
		<p class="mt-1 text-right text-sm">(Matthew 5:23-24)</p>
	</blockquote>
	"Sharing the peace" is our way of acknowledging the love and unity that Jesus gives to us.
	<p>
		In the Eucharistic Prayer, we ask God to take the bread and wine, and make them into Jesus' body
		and blood as a way to remember him. Jesus said "This is my body..." so receiving the bread and
		wine is like receiving Jesus himself and knowing that he is present with us.
	</p>
	<p>
		We invite all believing Christians to receive Holy Communion. If you do not wish to do so, you
		are invited to come forward with everyone else to be blessed in the name of Jesus.
	</p>
</div>

<style>
</style>
