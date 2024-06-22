<script>
	import PageHeader from '$lib/components/PageHeader.svelte';

	const headerData = {
		title: 'Prayers',
		photoName: 'Milada Vigerova',
		photoUrl: 'https://unsplash.com/@milada_vigerova',
		imageUrl:
			'https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fprayer.jpg?alt=media&token=d2840015-356f-43dc-8408-19637a86e9bd'
	};
</script>

<PageHeader {headerData} textStlye="white" />

This page will provide both a list of prayers for this week and a form to ask for prayers.
