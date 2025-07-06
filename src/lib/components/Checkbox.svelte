<script lang="ts">
	interface Props {
		label: string;
		id: string;
		checked?: boolean;
		onChange?: (checked: boolean) => void;
	}

	let { label, id, checked = $bindable(), onChange }: Props = $props();

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
			{checked}
			onchange={handleChange}
		/>
		{label}
	</label>
</div>
