<script lang="ts">
	import '@fontsource-variable/inter'; 
	import Footer from '$lib/components/Footer.svelte';
	export let data: { categories: any[] };
	import '../app.css';
	import Header from '$lib/components/Header.svelte';	 
</script>
 
<Header categories={data.categories}/>
<main class="min-h-screen">
	<slot />
</main>
<Footer />
