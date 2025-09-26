<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Autoplay from 'embla-carousel-autoplay';
	// Example alerts (you can fetch from API later)
	const alerts = [
		'🔥 New Admit Card Released for SSC 2025!',
		'📢 Latest Job Openings in Banking Sector!',
		'⚡ Answer Key for UPSC Prelims Out Now!',
        '🔥 New Admit Card Released for SSC 2025!',
		'📢 Latest Job Openings in Banking Sector!',
		'⚡ Answer Key for UPSC Prelims Out Now!'
	];
	const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });
</script>

<div class="text-white text-sm font-medium bg-sky-500 py-1">
	<div class="max-w-screen-xl mx-auto px-3 py-1 flex items-center gap-2">
		<span class="font-semibold bg-red-500 border border-white rounded py-3 px-3 leading-1 block"
			>High Alerts</span
		>
		<Carousel.Root
			class="flex-1"
			plugins={[plugin]}
			onmouseenter={plugin.stop}
			onmouseleave={plugin.reset}
		>
			<Carousel.Content>
				{#each alerts as cat}
					<Carousel.Item class="md:basis-1/2 lg:basis-1/3 flex justify-center"><a href="/" class="py-1 px-3 ease-in-out duration-200 hover:bg-white/20 rounded-sm">{cat}</a></Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root>
	</div>
</div>
