<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	// import Autoplay from 'embla-carousel-autoplay';
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import { Navigation, Pagination, Autoplay } from 'swiper/modules';
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';

	// Example alerts (you can fetch from API later)
	const alerts = [
		'🔥 New Admit Card Released for SSC 2025!',
		'📢 Latest Job Openings in Banking Sector!',
		'⚡ Answer Key for UPSC Prelims Out Now!',
		'🔥 New Admit Card Released for SSC 2025!',
		'📢 Latest Job Openings in Banking Sector!',
		'⚡ Answer Key for UPSC Prelims Out Now!'
	];
	// const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });

	let swiper: Swiper | null = null;

	onMount(() => {
		swiper = new Swiper('.mySwiper', {
			modules: [Navigation, Pagination, Autoplay],
			slidesPerView: 1,
			spaceBetween: 10,
			loop: true,
			autoplay: { delay: 3000 },
			pagination: false,
			navigation: false,
			 breakpoints: {
        640: {
          slidesPerView: 1,
          
        },
        768: {
          slidesPerView: 2,
           
        },
        1024: {
          slidesPerView: 3,
           
        },
      },
		});
	});
</script>

<div class="text-slate-900 text-sm font-medium bg-white py-1">
	<div class="max-w-screen-xl mx-auto px-3 py-1 after:table after:clear-both">
		<span
			class="font-semibold text-white bg-red-500 rounded py-2 px-1 sm:p-3 text-sm leading-1 hidden sm:block shrink-0 sm:float-left"
			>High Alerts</span
		>
		<div class="sm:float-left sm:w-[calc(100%-100px)] sm:pt-1 sm:pl-2">
			<div class="swiper mySwiper w-full">
				<div class="swiper-wrapper">
					{#each alerts as cat}
						<div class="swiper-slide">
							<div class="flex justify-center">
								<a href="/" class="py-1 px-3 ease-in-out duration-200 hover:bg-slate-900/20 rounded-sm"
									>{cat}</a
								>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- <Carousel.Root
			class="max-w-full"
			plugins={[plugin]}
			onmouseenter={plugin.stop}
			onmouseleave={plugin.reset}
		>
			<Carousel.Content class="flex-1 max-w-full">
				{#each alerts as cat}
					<Carousel.Item class="w-full flex justify-center"><a href="/" class="py-1 px-3 ease-in-out duration-200 hover:bg-white/20 rounded-sm">{cat}</a></Carousel.Item>
				{/each}
			</Carousel.Content>
		</Carousel.Root> -->
		</div>
	</div>
</div>
