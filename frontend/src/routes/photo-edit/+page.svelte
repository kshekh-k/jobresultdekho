<script lang="ts">
	import InnerHero from '$lib/components/InnerHero.svelte';
	import PhotoCropper from '$lib/components/PhotoCropper.svelte';
	import PhotoEditor from '$lib/components/PhotoCropper.svelte';

	// No JS needed for this static page
</script>

<svelte:head>
	<title>Photo Editor — JobResultDekho</title>
	<meta
		name="description"
		content="Photo Editor for JobResultDekho.com — jobs, results, admit cards and study material for Indian students."
	/>
</svelte:head>
<InnerHero
	heading="Photo Edit"
	bgColor="bg-sky-800"
	textColor="text-white"
	className="px-4 md:px-4 mb-5"
></InnerHero>
<PhotoEditor />
 <!-- <PhotoCropper /> -->
