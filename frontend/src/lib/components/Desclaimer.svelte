<script lang="ts">
	import { SITE_URL } from "$lib/utils";
	import Button from "./ui/button/button.svelte";

</script>
<section class="relative py-10">
	<div class="max-w-screen-lg mx-auto px-3">
		<div class="bg-sky-900 rounded-md p-10">
			<div class="max-w-5xl mx-auto space-y-4 flex flex-col justify-center items-center">
			<p class="text-center text-xl text-white font-bold">
				This website is not associated with official websites. All information provided is for
				general informational purposes only.
			</p>
            <Button href="{SITE_URL}/contact" variant="white" size="lg" title="CONTACT US FOR MORE">CONTACT US FOR MORE</Button>
		</div>
	</div>
	</div>
</section>
