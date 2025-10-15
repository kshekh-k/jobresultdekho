<script lang="ts">
	import '@fontsource-variable/inter'; 
	import Footer from '$lib/components/Footer.svelte';
	export let data: { categories: any[] };
	import '../app.css';
	import Header from '$lib/components/Header.svelte';	 
</script>
 <div class="flex flex-col min-h-screen">
<Header categories={data.categories}/>
<main class="flex-1 py-5 lg:py-10">
	<slot />
</main>
<Footer categories={data.categories} />
</div>


