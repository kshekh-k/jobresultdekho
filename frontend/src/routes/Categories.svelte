<script lang="ts">
  import { onMount } from "svelte";
  import CategoryItem from "../components/CategoryItem.svelte";
  
  interface Category {
    id: number;
    attributes: {
      title: string;
      link: string;
      children: {
        data: Array<{
          id: number;
          attributes: {
            title: string;
            link: string;
          }
        }>
      }
    }
  }
  
  let categories: Category[] = [];
  let loading = true;
  let error = false;
  
  onMount(async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:80/api';
      const response = await fetch(`${apiUrl}/categories?populate=children`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      categories = data.data;
      loading = false;
    } catch (err) {
      console.error('Error fetching categories:', err);
      error = true;
      loading = false;
    }
  });
</script>

<div>
  <h1 class="text-3xl font-bold mb-6">Categories</h1>
  
  {#if loading}
    <div class="bg-white shadow-md rounded-lg p-6">
      <p>Loading categories...</p>
    </div>
  {:else if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>Error loading categories. Please try again later.</p>
    </div>
  {:else if categories.length === 0}
    <div class="bg-white shadow-md rounded-lg p-6">
      <p>No categories found.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each categories as category (category.id)}
        <CategoryItem {category} />
      {/each}
    </div>
  {/if}
</div>