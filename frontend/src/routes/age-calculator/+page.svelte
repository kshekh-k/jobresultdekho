<script lang="ts">
	import AgeCalculator from '$lib/components/AgeCalculator.svelte';
	import InnerHero from '$lib/components/InnerHero.svelte';
	import Layout from '$lib/components/Layout.svelte';

	// No JS needed for this static page
</script>

<svelte:head>
	<title>Age Calculator — JobResultDekho</title>
	<meta
		name="description"
		content="Age Calculator for JobResultDekho.com — jobs, results, admit cards and study material for Indian students."
	/>
</svelte:head>

<Layout heading={'Age Calculator'}>
	<AgeCalculator />
</Layout>
