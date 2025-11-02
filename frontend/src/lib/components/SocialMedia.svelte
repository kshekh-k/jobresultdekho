<script lang="ts">
import 'remixicon/fonts/remixicon.css';
  export let links = [
    { name: "Facebook", url: "https://facebook.com", icon: 'ri-facebook-fill', brandColor:'hover:bg-[#1877F2]'},
    { name: "Instagram", url: "https://www.instagram.com/job_resultdekho/", icon: 'ri-instagram-line', brandColor:'hover:bg-instagram'},
    { name: "X.com", url: "https://x.com/jobresultdekho", icon: 'ri-twitter-x-fill', brandColor:'hover:bg-[#000000]'},
    { name: "LinkedIn", url: "https://www.linkedin.com/in/job-result-dekho-90b204397", icon: 'ri-linkedin-fill', brandColor:'hover:bg-[#0A66C2]'},
    { name: "WhatsApp", url: "https://whatsapp.com/channel/0029VbBRYR7BA1f2coUANV3b", icon: 'ri-whatsapp-line', brandColor:'hover:bg-[#25D366]'},
    { name: "Telegram", url: "https://t.me/sarkari_jobresultdekho", icon: 'ri-telegram-2-fill', brandColor:'hover:bg-[#0088CC]'}
  ];
	export let className: string | undefined = 'bg-white/10 text-white ';
</script>
 
<div class="flex items-center gap-1">
  {#each links as { name, url, icon, brandColor }}
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name} title={name}
      class="size-8 rounded-full ease-in-out duration-200 flex justify-center items-center {brandColor} {className}"
    >
    <i class="text-base {icon}"></i>       
         
    </a>
  {/each}
</div>
