<script lang="ts">
	import InnerHero from '$lib/components/InnerHero.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import PhotoEditor from '$lib/components/PhotoEditor.svelte';
	// import * as Card from '$lib/components/ui/card/index.js';
</script>

<svelte:head>
	<title>Photo Editir | JobResultDekho.com</title>
	<meta
		name="description"
		content="Photo Editor JobResultDekho.com for support, queries, and feedback."
	/>
</svelte:head>
<Layout heading={'Photo Editor'} headerBgColor={'bg-indigo-600'}>	
	<PhotoEditor />
</Layout>
 
