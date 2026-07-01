<script lang="ts">
    import { onMount } from 'svelte';

    let isHindi = false;
    let ready = false;

    // ALL-CAPS abbreviations (SSC, RRB, UPSC, NDA) and dotted forms (R.P.S.C., U.P.S.C.)
    const ABBREV_RE = /\b[A-Z]{2,7}\b|[A-Z](?:\.[A-Z]){1,}\.?/g;

    onMount(() => {
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

    // Wrap abbreviations in <span translate="no"> before Google Translate runs,
    // so short forms like SSC, RRB, R.P.S.C. are preserved in Hinglish mode.
    function protectAbbreviations() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const nodes: Text[] = [];
        let node: Node | null;

        while ((node = walker.nextNode())) {
            const parent = (node as Text).parentElement;
            if (!parent) continue;
            // Skip script/style tags
            if (['SCRIPT', 'STYLE'].includes(parent.tagName)) continue;
            // Skip anything already inside a no-translate zone (header, footer, sidebar, already-wrapped)
            if (parent.closest('[translate="no"], .notranslate, #google_translate_element')) continue;
            // Quick check before running full regex
            const text = node.textContent ?? '';
            if (text.length < 2 || !/[A-Z]{2}/.test(text)) continue;
            ABBREV_RE.lastIndex = 0;
            if (!ABBREV_RE.test(text)) continue;
            nodes.push(node as Text);
        }

        for (const textNode of nodes) {
            const text = textNode.textContent ?? '';
            const frag = document.createDocumentFragment();
            let last = 0;
            let wrapped = false;
            ABBREV_RE.lastIndex = 0;
            let match: RegExpExecArray | null;

            while ((match = ABBREV_RE.exec(text))) {
                if (match.index > last) {
                    frag.appendChild(document.createTextNode(text.slice(last, match.index)));
                }
                const span = document.createElement('span');
                span.setAttribute('translate', 'no');
                span.className = 'notranslate gt-abbrev';
                span.textContent = match[0];
                frag.appendChild(span);
                last = match.index + match[0].length;
                wrapped = true;
            }

            if (!wrapped) continue;
            if (last < text.length) {
                frag.appendChild(document.createTextNode(text.slice(last)));
            }
            textNode.parentNode?.replaceChild(frag, textNode);
        }
    }

    function toggle() {
        const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
        if (!select) return;
        if (!isHindi) protectAbbreviations();
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
    class="flex items-center gap-1 text-sm font-semibold
            text-white transition-colors p-2 px-3 border border-white/20 rounded cursor-pointer  
            select-none"
     
    disabled={!ready}
>
    {#if isHindi}
        <span>EN</span>
    {:else}
        <span><span class="hidden md:inline-block">हिंदी</span><span class="md:hidden">हिं</span></span>
    {/if}
</button>
