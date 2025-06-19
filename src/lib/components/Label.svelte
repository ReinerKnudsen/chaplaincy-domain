<script lang="ts">
	interface Props {
		child: string;
		disabled?: boolean;
		class?: string;
		children?: () => any;
	}

	let { child, disabled, class: klass, children }: Props = $props();
</script>

<div class={klass || 'mt-6 mb-2'}>
	<label for={child} class="text-xl font-semibold {disabled ? 'opacity-30' : 'opacity-100'}">
		{@render children?.()}
	</label>
</div>
