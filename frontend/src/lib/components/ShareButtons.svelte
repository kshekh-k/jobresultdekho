<script lang="ts">
	import Icon from './ui/Icon.svelte';
	import {
	RiFacebookFill, 
		RiFileCopyFill,
		RiFileCopyLine, 
		RiTelegram2Fill,
		RiTwitterXLine,
		RiWhatsappLine
	} from 'svelte-remixicon';
	export let url: string = typeof window !== 'undefined' ? window.location.href : '';
	export let title: string = typeof document !== 'undefined' ? document.title : '';

	const encodedUrl: string = encodeURIComponent(url);
	const encodedTitle: string = encodeURIComponent(title);
	let copied = false;
	async function nativeShare() {
		if (navigator.share) {
			try {
				await navigator.share({ title, text: title, url });
			} catch (err) {
				console.error('Share failed:', err);
			}
		} else {
			alert('Sharing is not supported on this device.');
		}
	}

	async function copyUrl() {
		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

    const share = [
        {
            plateform:'WhatsApp',
            url:`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            symbol: RiWhatsappLine,
            color:'bg-green-500'
        },
        {
            plateform:'Telegram',
            url:`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
            symbol: RiTelegram2Fill,
            color:'bg-blue-500'
        },
        {
            plateform:'Facebook',
            url:`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            symbol: RiFacebookFill,
            color:'bg-blue-700'
        },
        {
            plateform:'X.com',
            url:`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            symbol: RiTwitterXLine,
            color:'bg-neutral-900'
        },
    ]



</script>

<div class="space-y-2">
	<h3 class="text-sky-800 text-center font-semibold">Share with your friends</h3>
	<div class="flex flex-wrap gap-2 items-center justify-center w-full">		 
        {#each share as item}
           <a href={item.url}
			target="_blank"
			title={item.plateform}
			class="p-2 rounded-sm text-white transition hover:opacity-85 {item.color}"
		    >
			<Icon name={item.symbol} size={24} />
		</a> 
        {/each}
		<!-- Copy URL -->
		<button on:click={copyUrl} title="Copy Link" class="p-2 rounded-sm bg-indigo-500 text-white cursor-pointer transition hover:opacity-85">
			<Icon name={copied ? RiFileCopyFill : RiFileCopyLine } size={24} />
		</button>
	</div>
</div>
