<script lang="ts">
	import InnerHero from '$lib/components/InnerHero.svelte';
	import PhotoEditor from '$lib/components/PhotoEditor.svelte';

	// No JS needed for this static page
</script>

<svelte:head>
	<title>Disclaimer — JobResultDekho</title>
	<meta
		name="description"
		content="Disclaimer for JobResultDekho.com — jobs, results, admit cards and study material for Indian students."
	/>
</svelte:head>
<InnerHero
	heading="Photo Edit"
	bgColor="bg-sky-800"
	textColor="text-white"
	className="px-4 md:px-4 mb-5"
></InnerHero>
<div>Kamran</div>
<PhotoEditor />
