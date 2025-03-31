<script lang="ts">
	export let child;
	export let disabled = false;
</script>

<div class="mb-2 mt-6 {$$props.class || ''}">
	<label for={child} class="text-xl font-semibold {disabled ? 'opacity-30' : 'opacity-100'}">
		<slot />
	</label>
</div>
