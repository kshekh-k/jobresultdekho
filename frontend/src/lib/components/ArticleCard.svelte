<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js"; 
  import { ChevronDown} from "lucide-svelte";
  import { cn } from "$lib/utils.js";
	import Icon from "./ui/Icon.svelte";
	import Button from "./ui/button/button.svelte";

  export let title: string;
  export let items: { label: string; href: string, buttonLabel:string }[] = [];
  export let viewText: string = "View All";
  export let cat: string = "/latest-job"

  let open = true;

  const toggle = () => {
    open = !open;
  };
</script>

<Card.Root class="overflow-hidden p-0 rounded-md gap-3">
  <!-- Header -->
  <Card.Header class="flex items-center justify-between cursor-pointer bg-sky-500 py-2 px-4 gap-3" >
    <h3 class="text-lg font-semibold text-white">{title}</h3>
    <button on:click={toggle}
      type="button"
      class="p-1 rounded-sm hover:bg-white/20 focus:outline-none text-white"
    >
    <Icon name={ChevronDown} className="{open ? 'rotate-180' : 'rotate-0'}" size={20} />
     
    </button>
  </Card.Header>

  <!-- Collapsible Content -->
  {#if open}
    <Card.Content class="p-0 divide-y">
      {#each items as item}
     <div class="flex justify-between items-center gap-2 flex-wrap px-4">
        <a href={item.href}
          class="block hover:text-sky-600 text-slate-600 font-medium transition-colors flex-1 hover:underline py-2" >
          {item.label}
        </a>
        <a href={item.href} class="text-sky-600 font-semibold py-1 px-2 rounded-sm ease-in-out duration-200 hover:bg-sky-100 shrink-0">{item.buttonLabel}</a>
    </div>
      {/each}
    </Card.Content>
    <!-- Footer -->
    <Card.Footer class="flex !p-3 border-t justify-center">
      <Button href={cat} variant="success">{viewText}</Button>
    </Card.Footer>
  {/if}
</Card.Root>
