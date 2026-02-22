<script lang="ts">
	interface Props {
		label: string;
		id: string;
		active?: boolean;
		onChange?: (active: boolean) => void;
	}

	let { label, id, active = $bindable(), onChange }: Props = $props();

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const isChecked = target.checked;

		if (onChange) {
			onChange(isChecked);
		}
	}
</script>

<div class="mt-1 p-1">
	<label class="flex flex-row items-center">
		<input
			type="checkbox"
			class="checkbox mr-4"
			aria-describedby="helper-checkbox-text"
			{id}
			checked={active}
			onchange={handleChange}
		/>
		{label}
	</label>
</div>
