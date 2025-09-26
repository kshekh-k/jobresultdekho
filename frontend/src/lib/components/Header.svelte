<script lang="ts">
	import Input from './ui/input/input.svelte';
	import Navbar from './Navbar.svelte'; 
	import Icon from './ui/Icon.svelte';
	import { Search } from 'lucide-svelte';
	import Annoucment from './Annoucment.svelte';
	import { Button } from "$lib/components/ui/button/index.js";
	export let categories: any[] = [];
	let isMobileMenuOpen = false;
	let isMoreOpen = false;
	
</script>

<header class="w-full border-b border-black/10 bg-white">
	<!-- 🔴 High Alerts Row -->
	 <Annoucment />
	<!-- Top Section -->
	<div class="max-w-screen-xl mx-auto px-3">
		<div class="flex items-center justify-between py-3">
			<!-- Logo -->
			<div class="text-xl font-bold text-blue-600"><a href="/">JobResultWale</a></div>
			<!-- Desktop Menu -->
			<div class="hidden md:flex">
				<Navbar {categories} />
			</div>
			<!-- Search + Button -->
			<div class="hidden md:flex items-center space-x-4">
				<div class="relative">
					<Input type="search" placeholder="Search..." class="bg-white shadow-none pr-6" />
					<button class="border-none bg-transparent hover:bg-transparent hover:text-sky-600 absolute top-0 right-0 cursor-pointer"><Icon name={Search} size={16} /></button>
				</div>
				<Button href="/contact" variant="success">Contact</Button>
				 
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
