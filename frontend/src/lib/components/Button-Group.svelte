<script lang="ts">
	import { Button, type ButtonProps } from '$lib/components/ui/button/index.js';
	import { createEventDispatcher } from 'svelte';

	export let options: { label: string; value?: string; href?: string }[] = [];
	export let selected: string | null = null;

	export let variant: 'grouped' | 'separated' | 'vertical' | 'vertical-separated' = 'grouped';
	export let size: 'sm' | 'default' | 'lg' = 'default';
	export let distribution: 'auto' | 'equal' | 'justify' = 'auto';

	export let selectedVariant: ButtonProps['variant'] = 'default';
	export let normalVariant: ButtonProps['variant'] = 'outline';
 
	 // 🔥 new: expose onClick + onSelect
	const dispatch = createEventDispatcher<{
		click: MouseEvent;
		select: string;
	}>();
    function handleClick(option: { label: string; value?: string; href?: string }, event: MouseEvent) {
		// update selected state
		selected = option.value ?? option.href ?? option.label;

		// bubble events out
		dispatch('click', event);
		dispatch('select', selected);
	}
</script>

{#if variant === 'separated'}
	<div class="flex gap-2 w-full" class:justify-between={distribution === 'justify'}>
		{#each options as option}
			{#if option.href}
				<!-- ✅ Render as Link -->
				<Button
					href={option.href}
					{size}
					variant={selected === option.value ? selectedVariant : normalVariant}
                    class="{distribution === 'equal' && 'flex-1'}"					 
					onClick={(e:any) => handleClick(option, e)}
				>
					{option.label}
				</Button>
			{:else}
				<!-- ✅ Render as Button -->
				<Button
					{size}
					variant={selected === option.value ? selectedVariant : normalVariant}
					class="{distribution === 'equal' && 'flex-1'}"
					onClick={(e:any) => handleClick(option, e)}
				>
					{option.label}
				</Button>
			{/if}
		{/each}
	</div>
{/if}
