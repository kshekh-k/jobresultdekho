<script lang="ts">
	import Button from './ui/button/button.svelte';
	import Input from './ui/input/input.svelte'
	import Icon from './ui/Icon.svelte';
	import { Search } from 'lucide-svelte';

	// Props
	export let placeholder: string = 'Search...';
	export let value: string = '';
	export let boxSize: string = '';
	export let onSearch: (query: string) => void = () => {};

	// Handle search event
	function handleSearch() {
		onSearch(value.trim());
	}
</script>

<div class="relative">
	<Input
		type="search"
		bind:value
		placeholder={placeholder}
		on:keydown={(e) => e.key === 'Enter' && handleSearch()}
		class={`bg-white border-none shadow-none pr-6 rounded-sm focus:ring-0 
			${boxSize}`}
	/>

	<Button
		variant="ghost"
		on:click={handleSearch}
		class="border-none hover:bg-transparent hover:text-sky-800 absolute top-0 right-0 cursor-pointer"
	>
		<Icon name={Search} size={16} />
	</Button>
</div>
