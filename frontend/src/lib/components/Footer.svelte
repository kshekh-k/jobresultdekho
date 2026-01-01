<script lang="ts">
  import { SITE_URL, SITE_LOGO, SITE_NAME } from "$lib/utils";
  import NavbarFooter from "./NavbarFooter.svelte";
  import SocialMedia from "./SocialMedia.svelte";
  import CookieConsent from '$lib/components/CookieConsent.svelte';
  import { cookieConsent, notificationConsent } from '$lib/utils';
  export let categories: any[] = [];

  // Exclude list (child slugs)
  const excludedSlugs = new Set(['about-us', 'contact', 'blog', 'faqs']);

  // Extract parents that actually have children
  const parentsWithChildren = (categories ?? []).filter(cat => Array.isArray(cat.children) && cat.children.length > 0);

  // Flatten and exclude
  const childCategories = parentsWithChildren
    .flatMap(cat => cat.children)
    .filter(child => !excludedSlugs.has(child.slug));
</script>

<footer class="bg-slate-900 {(!$cookieConsent || !$notificationConsent) ? 'pb-32 xl:pb-20' : ''}">
  <div class="max-w-screen-xl mx-auto px-4 divide-y divide-white/10">
    <div class="py-4 flex flex-wrap items-center justify-between gap-2 flex-col md:flex-row">
      <h4 class="xl:text-xl font-bold text-white">
        <a href={SITE_URL} title={SITE_URL}>
          <img src={SITE_LOGO} alt={`${SITE_NAME} logo`} title={`${SITE_NAME} logo`} class="h-10" />
        </a>
      </h4>
      <NavbarFooter categories={categories} />
      <SocialMedia />
    </div>

    <div class="flex flex-col-reverse md:flex-row justify-between items-center gap-1 py-2">
      <p class="text-sm text-white/60 py-1">JobResultDekho.com &copy; {new Date().getFullYear()} | All rights reserved</p>
      <div class="flex space-x-4 text-sm">
        {#if childCategories.length > 0}
          {#each childCategories as child}
            <a
              href={`/${child.slug}`}
              title={child.title}
              class="hover:text-white text-white/60 duration-200 transition-colors py-1"
            >
              {child.title}
            </a>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</footer>

<CookieConsent />
