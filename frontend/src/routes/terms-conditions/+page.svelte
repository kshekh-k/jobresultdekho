<!-- File: src/routes/terms/+page.svelte -->
<script lang="ts">
	import InnerHero from '$lib/components/InnerHero.svelte';
  import { onMount } from 'svelte';

  let showCookieBanner = false;

  function acceptCookies() {
    localStorage.setItem('jrdk_cookies_accepted', '1');
    showCookieBanner = false;
  }

  function declineCookies() {
    localStorage.setItem('jrdk_cookies_accepted', '0');
    showCookieBanner = false;
  }

  onMount(() => {
    const val = localStorage.getItem('jrdk_cookies_accepted');
    showCookieBanner = val === null;
  });
</script>

<svelte:head>
  <title>Terms & Conditions — JobResultDekho</title>
  <meta name="description" content="Terms and Conditions for JobResultDekho.com — jobs, results, admit cards and study material for Indian students." />
</svelte:head>
<InnerHero heading="Terms &amp; Conditions" bgColor="bg-sky-800" textColor="text-white" className="px-4 md:px-4 mb-5"></InnerHero>
 
  <div class="max-w-6xl px-4 mx-auto">
     <header class="mb-5 bg-white p-5 rounded-xl shadow-md">    
      <h2 class="text-sm text-slate-600">Effective Date: <strong>02 October 2025</strong></h2>
      <p class="text-sm text-slate-600 mt-1">Contact: <a href="mailto:help@jobresultdekho.com" class="text-sky-800 hover:underline">help@jobresultdekho.com</a></p>
    </header>

   <article class="flex flex-col gap-5">
      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">1. Acceptance of Terms</h2>
        <p class="text-slate-700 leading-relaxed">By accessing and using <strong>JobResultDekho.com</strong>, you agree to abide by these Terms and Conditions. If you do not agree, please discontinue using the website.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">2. Services</h2>
        <p class="text-slate-700 leading-relaxed">JobResultDekho.com provides job updates, exam results, admit cards, and study materials for Indian students. While we strive to provide accurate information, we do not guarantee its accuracy, completeness, or timeliness.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">3. Use of Content</h2>
        <ul class="list-disc list-inside space-y-2 text-slate-700">
          <li>Content is for informational purposes only.</li>
          <li>You may not copy, distribute, or reproduce content without prior permission.</li>
          <li>Unauthorized use may result in legal action.</li>
        </ul>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">4. Third-Party Links</h2>
        <p class="text-slate-700 leading-relaxed">Our website may contain links to external websites. We are not responsible for their content or practices, and visiting them is at your own risk.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">5. Advertisements</h2>
        <p class="text-slate-700 leading-relaxed">We use Google AdSense and other ad networks. Ads shown are the responsibility of the advertiser. We are not liable for issues arising from third-party advertisements.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">6. Limitation of Liability</h2>
        <p class="text-slate-700 leading-relaxed">JobResultDekho.com shall not be held liable for any damages resulting from the use or inability to use our services, including errors or inaccuracies in information.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">7. User Responsibilities</h2>
        <p class="text-slate-700 leading-relaxed">Users must use this website responsibly and not engage in harmful activities such as hacking, spamming, or spreading false information.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">8. Privacy</h2>
        <p class="text-slate-700 leading-relaxed">Your use of the website is also governed by our <a href="/privacy" class="text-sky-800 hover:underline">Privacy Policy</a>.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">9. Changes to Terms</h2>
        <p class="text-slate-700 leading-relaxed">We may update these Terms &amp; Conditions at any time. Changes will be posted on this page with the updated effective date.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">10. Governing Law</h2>
        <p class="text-slate-700 leading-relaxed">These Terms &amp; Conditions are governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts in India.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">11. Contact</h2>
        <p class="text-slate-700 leading-relaxed">If you have questions or concerns regarding these Terms, contact us at <a href="mailto:help@jobresultdekho.com" class="text-sky-800 hover:underline">help@jobresultdekho.com</a>.</p>
      </section>
    </article>
   
  </div>

  {#if showCookieBanner}
    <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-white border shadow-lg rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center z-50">
      <div class="flex-1 text-sm text-slate-700">We use cookies to personalise content, analyze traffic and deliver ads. By clicking &quot;Accept&quot; you consent to our use of cookies in accordance with this policy.</div>
      <div class="flex gap-2">
        <button class="px-4 py-2 rounded-lg bg-transparent border border-slate-300 text-sm" on:click={declineCookies}>Decline</button>
        <button class="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm" on:click={acceptCookies}>Accept</button>
      </div>
    </div>
  {/if}
 
 
