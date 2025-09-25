<script lang="ts">
	// Supports weights 100-900
	import '@fontsource-variable/inter';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	export let data: { categories: any[] };
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
 
	 
</script>
 
<Header/>
<Navbar categories={data.categories} />
<main class="min-h-screen">
	<slot />
</main>
<Footer />
