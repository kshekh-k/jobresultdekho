<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	// Tailwind Variants
	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
				destructive:
					"bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white",
				outline:
					"bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
				secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 hover:underline",
				white: "bg-white text-slate-500 shadow-xs hover:bg-slate-200",
				success: "bg-emerald-500 text-white shadow-xs hover:bg-emerald-600",
				dark: "hover:bg-slate-600 text-white bg-slate-500",
				primary: "bg-sky-500 text-white shadow-xs hover:bg-sky-600",
				bordered: "border border-slate-300 text-slate-500 hover:border-slate-500 hover:bg-slate-500 hover:text-white",
				light: "bg-slate-200 text-slate-600 hover:bg-slate-600 hover:text-white",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				xs: "h-6 gap-1.5 rounded-sm px-2 has-[>svg]:px-1.5",
				sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	});

	// Types
	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];
	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			href?: string;
			onClick?: (event: MouseEvent) => void;
			onSelect?: (value: any) => void;
			disabled?: boolean;
			type?: "button" | "submit" | "reset";
			className?: string;
			ref?: HTMLElement | null;

			// Icon props
			icon?: any; // icon component name to pass into <Icon name={...} />
			iconSize?: number;
			iconClassName?: string;
			iconPosition?: "left" | "right" | undefined;
			iconOnly?: boolean;
			ariaLabel?: string; // useful when iconOnly
		};
</script>

<script lang="ts">
	import Icon from "$lib/components/ui/Icon.svelte"; // your reusable Icon component

	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled = false,
		onClick,
		onSelect,
		children,
		icon,
		iconSize = 20,
		iconClassName = "",
		iconPosition = "left",
		iconOnly = false,
		ariaLabel,
		...restProps
	}: ButtonProps = $props();

	const handleClick = (event: MouseEvent) => {
		onClick?.(event);
		onSelect?.(event);
	};
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(
			buttonVariants({ variant, size }),
			iconOnly && "justify-center px-0 size-9",
			className
		)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		onclick={handleClick}
		aria-label={iconOnly ? ariaLabel : undefined}
		{...restProps}
	>
		{#if icon && iconPosition === "left"}
			<Icon name={icon} size={iconSize} className={iconClassName} />
		{/if}

		{#if !iconOnly}
			{@render children?.()}
		{/if}

		{#if icon && iconPosition === "right"}
			<Icon name={icon} size={iconSize} className={iconClassName} />
		{/if}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(
			buttonVariants({ variant, size }),
			iconOnly && "justify-center px-0 size-9",
			className
		)}
		{type}
		{disabled}
		onclick={handleClick}
		aria-label={iconOnly ? ariaLabel : undefined}
		{...restProps}
	>
		{#if icon && iconPosition === "left"}
			<Icon name={icon} size={iconSize} className={iconClassName} />
		{/if}

		{#if !iconOnly}
			{@render children?.()}
		{/if}

		{#if icon && iconPosition === "right"}
			<Icon name={icon} size={iconSize} className={iconClassName} />
		{/if}
	</button>
{/if}
