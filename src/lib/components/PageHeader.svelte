<script>
	export let headerData;
</script>

<div class="page-header mb-10">
	<div
		class="page-header-image grid h-[100px] grid-cols-1 items-center bg-cover md:h-[150px]"
		style="background-image: url({headerData.imageUrl})"
	>
		<div class="page-title pl-10 text-3xl font-semibold text-white md:text-5xl">
			{headerData.title}
		</div>
	</div>
	<div class="pt-2 text-right text-sm">
		Image by: <a class=" font-semibold text-blue-400" href={headerData.photoUrl} target="_blank"
			>{headerData.photoName}</a
		>
	</div>
</div>

<style>
</style>
