<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from './ui/button/button.svelte';
  import Input from './ui/input/input.svelte';
  import Icon from './ui/Icon.svelte';
  import { Search } from 'lucide-svelte';

  export let placeholder = 'Search...';
  export let value = '';
  export let boxSize = '';

  function handleSearch() {
    const q = value.trim();
    if (q) {
      goto(`/search?q=${encodeURIComponent(q)}`);
    }
  }
</script>

<div class="relative">
  <Input
    type="search"
    bind:value
    placeholder={placeholder}
    on:keydown={(e) => e.key === 'Enter' && handleSearch()}
    class={`bg-white border-none shadow-none pr-6 rounded-sm focus:ring-0 ${boxSize}`}
  />

  <Button
    variant="ghost"
    on:click={handleSearch}
    class="border-none hover:bg-transparent hover:text-sky-800 absolute top-0 right-0 cursor-pointer"
  >
    <Icon name={Search} size={16} />
  </Button>
</div>
