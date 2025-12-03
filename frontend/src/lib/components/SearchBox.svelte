<script lang="ts">
  import { goto } from '$app/navigation';
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

<form on:submit={handleSearch} class="relative w-full">
  <!-- Input with right padding for icon -->
  <Input
    type="search"
    bind:value
    placeholder={placeholder}
    class={`bg-white border border-gray-300 rounded-sm focus:ring-0 w-full pr-8 ${boxSize}`}
  />

  <!-- Icon inside input -->
  <button
    type="submit"
    class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-sky-800"
  >
    <Icon name={Search} size={16} />
  </button>
</form>
