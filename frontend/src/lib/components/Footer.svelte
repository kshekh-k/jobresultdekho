<script lang="ts"> 
	import NavbarFtr from "./NavbarFtr.svelte";
	import SocialMedia from "./Social-media.svelte";
 export let categories: any[] = [];
</script>
<footer class="bg-slate-900 ">
  <div class="max-w-screen-xl mx-auto px-4 divide-y divide-white/10">
    <div class="py-4 flex flex-wrap items-center justify-between gap-2 flex-col md:flex-row">
      <h4 class="xl:text-xl font-bold text-white"><a href="/">JobResultDekho</a></h4>
      <NavbarFtr categories={categories} />
      <SocialMedia />
    </div>
    <div class="flex flex-col-reverse md:flex-row justify-between items-center gap-1 py-2">         
        <p class="text-sm text-white/60 py-1">JobResultDekho.com &copy; {new Date().getFullYear()} | All rights reserved</p> 
      <div class="flex space-x-4 text-sm">
        <a href="/pivacy-policies" class="hover:text-white text-white/60 duration-200 transition-colors py-1">Privacy Policy</a>
        <a href="/terms-conditions" class="hover:text-white text-white/60 duration-200 transition-colors py-1">Terms & Conditions</a>   
      </div>
    </div>
  </div>
</footer>