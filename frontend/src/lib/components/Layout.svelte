<script lang="ts">
	import InnerHero from './InnerHero.svelte';
	import Sidebar from './Sidebar.svelte';
	export let heading: string | undefined;
	export let header: boolean = true;
</script>

{#if header}
	<!-- Blue Banner -->
	<InnerHero
		{heading}
		bgColor="bg-rose-500"
		textColor="text-white"
		className="mb-5 max-w-screen-xl mx-auto px-3"
	></InnerHero>
{/if}
<div class="max-w-screen-xl mx-auto px-3">
	<section class="lg:grid lg:grid-cols-12 flex flex-col gap-6">
		<div class="lg:col-span-8 xl:col-span-9 space-y-5">
			<slot />
		</div>
			<Sidebar />
	</section>
</div>
