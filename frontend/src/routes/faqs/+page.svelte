<script lang="ts">
	import FAQs from '$lib/components/FAQs.svelte';
	import InnerHero from '$lib/components/InnerHero.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<svelte:head>
	<title>FAQs — JobResultDekho</title>
	<meta
		name="description"
		content="FAQs JobResultDekho.com for support, queries, and feedback."
	/>
</svelte:head>
 <!-- Blue Banner -->	 
	<!-- <InnerHero heading="FAQs" bgColor="bg-sky-800" textColor="text-white" className="mb-5 max-w-screen-xl mx-auto px-3"></InnerHero> -->
	<div class="max-w-screen-xl mx-auto px-3">
       <FAQs />
    </div> 