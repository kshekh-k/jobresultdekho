<script lang="ts">
    import { onMount } from 'svelte';
    import '../app.css';
    import '@fontsource-variable/inter';
    import { setContext } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    

    export let data: { categories: any[]; highAlertPosts: any[] };
    setContext('categoryTree', data.categories);

    onMount(() => {
        // reCAPTCHA
        const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
        if (!siteKey) {
            console.warn('Missing VITE_RECAPTCHA_SITE_KEY');
        } else {
            const recaptcha = document.createElement('script');
            recaptcha.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            recaptcha.async = true;
            recaptcha.defer = true;
            document.head.appendChild(recaptcha);
        }

        // Google Translate (English → Hindi)
        (window as any).googleTranslateInit = () => {
            new (window as any).google.translate.TranslateElement(
                { pageLanguage: 'en', includedLanguages: 'hi', autoDisplay: false },
                'google_translate_element'
            );
        };
        const translate = document.createElement('script');
        translate.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateInit';
        translate.async = true;
        document.head.appendChild(translate);
    });
</script>

<div class="flex flex-col min-h-screen">
    <Header categories={data.categories} highAlertPosts={data.highAlertPosts} />
    <main class="flex-1 py-5">
        <slot />
    </main>
    <Footer categories={data.categories} />
</div>
