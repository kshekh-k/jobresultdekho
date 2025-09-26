<script lang="ts">
	import { ChevronDown } from "lucide-svelte";
	import Icon from "./ui/Icon.svelte";
 import { page } from '$app/stores';
   import { get } from 'svelte/store';
	export let categories: {
		title: string;
		slug: string;
		children?: { title: string; slug: string }[];
	}[] = [];

	let openMenu: string | null = null;

	const toggleMenu = (key: string) => {
		openMenu = openMenu === key ? null : key;
	};

	const closeMenu = () => {
		openMenu = null;
	};
// get current pathname
   const currentPath = () => get(page).url.pathname;
   // Check if category or child is active
  const isActive = (slug: string) => currentPath() === `/${slug}`;
  const isChildActive = (children: { slug: string }[]) =>
    children.some((child) => isActive(child.slug));
</script>

<nav class="flex-1 flex justify-center">
	<ul class="flex justify-center gap-10 flex-1">
		{#each categories as cat}
			{#if cat.title.toLowerCase() === 'home'}
				<li><a href="/" class="block py-4 text-lg ease-in-out duration-200 font-medium {currentPath() === '/' ? 'text-sky-600' : 'hover:text-sky-600 text-slate-500'}">{cat.title}</a></li>
			{:else if cat.children?.length}
				<li class="relative">
					<button
						on:click={() => toggleMenu(cat.title)}
						class="flex items-center py-4 focus:outline-none text-lg ease-in-out duration-200 font-medium {isChildActive(cat.children) ? 'text-sky-600' : 'hover:text-sky-600 text-slate-500'}"
					>
						{cat.title}
						 <Icon name={ChevronDown} size={16} />
					</button>

					{#if openMenu === cat.title}
						<ul class="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"	on:mouseleave={closeMenu}>
							{#each cat.children as child}
								<li>
									<a href={`/${child.slug}`} class="flex items-center py-3 px-5 focus:outline-none text-lg ease-in-out duration-200 font-medium {isActive(child.slug) ? 'text-sky-600' : 'hover:text-sky-600 text-slate-500 hover:bg-slate-50'}">
										{child.title}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{:else}
				<li><a href={`/${cat.slug}`} class="block py-4 text-lg ease-in-out duration-200 font-medium {isActive(cat.slug) ? 'text-sky-600' : 'hover:text-sky-600 text-slate-500'}" >{cat.title}</a></li>
			{/if}
		{/each}
	</ul>
</nav>
