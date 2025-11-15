<script lang="ts">
	import InnerHero from '$lib/components/InnerHero.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import ImageToPdf from '$lib/components/ImageToPdf.svelte';
	// import * as Card from '$lib/components/ui/card/index.js';
</script>

<svelte:head>
	<title>Image to PDF | JobResultDekho.com</title>
	<meta
		name="description"
		content="Image to PDF JobResultDekho.com for support, queries, and feedback."
	/>
</svelte:head>
<Layout heading={'Image to PDF'}ss headerBgColor={'bg-indigo-600'}>	
	<ImageToPdf />
</Layout>
 
