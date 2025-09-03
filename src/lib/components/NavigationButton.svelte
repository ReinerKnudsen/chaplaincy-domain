<script lang="ts">
	import Icon from '@iconify/svelte';

	interface Props {
		id: string;
		type: 'events' | 'news';
		direction: 'prev' | 'next';
	}

	let { id, type, direction }: Props = $props();

	let url = $derived(`/${type}/${id}`);
	let icon = $derived(`fa6-regular:circle-${direction === 'prev' ? 'left' : 'right'}`);
	let linkText = $derived(`${direction === 'prev' ? 'Previous ' : 'Next '} ${type === 'events' ? 'Event' : 'News'}`);
</script>

<div>
	<a class="link" href={url}>
		<div class="flex flex-row gap-2">
			<Icon {icon} class="h-6 w-6" /><span>{linkText}</span>
		</div></a
	>
</div>
