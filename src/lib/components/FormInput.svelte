<script>
	import { Input, Label } from 'flowbite-svelte';
	export let title = 'no titel provided';
	export let id = 'text';
	export let placeholder = 'Event title';
	export let required = false;

	if (required) {
		title = `${title} *`;
	}
</script>

<div>
	<Label for={id} class="mb-2">{title}</Label>
	<Input type="text" {id} {placeholder} {required} />
</div>
