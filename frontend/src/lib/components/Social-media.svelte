<script lang="ts">
import 'remixicon/fonts/remixicon.css';
  export let links = [
    { name: "Facebook", url: "https://facebook.com", icon: 'ri-facebook-fill' },
    { name: "Instagram", url: "https://instagram.com", icon: 'ri-instagram-line' },
    { name: "X.com", url: "https://x.com", icon: 'ri-twitter-x-fill' },
    { name: "LinkedIn", url: "https://linkedin.com", icon: 'ri-linkedin-fill' },
    { name: "WhatsApp", url: "https://wa.me/1234567890", icon: 'ri-whatsapp-line' },
    { name: "Telegram", url: "https://t.me/username", icon: 'ri-telegram-2-fill' }
  ];
</script>
 
<div class="flex items-center gap-1">
  {#each links as { name, url, icon }}
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name} title={name}
      class="size-8 rounded-full bg-white/10 text-white hover:bg-blue-600 ease-in-out duration-200 flex justify-center items-center"
    >
    <i class="text-base {icon}"></i>       
         
    </a>
  {/each}
</div>
