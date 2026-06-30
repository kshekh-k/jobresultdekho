<script lang="ts">
	import Navbar from './Navbar.svelte';
	import Icon from './ui/Icon.svelte';
	import { Menu } from 'lucide-svelte';
	import Annoucment from './Annoucment.svelte';
	import SearchBox from './SearchBox.svelte';
	import Panel from '$lib/components/ui/Panel.svelte';
	import TranslateToggle from './TranslateToggle.svelte';
	import { SITE_NAME, SITE_URL } from '$lib/utils';
	export let categories: any[] = [];
	export let highAlertPosts: any[] = [];

	let isMoreOpen = false;
</script>

<header class="w-full bg-sky-800" translate="no">
	<!-- 🔴 High Alerts Row -->
	<Annoucment highAlertPosts={highAlertPosts} />

	<!-- Top Section -->
	<div class="max-w-screen-xl mx-auto px-3">
		<div class="flex items-center justify-between py-1 md:py-3">
			<!-- Logo -->
			<div class="xl:text-xl font-bold text-blue-600">
				<a href="{SITE_URL}" title={SITE_NAME}>
					<img src="/image/jobresultdekho-logo-white.svg"
						alt="Job Result Dekho logo"	title="Job Result Dekho logo"
						class="h-6 md:h-8 lg:h-10"
					/>
				</a>
			</div>

			<!-- Desktop Menu -->
			<div class="hidden lg:flex">
				<Navbar categories={categories}  />
			</div>			
			
			<div class="flex gap-1 items-center">
				<!-- Search -->
				<div class="flex w-40 sm:w-60 lg:w-40 xl:w-auto">
					<SearchBox boxSize="w-full" />
				</div>
				<!-- Hindi / English toggle -->
				<TranslateToggle />
				<!-- Mobile Menu Button -->
				<button class="lg:hidden text-white p-3" on:click={() => (isMoreOpen = true)}>
					<Icon name={Menu} size={20} />
				</button>
			</div>
		</div>
	</div>

	<!-- Drawer for Mobile Menu -->
	<Panel open={isMoreOpen} close={() => (isMoreOpen = false)} side="left" title="Menu">
		<Navbar categories={categories} onNavigate={() => (isMoreOpen = false)} />
	</Panel>
</header>
