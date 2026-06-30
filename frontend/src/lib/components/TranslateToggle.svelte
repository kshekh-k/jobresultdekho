<script lang="ts">
    import { onMount } from 'svelte';

    let isHindi = false;
    let ready = false;

    onMount(() => {
        // Poll until Google Translate injects the combo select
        const interval = setInterval(() => {
            const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
            if (select) {
                ready = true;
                clearInterval(interval);
                select.addEventListener('change', () => {
                    isHindi = select.value === 'hi';
                });
            }
        }, 300);
        return () => clearInterval(interval);
    });

    function toggle() {
        const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
        if (!select) return;
        select.value = isHindi ? '' : 'hi';
        select.dispatchEvent(new Event('change'));
        isHindi = !isHindi;
    }
</script>

<!-- Hidden Google Translate anchor — must be in the DOM -->
<div id="google_translate_element" class="hidden"></div>

<button
    on:click={toggle}
    title={isHindi ? 'Switch to English' : 'हिंदी में पढ़ें'}
    class="flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold
           bg-white/10 hover:bg-white/20 text-white transition-colors
           border border-white/20 select-none"
    class:opacity-50={!ready}
    disabled={!ready}
>
    {#if isHindi}
        <span>EN</span>
    {:else}
        <span>हिं</span>
    {/if}
</button>
