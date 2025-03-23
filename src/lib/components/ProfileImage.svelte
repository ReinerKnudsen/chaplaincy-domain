<script lang="ts">
	type Photo = {
		url: string;
		name: string;
	};

	export let photo: Photo;
</script>

<div class="profile-image max-w-20 sm:max-w-40 lg:max-w-60">
	<img src={photo.url} alt={`profile ${photo.name}`} class="rounded-xl" />
</div>
