<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from './ui/button/button.svelte';
  import Input from './ui/input/input.svelte';
  import Icon from './ui/Icon.svelte';
  import { Search } from 'lucide-svelte';

  export let placeholder = 'Search...';
  export let value = '';
  export let boxSize = '';

  function handleSearch(e?: Event) {
    e?.preventDefault();
    const q = value.trim();
    if (q) {
      goto(`/search?q=${encodeURIComponent(q)}`);
    }
  }
</script>

<form on:submit={handleSearch} class="relative flex items-center">
  <Input
    type="search"
    bind:value
    placeholder={placeholder}
    class={`bg-white border border-gray-300 rounded-sm focus:ring-0 flex-1 ${boxSize}`}
  />

  <Button
    type="submit"
    variant="ghost"
    class="ml-2 text-sky-800 hover:text-sky-900"
  >
    <Icon name={Search} size={16} />
  </Button>
</form>
