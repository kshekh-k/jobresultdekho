<script lang="ts">
	import InnerHero from './InnerHero.svelte';
	import Sidebar from './Sidebar.svelte';
	export let heading: string | undefined;
	export let header: boolean = true; 
	export let headerBgColor: string | undefined = "bg-rose-800";
	export let headerTextColor: string | undefined = "text-white";
	export let rounded: string | undefined = "rounded-2xl";
	export let paddingY: string | undefined = "py-10";
	export let maxWidth: string | undefined = "max-w-6xl";
	export let align: string | undefined = "text-center";
	export let className: string | undefined = "mb-5 max-w-screen-xl mx-auto px-3";
	export let backgroundImage: string | undefined = "";
</script>

{#if header}
	<!-- Blue Banner -->
	<InnerHero
		{heading}
		bgColor={headerBgColor}
		textColor={headerTextColor}
		className={className} 
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
