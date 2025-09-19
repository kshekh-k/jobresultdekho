<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  export let data: { categories: any[] };
</script>

<Navbar categories={data.categories} />

<main class="min-h-screen">
  <slot />
</main>

<Footer />
