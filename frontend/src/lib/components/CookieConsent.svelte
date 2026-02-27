<script lang="ts">
	import { onMount } from 'svelte';
	import { cookieConsent, notificationConsent } from '$lib/utils';

	const COOKIE_CONSENT_KEY = 'jrdk_cookie_consent';
	const NOTIFICATION_DISMISSED_KEY = 'jrdk_notification_prompt_dismissed';

	function acceptCookies() {
		document.cookie = `cookie_consent=true; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
		localStorage.setItem(COOKIE_CONSENT_KEY, '1');
		cookieConsent.set(true);
	}

	async function acceptCookiesAndRequestNotifications() {
		acceptCookies();
		await requestNotifications();
	}

	function dismissNotificationPrompt() {
		localStorage.setItem(NOTIFICATION_DISMISSED_KEY, '1');
		notificationConsent.set(true);
	}

	async function requestNotifications() {
		// Browser notifications require secure context (HTTPS) and API support.
		if (!window.isSecureContext || !('Notification' in window)) {
			dismissNotificationPrompt();
			return;
		}

		try {
			const permission = await Notification.requestPermission();
			if (permission === 'granted') {
				localStorage.setItem('jrdk_notifications_enabled', '1');
				notificationConsent.set(true);
				return;
			}

			// If denied/default, do not keep forcing prompts.
			dismissNotificationPrompt();
		} catch (error) {
			// Some browsers throw runtime errors for unsupported notification flows.
			dismissNotificationPrompt();
		}
	}

	onMount(() => {
		const localConsent = localStorage.getItem(COOKIE_CONSENT_KEY) === '1';
		const cookieAccepted = document.cookie.includes('cookie_consent=true');
		const consentAccepted = localConsent || cookieAccepted;

		cookieConsent.set(consentAccepted);

		if (consentAccepted) {
			// Single-button flow; do not keep reserved banner space for notification state.
			notificationConsent.set(true);
			return;
		}

		if (!window.isSecureContext || !('Notification' in window)) {
			notificationConsent.set(true);
			return;
		}

		const promptDismissed = localStorage.getItem(NOTIFICATION_DISMISSED_KEY) === '1';
		const permission = Notification.permission;
		const notificationsResolved =
			promptDismissed || permission === 'granted' || permission === 'denied';
		notificationConsent.set(notificationsResolved);
	});
</script>

{#if !$cookieConsent}
	<div class="fixed bottom-0 inset-x-0 z-[9999] bg-blue-900 text-white shadow-lg">
		<div
			class="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between p-4 gap-3"
		>
			<p class="text-sm md:text-base">
				We use cookies to understand user activity and improve job/result recommendations. Read our
				<a href="/privacy-policies" class="underline">Privacy Policy</a>.
			</p>
			<div class="flex gap-2">
				<button
					on:click={acceptCookiesAndRequestNotifications}
					class="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition cursor-pointer rounded-md"
				>
					Accept &amp; enable notifications
				</button>
			</div>
		</div>
	</div>
{/if}
