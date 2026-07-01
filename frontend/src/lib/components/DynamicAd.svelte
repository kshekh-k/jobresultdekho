<script lang="ts">
  import { onMount } from 'svelte';
  import { getMediaUrl } from '$lib/utils';
  import { getAdBySlug, trackImpression, trackClick, type Advertisement } from '$lib/api/advertisement';

  export let adSlug: string;

  let ad: Advertisement | null = null;
  let ready = false;
  // Resolved in script so no TypeScript `as` assertion leaks into the template
  const globalAdClient: string = import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '';

  onMount(async () => {
    ad = await getAdBySlug(adSlug);
    if (!ad || !ad.isActive) { ad = null; return; }
    ready = true;
    trackImpression(adSlug);
    if (ad.adType === 'google_adsense') initAdsense(ad);
  });

  function initAdsense(adData: Advertisement) {
    const clientId = adData.googleAdClient || globalAdClient;
    if (!clientId) return;
    if (!document.querySelector('script[src*="pagead2.googlesyndication"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      document.head.appendChild(script);
    }
    setTimeout(() => {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (_) { /* adsbygoogle not ready yet */ }
    }, 200);
  }

  function handleClick() {
    trackClick(adSlug);
  }
</script>

{#if ready && ad}
  {#if ad.adType === 'native'}
    <a
      href={ad.adLink || '#'}
      target={ad.openInNewTab !== false ? '_blank' : '_self'}
      rel="nofollow noopener noreferrer external"
      title={ad.title}
      on:click={handleClick}
      class="block overflow-hidden rounded-xl transition-opacity hover:opacity-90 w-full"
    >
      {#if ad.imageMode === 'single' && ad.singleImage?.url}
        <img
          src={getMediaUrl(ad.singleImage.url)}
          alt={ad.singleImage.alternativeText || ad.title}
          title={ad.title}
          loading="lazy"
          class="object-cover w-full"
        />
      {:else if ad.imageMode === 'responsive'}
        {#if ad.desktopImage?.url}
          <img
            src={getMediaUrl(ad.desktopImage.url)}
            alt={ad.desktopImage.alternativeText || ad.title}
            title={ad.title}
            loading="lazy"
            class="object-cover w-full sm:block hidden"
          />
        {/if}
        {#if ad.mobileImage?.url}
          <img
            src={getMediaUrl(ad.mobileImage.url)}
            alt={ad.mobileImage.alternativeText || ad.title}
            title={ad.title}
            loading="lazy"
            class="object-cover w-full block sm:hidden"
          />
        {/if}
      {/if}
    </a>

  {:else if ad.adType === 'video' && ad.videoFile?.url}
    <video
      controls
      class="w-full h-auto rounded-xl"
      poster={ad.videoPoster ? getMediaUrl(ad.videoPoster.url) : undefined}
      loop={ad.videoLoop || false}
      muted={ad.videoMuted || false}
    >
      <source src={getMediaUrl(ad.videoFile.url)} type={ad.videoFile.mime || 'video/mp4'} />
      Your browser does not support HTML5 video.
    </video>

  {:else if ad.adType === 'google_adsense' && ad.googleAdSlot}
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client={ad.googleAdClient || globalAdClient}
      data-ad-slot={ad.googleAdSlot}
      data-ad-format={ad.googleAdFormat || 'auto'}
      data-full-width-responsive="true"
    ></ins>
  {/if}
{/if}
