<script lang="ts">
	import InnerHero from '$lib/components/InnerHero.svelte';
	import PhotoEditor from '$lib/components/PhotoEditor.svelte';
	// import * as Card from '$lib/components/ui/card/index.js';
</script>

<svelte:head>
	<title>About Us — JobResultDekho</title>
	<meta
		name="description"
		content="About Us JobResultDekho.com for support, queries, and feedback."
	/>
</svelte:head>
 <!-- Blue Banner -->	 
	<InnerHero heading="About Us" bgColor="bg-sky-800" textColor="text-white" className="mb-5 max-w-screen-xl mx-auto px-3"></InnerHero>
	<div class="max-w-screen-xl mx-auto px-3">
	
		<PhotoEditor />
	</div>
 
