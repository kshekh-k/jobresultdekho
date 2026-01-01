<script>
  import { onMount } from 'svelte';
  import { cookieConsent, notificationConsent } from '$lib/utils';

  onMount(() => {
    cookieConsent.set(document.cookie.includes('cookie_consent=true'));
    notificationConsent.set(Notification.permission === 'granted');
  });

  function acceptCookies() {
    document.cookie = `cookie_consent=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    cookieConsent.set(true);
  }

  async function requestNotifications() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      notificationConsent.set(true);
    }
  }
</script>

{#if !$cookieConsent}
<div class="fixed bottom-0 inset-x-0 z-[9999] bg-blue-900 text-white shadow-lg">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-4 gap-4">
    <p>We use cookies to improve your experience.</p>
    <button on:click={acceptCookies} class="px-4 py-2 bg-blue-600 hover:bg-blue-400 transition cursor-pointer rounded-md">
      Accept Cookies
    </button>
  </div>
</div>
{/if}

{#if $cookieConsent && !$notificationConsent}
<div class="fixed bottom-0 inset-x-0 z-[9999] bg-blue-900 text-white shadow-lg">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-4 gap-4">
    <p>Enable browser notifications.</p>
    <button on:click={requestNotifications} class="px-4 py-2 bg-green-600 hover:bg-green-800 transition cursor-pointer rounded-md">
      Enable Notifications
    </button>
  </div>
</div>
{/if}
