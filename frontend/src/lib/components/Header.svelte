<script lang="ts">
	import Input from './ui/input/input.svelte';
	import Navbar from './Navbar.svelte';
	import Icon from './ui/Icon.svelte';
	import { Menu,  Search, X } from 'lucide-svelte';
	import Annoucment from './Annoucment.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	export let categories: any[] = [];
	let isMobileMenuOpen = false;
	let isMoreOpen = false;
	 // Watch state change and update body class
//   $: {
//     if (isMobileMenuOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//   }
</script>

<header class="w-full border-b border-black/10 bg-white">
	<!-- 🔴 High Alerts Row -->
	<Annoucment />
	<!-- Top Section -->
	<div class="max-w-screen-xl mx-auto px-3">
		<div class="flex items-center justify-between py-2 md:py-0">
			<div class="flex gap-2">
				<!-- Mobile Menu Button -->
				<button
					class="lg:hidden text-gray-700"
					onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				>
				<Icon name={Menu} className="" size={20} />					 
				</button>
				<!-- Logo -->
				<div class="xl:text-xl font-bold text-blue-600"><a href="/">
				<img src="/jobresultdekho-logo.svg" alt="Job Result Dekho logo" class="h-20" />
				</a></div>
			</div>
			<!-- Desktop Menu -->
			<div class="hidden lg:flex">
				<Navbar {categories} />
			</div>
			<!-- Search + Button -->
			<div class="flex items-center sm:space-x-4">
				<div class="relative">
					<Input type="search" placeholder="Search..." class="bg-white shadow-none pr-6 w-32 sm:w-64"  />
					<Button
						variant="ghost"
						class="border-none hover:bg-transparent hover:text-sky-600 absolute top-0 right-0 cursor-pointer"
						><Icon name={Search} size={16} /></Button
					>
				</div>
				<Button href="/contact" variant="success" class="hidden sm:flex">Contact</Button>
			</div>
		</div>
	</div>
	<!-- Mobile Menu -->
	{#if isMobileMenuOpen}
		<div class="lg:hidden fixed inset-0 bg-white z-50 flex justify-center items-center gap-2 py-5">
			<button class="text-gray-700 absolute top-5 right-5 z-10" onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}>
				<Icon name={X} className="" size={20} />					 
			</button>
			<div class="max-h-[calc(100vh-40px)] overflow-auto w-full px-5">
				<Navbar {categories} /> 
			</div>
		</div>
	{/if}
</header>
