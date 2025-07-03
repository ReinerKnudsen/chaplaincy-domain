<script lang="ts">
	import { Button, type ButtonProps } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
	} from '$lib/components/ui/dialog';

	interface Props {
		open: boolean;
		title: string;
		message: string;
		confirmText: string;
		cancelText: string;
		confirmVariant?: ButtonProps['variant'];
		onConfirm: () => void;
		onCancel: () => void;
	}

	let {
		open = false,
		title,
		message,
		confirmText,
		cancelText,
		confirmVariant = 'primary',
		onConfirm,
		onCancel,
	}: Props = $props();

	const handleCancel = () => {
		open = false;
		onCancel();
	};

	const handleConfirm = () => {
		open = false;
		onConfirm();
	};
</script>

<Dialog bind:open>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>
				{title}
			</DialogTitle>
			<DialogDescription>
				{@html message}
			</DialogDescription>
		</DialogHeader>
		<DialogFooter>
			<Button variant="outline" onclick={handleCancel}>{cancelText}</Button>
			<Button variant={confirmVariant} onclick={handleConfirm}>{confirmText}</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
