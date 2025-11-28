<script lang="ts"> 
	import { SITE_URL } from "$lib/utils";
	import NavbarFooter from "./NavbarFooter.svelte";
	import SocialMedia from "./SocialMedia.svelte";

  export let categories: any[] = [];
  // Extract only categories that have children (optional)
  const parentsWithChildren = categories.filter(cat => cat.children?.length > 0);
  // Flatten all children into one array
  const childCategories = parentsWithChildren.flatMap(cat => cat.children);
</script>
<footer class="bg-slate-900 ">
  <div class="max-w-screen-xl mx-auto px-4 divide-y divide-white/10">
    <div class="py-4 flex flex-wrap items-center justify-between gap-2 flex-col md:flex-row">
      <h4 class="xl:text-xl font-bold text-white"><a href="{SITE_URL}"><img src="/image/jobresultdekho-logo-white.svg" alt="Job Result Dekho logo" class="h-10" /></a></h4>
      <NavbarFooter categories={categories} />
      <SocialMedia />
    </div>
    <div class="flex flex-col-reverse md:flex-row justify-between items-center gap-1 py-2">         
        <p class="text-sm text-white/60 py-1">JobResultDekho.com &copy; {new Date().getFullYear()} | All rights reserved</p> 
      <div class="flex space-x-4 text-sm">
        {#if childCategories.length > 0}
          {#each childCategories as child}
            <a href="{"/" + child.slug}" 
              class="hover:text-white text-white/60 duration-200 transition-colors py-1"
            >{child.title}</a>
          {/each}
        {/if}           
      </div>
    </div>
  </div>
</footer>