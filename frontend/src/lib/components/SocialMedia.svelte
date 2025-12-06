<script lang="ts">
  import {
	RiFacebookFill,
		RiInstagramLine,
		RiLinkedinFill,
		RiTelegram2Fill,
		RiTwitterXLine,
		RiWhatsappLine
	} from 'svelte-remixicon'; 
	import Icon from './ui/Icon.svelte';
  export let links = [
    { name: "Facebook", url: "https://www.facebook.com/share/1Cd6pG828i/", icon: RiFacebookFill, brandColor:'hover:bg-[#1877F2]'},
    { name: "Instagram", url: "https://www.instagram.com/job_resultdekho/", icon: RiInstagramLine, brandColor:'hover:bg-(image:--instagram-linear)'},
    { name: "X.com", url: "https://x.com/jobresultdekho", icon: RiTwitterXLine, brandColor:'hover:bg-[#000000]'},
    { name: "LinkedIn", url: "https://www.linkedin.com/in/job-result-dekho-90b204397", icon: RiLinkedinFill, brandColor:'hover:bg-[#0A66C2]'},
    { name: "WhatsApp", url: "https://whatsapp.com/channel/0029VbBRYR7BA1f2coUANV3b", icon: RiWhatsappLine, brandColor:'hover:bg-[#25D366]'},
    { name: "Telegram", url: "https://t.me/sarkari_jobresultdekho", icon: RiTelegram2Fill, brandColor:'hover:bg-[#0088CC]'}
  ];
	export let className: string | undefined = 'bg-white/10 text-white ';
</script>
 
<div class="flex items-center gap-1">
  {#each links as { name, url, icon, brandColor }}
    <a
      href={url}
      rel="nofollow noopener noreferrer external"
      target="_blank"      
      aria-label={name} title={name}
      class="size-8 rounded-full ease-in-out duration-200 flex justify-center items-center {brandColor} {className}"
    >
    <Icon name={icon} size={16} />      
    </a>
  {/each}
</div>
