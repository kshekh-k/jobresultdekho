<script lang="ts">
    import { onMount } from 'svelte';
    import '../app.css';
    import '@fontsource-variable/inter';
    import { setContext } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import CookieConsent from '$lib/components/CookieConsent.svelte';

    export let data: { categories: any[]; highAlertPosts: any[] };
    setContext('categoryTree', data.categories);

    onMount(() => {
        const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
        if (!siteKey) {
            console.warn('Missing VITE_RECAPTCHA_SITE_KEY');
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    });
</script>

<div class="flex flex-col min-h-screen">
    <Header categories={data.categories} highAlertPosts={data.highAlertPosts} />
    <main class="flex-1 py-5">
        <slot />
    </main>
    <CookieConsent />
    <Footer categories={data.categories} />
</div>
