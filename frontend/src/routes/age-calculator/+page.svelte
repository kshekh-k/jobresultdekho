<script lang="ts">
	import AgeCalculator from '$lib/components/AgeCalculator.svelte';
	import InnerHero from '$lib/components/InnerHero.svelte';

	// No JS needed for this static page
</script>

<svelte:head>
	<title>Age Calculator — JobResultDekho</title>
	<meta
		name="description"
		content="Age Calculator for JobResultDekho.com — jobs, results, admit cards and study material for Indian students."
	/>
</svelte:head>
<InnerHero
	heading="Age Calculator"
	bgColor="bg-sky-800"
	textColor="text-white"
	className="px-4 md:px-4 mb-5"
></InnerHero>
<!-- <div>Kamran</div> -->
<AgeCalculator />