<script lang="ts">
	export let headerData;
	export let textStyle: 'white' | 'dark' = 'white';
</script>

<div class="page-header mb-10">
	<div
		class="page-header-image grid h-[100px] grid-cols-1 items-center bg-cover bg-center md:h-[150px]"
		style="background-image: url({headerData.imageUrl})"
	>
		<h1
			class="page-title {textStyle === 'dark'
				? 'text-primary-80'
				: 'text-white-primary'} pl-10 text-3xl font-semibold md:text-5xl"
		>
			{headerData.title}
		</h1>
	</div>
	<div class="pt-2 text-right text-sm">
		Image by: <a class=" font-semibold text-blue-400" href={headerData.photoUrl} target="_blank"
			>{headerData.photoName}</a
		>
	</div>
</div>

<style>
</style>
