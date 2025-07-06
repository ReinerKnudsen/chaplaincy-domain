<script lang="ts">
	type Photo = {
		url: string;
		name: string;
	};

	interface Props {
		photo: Photo;
	}

	let { photo }: Props = $props();
</script>

<div class="profile-image max-w-20 sm:max-w-40 lg:max-w-60">
	<img src={photo.url} alt={`profile ${photo.name}`} class="rounded-xl" />
</div>
