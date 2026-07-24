<script lang="ts">
	import Icon from './Icon.svelte';
	import { X } from 'lucide-svelte';
	import { SITE_NAME, SITE_URL } from '$lib/utils';
	export let open = false;
	export let title: string = 'Menu'; // 🟢 title prop
	export let side: 'left' | 'right' | 'top' | 'bottom' = 'left';
	export let close: () => void = () => {};
	export let siteLogo = false

	// Handle Escape key to close drawer
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') close();
	};
</script>

{#if open}
	<!-- Overlay -->
	<button
		type="button"
		class="fixed inset-0 bg-black/50 z-40 cursor-default"
		aria-label="Close menu"
		on:click={close}
		on:keydown={handleKeydown}
	></button>
{/if}

<!-- Drawer Panel -->
<div
	class={`fixed z-50 bg-sky-800 shadow-xl transition-transform duration-300 ease-in-out flex flex-col divide-y divide-white/10
    ${
			side === 'left'
				? 'top-0 -left-1 h-full w-full max-w-sm ' + (open ? 'translate-x-0' : '-translate-x-full')
				: side === 'right'
					? 'top-0 -right-1 h-full w-full max-w-sm ' + (open ? 'translate-x-0' : 'translate-x-full')
					: side === 'top'
						? 'top-0 left-0 w-full h-1/2 ' + (open ? 'translate-y-0' : '-translate-y-full')
						: 'bottom-0 left-0 w-full h-1/2 ' + (open ? 'translate-y-0' : 'translate-y-full')
		}
  `}
>
	<!-- Header -->
	<div class="flex items-center justify-between p-4">
		<slot name="header">
			{#if siteLogo}
				<div class="relative">
					<a href={SITE_URL} title={SITE_NAME}>
						<img
							src="/image/jobresultdekho-logo-white.svg"
							alt="Job Result Dekho logo"
							title="Job Result Dekho logo"
							class="h-8"
						/>
					</a>
					<h2 class="text-lg font-semibold text-white sr-only">{title}</h2>
				</div>
			{:else}
				<h2 class="text-lg font-semibold text-white">{title}</h2>
			{/if}
			<button on:click={close} class="text-white hover:text-red-100 text-xl font-bold">
				<Icon name={X} size={20} />
			</button>
		</slot>
	</div>

	<!-- Body -->
	<div class="overflow-y-auto p-2 flex-1">
		<slot />
	</div>

	<!-- Footer -->
	<div class="p-4">
		<slot name="footer" />
	</div>
</div>
