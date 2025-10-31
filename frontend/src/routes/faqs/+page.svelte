<script lang="ts">
	import FAQs from '$lib/components/FAQs.svelte';
	import InnerHero from '$lib/components/InnerHero.svelte';
	import Layout from '$lib/components/Layout.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<svelte:head>
	<title>FAQs — JobResultDekho</title>
	<meta name="description" content="FAQs JobResultDekho.com for support, queries, and feedback." />
</svelte:head>

<Layout heading={'FAQs'}>
	<FAQs />
</Layout>
