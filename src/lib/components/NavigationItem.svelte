<script lang="ts">
	interface Props {
		url: string;
		label: string;
		onClick: (event: Event) => void;
	}

	let { url, label, onClick }: Props = $props();
</script>

<li>
	<button class="btn btn-outline border-0 text-xl font-semibold">
		<a href={url} class="text-primary-80" onclick={onClick}>{label}</a>
	</button>
</li>
