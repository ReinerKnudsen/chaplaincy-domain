<script>
	import PageHeader from '$lib/components/PageHeader.svelte';

	const headerData = {
		title: 'Groups',
		photoName: 'JJ Ying',
		photoUrl: 'https://unsplash.com/@jjying',
		imageUrl:
			'https://firebasestorage.googleapis.com/v0/b/chaplaincy-website-bncgn.appspot.com/o/images%2Fstock%2Fgroups.jpg?alt=media&token=83a5659a-9299-4f6c-bc5a-2bc5608e1b73'
	};
</script>

<PageHeader {headerData} textStyle="dark" />

<div class="intro pb-4">
	Groups are organized by members of the congregation. They are open to everybody. Below you can
	find all information required about the groups of the church.
</div>

<div class="group">
	<div class="group-header">
		<h2 class="group-title py-2 text-2xl font-semibold">Bible Study Group</h2>
	</div>
	<div class="group-text mb-5">Here goes the description of the group</div>
	<hr />
</div>
<div class="group">
	<div class="group-header">
		<h2 class="group-title py-2 text-2xl font-semibold">Book club</h2>
	</div>
	<div class="group-text mb-5">Here goes the description of the group</div>
	<hr />
</div>
<div class="group">
	<div class="group-header">
		<h2 class="group-title py-2 text-2xl font-semibold">Prayer Shawl Knitting Ministry Group</h2>
	</div>
	<div class="group-text mb-5">Here goes the description of the group</div>
	<hr />
</div>
<div class="group">
	<div class="group-header">
		<h2 class="group-title py-2 text-2xl font-semibold">Visiting team</h2>
	</div>
	<div class="group-text mb-5">Here goes the description of the group</div>
	<hr />
</div>

<style>
	.group {
		@apply mb-10;
	}
</style>
