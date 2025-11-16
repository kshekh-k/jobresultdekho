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
	<div class="max-w-screen-xl mx-auto px-3 py-1 ">
<div class="flex gap-2 items-center">
		<span class="font-semibold text-white bg-red-500 rounded py-2 px-1 sm:p-3 text-sm leading-1 shrink-0"
			><span class="sm:hidden block">H/A</span><span class="hidden sm:block">High Alerts</span></span
		>
		<div class="flex-1 max-w-[calc(100%-41px)] sm:max-w-[calc(100%-104px)]">
			<div class="swiper mySwiper w-full">
				<div class="swiper-wrapper">
					{#each alerts as cat}
						<div class="swiper-slide">
							<div class="flex justify-center">
								<a href="/" class="py-1 px-3 ease-in-out duration-200 hover:bg-slate-900/10 rounded-sm truncate text-center">{cat}</a>
							</div>
						</div>
					{/each}
				</div>
			</div>
 
		</div>
	</div>
	</div>
</div>
