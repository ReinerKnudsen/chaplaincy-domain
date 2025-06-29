<script lang="ts">
	import { ItemState } from '$lib/stores/ObjectStore';

	interface Props {
		state: string;
		class?: string;
	}

	let { state, class: className = '' } = $props<Props>();

	const stateColor = {
		[ItemState.DRAFT]: 'bg-slate-200',
		[ItemState.SCHEDULED]: 'bg-yellow-200',
		[ItemState.PUBLIC]: 'bg-green-200',
		[ItemState.UNPUBLISHED]: 'bg-red-200',
	};
</script>

<div class="flex items-center justify-center rounded-3xl {stateColor[state]} {className}">{state}</div>
