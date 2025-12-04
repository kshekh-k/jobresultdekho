<script>
  import { onMount } from 'svelte';

  let cookieConsent = false;
  let notificationConsent = false;

  onMount(() => {
    // Check cookie consent
    cookieConsent = document.cookie.includes('cookie_consent=true');

    // Check notification consent
    notificationConsent = Notification.permission === 'granted';
  });

  function acceptCookies() {
    document.cookie = `cookie_consent=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    cookieConsent = true;
  }

  async function requestNotifications() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      notificationConsent = true;
      // TODO: Register service worker + push subscription here for real notifications
      console.log('Notifications enabled');
    }
  }
</script>

<!-- Cookie Consent Banner -->
{#if !cookieConsent}
<div class="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-4 gap-4">
    <p class="text-sm md:text-base">
      We use cookies to improve your experience. By continuing, you agree to our Privacy Policy.
    </p>
    <button
      on:click={acceptCookies}
      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
    >
      Accept Cookies
    </button>
  </div>
</div>
{/if}

<!-- Notification Consent Banner -->
{#if cookieConsent && !notificationConsent}
<div class="fixed bottom-16 left-0 right-0 z-40 bg-gray-800 text-white shadow-lg">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-4 gap-4">
    <p class="text-sm md:text-base">
      Enable browser notifications to receive booking updates and reminders.
    </p>
    <button
      on:click={requestNotifications}
      class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium"
    >
      Enable Notifications
    </button>
  </div>
</div>
{/if}
