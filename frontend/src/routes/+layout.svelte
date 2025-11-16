<script lang="ts">
	export let data: { categories: any[] };
	import '../app.css';
	import { setContext } from 'svelte';		
	import '@fontsource-variable/inter';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';	
	setContext('categoryTree', data.categories);
</script>
<div class="flex flex-col min-h-screen">	
	<Header categories={data.categories}/>	
	<main class="flex-1 py-5 ">			
		<slot />
	</main>
	<Footer categories={data.categories} />
</div>


