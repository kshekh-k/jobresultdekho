<!-- File: src/routes/privacy/+page.svelte -->
<script lang="ts">
	import InnerHero from '$lib/components/InnerHero.svelte';
  import { onMount } from 'svelte';

  // If you use shadcn-svelte components, import them here. If not available,
  // the markup below uses plain HTML + Tailwind and works without shadcn.
  // Example (uncomment if you have shadcn-svelte installed):
  // import { Card, CardContent, CardHeader } from 'shadcn-svelte';

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
  <title>Privacy Policy — JobResultDekho</title>
  <meta name="description" content="Privacy Policy for JobResultDekho.com — jobs, results, admit cards and study material for Indian students." />
</svelte:head>

 <InnerHero heading="Privacy Policy" bgColor="bg-sky-800" textColor="text-white" className="px-4 md:px-4 mb-5"></InnerHero>
  <div class="max-w-6xl px-4 mx-auto">
    <header class="mb-5 bg-white p-5 rounded-xl shadow-md">   
      <h2 class="text-sm text-slate-600">Effective Date: <strong>02 October 2025</strong></h2>
      <p class="text-sm text-slate-600 mt-1">Contact: <a href="mailto:help@jobresultdekho.com" class="text-sky-800 hover:underline">help@jobresultdekho.com</a></p>
    </header>

    <article class="flex flex-col gap-5">
      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">1. Introduction</h2>
        <p class="text-slate-700 leading-relaxed">At <strong>JobResultDekho.com</strong>, we value and respect your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit or use our website. By accessing JobResultDekho.com you agree to the practices described in this policy.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">2. Information We Collect</h2>
        <ul class="list-disc list-inside space-y-2 text-slate-700">
          <li><strong>Personal Information (Voluntary):</strong> Name, email address, phone number (if you provide them while subscribing or contacting us).</li>
          <li><strong>Non-Personal Information:</strong> Browser type, device information, IP address, pages visited and time spent (collected automatically via cookies and analytics tools).</li>
        </ul>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">3. How We Use Your Information</h2>
        <p class="text-slate-700 leading-relaxed">We use information to:</p>
        <ul class="list-disc list-inside space-y-2 text-slate-700">
          <li>Provide updates about jobs, results, admit cards, and study material.</li>
          <li>Send notifications if you subscribe to our mailing list.</li>
          <li>Improve performance, user experience and content quality.</li>
          <li>Show personalized advertisements as per Google AdSense policies.</li>
          <li>Prevent fraud, abuse or unauthorized access.</li>
        </ul>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">4. Cookies &amp; Advertising</h2>
        <p class="text-slate-700 leading-relaxed">JobResultDekho.com uses cookies and similar technologies to enhance user experience, store preferences and analyze traffic.</p>
        <p class="text-slate-700 leading-relaxed mt-2">Google AdSense and other third-party vendors may use cookies to serve ads based on your visits to our site and elsewhere. To opt out of personalized ads, visit Google Ads Settings.</p>
        <div class="mt-3 text-sm text-slate-600"><!-- AdSense placeholder: insert your AdSense script in your layout or +layout.svelte, and ensure you follow Google's policies -->
          <!-- Example (do NOT include publisher ID here in public code):
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" crossorigin="anonymous"></script>
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXX" data-ad-slot="YYYYYYYYYY" data-ad-format="auto"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          -->
        </div>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">5. Third-Party Links</h2>
        <p class="text-slate-700 leading-relaxed">Our site may contain links to external websites (job portals, exam boards, study resources). We are not responsible for the privacy practices or content of those third-party sites.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">6. Data Sharing</h2>
        <p class="text-slate-700 leading-relaxed">We do not sell, rent or trade your personal information. We may share limited non-personal data with:</p>
        <ul class="list-disc list-inside space-y-2 text-slate-700">
          <li>Advertising partners (e.g., Google AdSense).</li>
          <li>Analytics providers (e.g., Google Analytics).</li>
          <li>Legal authorities when required by law or court order.</li>
        </ul>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">7. Data Security</h2>
        <p class="text-slate-700 leading-relaxed">We follow industry-standard practices to safeguard your personal information. However, no transmission over the internet is completely secure and we cannot guarantee absolute security.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">8. Children’s Privacy</h2>
        <p class="text-slate-700 leading-relaxed">The site is designed for students and job aspirants aged 13 and above. We do not knowingly collect personal information from children under 13. If you believe we may have collected such data, contact us at <a href="mailto:help@jobresultdekho.com" class="text-sky-800 hover:underline">help@jobresultdekho.com</a> and we will remove it.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">9. Your Rights</h2>
        <p class="text-slate-700 leading-relaxed">You can request to access, correct or delete your personal information, and opt out of promotional emails. Contact us at <a href="mailto:help@jobresultdekho.com" class="text-sky-800 hover:underline">help@jobresultdekho.com</a>.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">10. Changes to This Policy</h2>
        <p class="text-slate-700 leading-relaxed">We may update this Privacy Policy to comply with legal requirements or Google AdSense policies. Updates will be posted on this page with a revised effective date.</p>
      </section>

      <section class="bg-white p-5 rounded-xl shadow-md">
        <h2 class="text-xl font-medium mb-3">11. Contact</h2>
        <p class="text-slate-700 leading-relaxed">If you have questions or concerns, reach us at <a href="mailto:help@jobresultdekho.com" class="text-sky-800 hover:underline">help@jobresultdekho.com</a>.</p>
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
 
 
