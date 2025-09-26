<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  export type CardVariant = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "cyan" | "indigo" | "pink" | "red" | "orange"  | (string & {});

  let {
    ref = $bindable(null),
    class: className,
    variant = "default",
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & { variant?: CardVariant } = $props();

  const variantClasses: Record<CardVariant, string> = {
    default: "bg-card text-card-foreground border-gray-200",
    primary: "bg-sky-500 text-white border-sky-500",
    secondary: "bg-gray-50 text-gray-900 border-gray-200",
    success: "bg-emerald-500 text-white border-emerald-500",
    warning: "bg-orange-500 text-white border-orange-500",
    danger: "bg-rose-500 text-white border-rose-500",
    cyan: "bg-cyan-500 text-white border-cyan-500",
    indigo: "bg-indigo-500 text-white border-indigo-500",
    pink: "bg-pink-500 text-white border-pink-500",
    red: "bg-red-800 text-white border-pink-800",
    orange: "bg-orange-400 text-white border-orange-400",
  };
</script>

<div
  bind:this={ref}
  data-slot="card"
  class={cn(
    "flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
    variantClasses[variant],
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
