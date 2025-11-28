<script lang="ts">
	import Navbar from './Navbar.svelte';
	import Icon from './ui/Icon.svelte';
	import { Menu } from 'lucide-svelte';
	import Annoucment from './Annoucment.svelte';
	import SearchBox from './SearchBox.svelte';
	import Panel from '$lib/components/ui/Panel.svelte';
	import { SITE_URL } from '$lib/utils';
	export let categories: any[] = [];

	let isMoreOpen = false;
</script>

<header class="w-full bg-sky-800">
	<!-- 🔴 High Alerts Row -->
	<Annoucment />

	<!-- Top Section -->
	<div class="max-w-screen-xl mx-auto px-3">
		<div class="flex items-center justify-between py-1 md:py-3">
			<!-- Logo -->
			<div class="xl:text-xl font-bold text-blue-600">
				<a href="{SITE_URL}">
					<img src="/image/jobresultdekho-logo-white.svg"
						alt="Job Result Dekho logo"
						class="h-6 md:h-8 lg:h-10"
					/>
				</a>
			</div>

			<!-- Desktop Menu -->
			<div class="hidden lg:flex">
				<Navbar categories={categories}  />
			</div>

			
			<!-- Mobile Menu Button -->
			<button class="lg:hidden text-white p-3" on:click={() => (isMoreOpen = true)}>
				<Icon name={Menu} size={20} />
			</button>

			<!-- Search -->
			<div class="hidden lg:flex">
			<SearchBox boxSize="w-full" />
			</div>
		</div>
	</div>

	<!-- Drawer for Mobile Menu -->
	<Panel open={isMoreOpen} close={() => (isMoreOpen = false)} side="left" title="Menu">
		<Navbar categories={categories} onNavigate={() => (isMoreOpen = false)} />
		<div slot="footer"><SearchBox boxSize="w-full" /></div>
	</Panel>
</header>
