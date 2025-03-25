<script lang="ts">
	export const child: string = '';

	export const disabled: boolean = false;
</script>

<div class="my-2">
	<label for={child} class="text-xl font-semibold {disabled ? 'opacity-30' : 'opacity-100'}">
		<slot />
	</label>
</div>
