<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	interface Props {
		url: string;
		label: string;
		onClick: (event: Event) => void;
	}

	let { url, label, onClick }: Props = $props();
</script>

<li>
	<Button variant="menu" class="min-w-0 text-xl font-semibold">
		<a href={url} class="text-primary-80" onclick={onClick}>{label}</a>
	</Button>
</li>
