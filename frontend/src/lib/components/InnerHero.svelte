
<script lang="ts">
	export let heading: string | undefined = "Get In Touch";
	export let bgColor: string | undefined = "bg-sky-800";
	export let textColor: string | undefined = "text-white";
	export let rounded: string | undefined = "rounded-2xl";
	export let paddingY: string | undefined = "py-10";
	export let maxWidth: string | undefined = "max-w-6xl";
	export let align: string | undefined = "text-center";
	export let className: string | undefined = "";
	export let backgroundImage: string | undefined = "";
 
</script>

<section class={`mx-auto ${maxWidth} ${className}`}>
	<div
		class={`relative overflow-hidden ${bgColor} ${textColor} ${align} ${paddingY} ${rounded}`}
		style={backgroundImage
			? `background-image: url('${backgroundImage}'); background-size: cover; background-position: center;`
			: ""}
	>
		<h1 class="text-3xl md:text-4xl font-bold">{heading}</h1>
		<slot />
	</div>
</section>
