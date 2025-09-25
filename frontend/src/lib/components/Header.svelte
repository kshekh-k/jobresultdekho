<script lang="ts">
	import Input from "./ui/input/input.svelte"; 
	 import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
	import Navbar from "./Navbar.svelte";
	let isMobileMenuOpen = false;
	let isMoreOpen = false;
	// Example alerts (you can fetch from API later)
	const alerts = [
		'🔥 New Admit Card Released for SSC 2025!',
		'📢 Latest Job Openings in Banking Sector!',
		'⚡ Answer Key for UPSC Prelims Out Now!'
	];
</script>

<header class="w-full border-b border-black/10 bg-white">
	<!-- 🔴 High Alerts Row -->
	<div class="text-white text-sm font-medium bg-sky-500 py-1">
		<div class="max-w-7xl mx-auto px-4 py-1 flex items-center gap-2">
			<span class="font-semibold bg-red-500 border border-white rounded py-3 px-3 leading-1 block">High Alerts</span>
			<marquee behavior="scroll" direction="left" scrollamount="5" class="flex-1">
				{alerts.join(' • ')}
			</marquee>
		</div>
	</div>
	<!-- Top Section -->
	<div class="max-w-screen-xl mx-auto px-3">
		<div class="flex items-center justify-between py-3">
			<!-- Logo -->
			<div class="text-xl font-bold text-blue-600">JobResultWale</div>

			<!-- Desktop Menu -->
           
			<div class="hidden md:flex ">
				<Navbar />
			</div>

			<!-- Search + Button -->
			<div class="hidden md:flex items-center space-x-4">
                <div class="relative">
                    <Input type="search" placeholder="Search..." class="" />
			 
            </div>
				<a
					href="/contact"
					class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
				>
					Contact
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden text-gray-700"
				on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>
	</div>
	<!-- Mobile Menu -->
	{#if isMobileMenuOpen}
		<div class="md:hidden px-4 pb-4 space-y-2 font-medium text-gray-700">
			<a href="/" class="block hover:text-blue-600">Home</a>
			<a href="/jobs" class="block hover:text-blue-600">Latest Jobs</a>
			<a href="/admit-cards" class="block hover:text-blue-600">Admit Cards</a>
			<a href="/results" class="block hover:text-blue-600">Results</a>
			<a href="/syllabus" class="block hover:text-blue-600">Syllabus</a>
			<a href="/answer-key" class="block hover:text-blue-600">Answer Key</a>
			<div>
				<button
					class="w-full text-left hover:text-blue-600"
					on:click={() => (isMoreOpen = !isMoreOpen)}
				>
					More
				</button>
				{#if isMoreOpen}
					<div class="ml-4 space-y-1">
						<a href="/about" class="block hover:text-blue-600">About Us</a>
						<a href="/contact" class="block hover:text-blue-600">Contact</a>
						<a href="/faq" class="block hover:text-blue-600">FAQ</a>
					</div>
				{/if}
			</div>
			<div class="flex items-center gap-2">
				<input
					type="text"
					placeholder="Search..."
					class="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
				/>
				<a
					href="/contact"
					class="px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
				>
					Contact
				</a>
			</div>
		</div>
	{/if}
</header>
