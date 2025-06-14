<script lang="ts">
	export let child;
	export let disabled = false;
</script>

<div class={$$props.class || 'mt-6 mb-2'}>
	<label for={child} class="text-xl font-semibold {disabled ? 'opacity-30' : 'opacity-100'}">
		<slot />
	</label>
</div>
