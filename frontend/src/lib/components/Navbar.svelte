<script lang="ts">
  import { Link } from "svelte-navigator";
</script>

<nav class="bg-blue-600 text-white shadow-md">
  <div class="container mx-auto px-4 py-3">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <Link to="/" class="text-xl font-bold">XYResults</Link>
        
        <div class="hidden md:flex space-x-4">
          <Link to="/" class="hover:text-blue-200 transition-colors">Home</Link>
          <Link to="/categories" class="hover:text-blue-200 transition-colors">Categories</Link>
        </div>
      </div>
      
      <div>
        <button class="md:hidden p-2 rounded hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</nav>