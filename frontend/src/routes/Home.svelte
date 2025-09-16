<script lang="ts">
  import { Link } from "svelte-navigator";
</script>

<div>
  <h1 class="text-3xl font-bold mb-6">Welcome to XYResults</h1>
  
  <div class="bg-white shadow-md rounded-lg p-6 mb-8">
    <p class="mb-4">This is the home page of the XYResults application.</p>
    <p class="mb-4">Explore our categories to find what you're looking for.</p>
    
    <Link to="/categories" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
      View Categories
    </Link>
  </div>
</div>