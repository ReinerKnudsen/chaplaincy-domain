<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: "min-w-32 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md text-md font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
		variants: {
			variant: {
				default: 'justify-center bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				primary: 'justify-center bg-primary-100 text-primary-foreground shadow-xs hover:bg-primary-60',
				destructive:
					'justify-center bg-destructive shadow-xs hover:bg-destructive/60 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white',
				outline:
					'justify-center bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border',
				secondary: 'justify-center bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				menu: 'justify-center hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-xl font-semibold min-w-0 gap-0',
				ghost: 'justify-center hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'justify-center text-primary underline underline-offset-4 hover:font-semibold hover:text-lg',
				listItem:
					'justify-left pl-2 w-full text-primary underline underline-offset-6 hover:font-semibold hover:text-lg hover:text-bold',
				active: 'bg-secondary-40  rounded-md py-4 px-2 text-left border-b hover:bg-secondary-60',
				inactive: 'hover:bg-secondary-40 rounded-md border-b bg-white px-2 py-4',
				calltoaction:
					'justify-center bg-seablue-100 text-primary-foreground shadow-xs hover:bg-seablue-60 hover:text-primary-text h-12 w-60',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				xl: 'h-12 w-60 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
				nav: 'h-10 px-6 text-lg font-semibold',
				wide: 'h-9 px-4 py-2 has-[>svg]:px-3 w-[50%]',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'default',
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
