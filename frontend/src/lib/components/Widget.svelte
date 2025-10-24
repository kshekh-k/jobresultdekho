<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from './ui/Icon.svelte';
	import { ChevronDown } from 'lucide-svelte';

	export let title: string = 'Widget Title';
	export let headerColor: string = 'bg-sky-500';
	export let menus: { title: string; slug?: string; icon?: any }[] = [];

	let open = true;
	const toggle = () => {
		open = !open;
	};
</script>

<Card.Root class="overflow-hidden p-0 rounded-md gap-0 w-full">
	<!-- Title -->
	<Card.Header
		class="flex items-center justify-between cursor-pointer py-2 px-4 gap-2 {headerColor}"
	>
		<h3 class="text-lg font-semibold text-white">{title}</h3>
		<button
			onclick={toggle}
			type="button" class="p-1 rounded-sm hover:bg-white/20 focus:outline-none text-white">
			<Icon name={ChevronDown} className={open ? 'rotate-180' : 'rotate-0'} size={20} />
		</button>
	</Card.Header>
	{#if open}
		<Card.Content class="p-0 divide-y">
			<!-- Menu List -->
			<ul class="divide-y divide-gray-200">
				{#each menus as menu}
					<li>
						<a
							href={menu.slug || '/#'}
							class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
						>
							{#if menu.icon}
                            <Icon name={menu.icon} size={20} />								 
							{/if}
							{menu.title}
						</a>
					</li>
				{/each}
			</ul>
		</Card.Content>
	{/if}
</Card.Root>
