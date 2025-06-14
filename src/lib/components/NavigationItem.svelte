<script lang="ts">
	export let url: string;
	export let label: string;
	export let onClick: (event: Event) => void;
</script>

<li>
	<button class="btn btn-outline border-0 text-xl font-semibold">
		<a href={url} class="text-primary-80" on:click={onClick}>{label}</a>
	</button>
</li>
