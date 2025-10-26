<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import Icon from './ui/Icon.svelte';
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
	<ul
		class="flex flex-wrap lg:items-center justify-center gap-2 lg:gap-4 flex-1"
	>
		{#each categories as cat}
			{#if cat.title.toLowerCase() === 'home'}
				<li>
					<a
						href="/"
						class="block py-1 lg:py-4 text-sm ease-in-out duration-200 text-center {currentPath() ===
						'/'
							? 'text-white'
							: 'hover:text-white text-white/60'}">{cat.title}</a
					>
				</li>
			{:else if cat.children?.length}				 
				{#each cat.children as child}
					<!--li class="relative">
						<a
							href={`/${child.slug}`}
							class="block py-1 lg:py-4 text-sm ease-in-out duration-200 text-center {isActive(
								child.slug
							)
								? 'text-white'
								: 'hover:text-white text-white/60'}"
						>
							{child.title}
						</a>
					</li-->
				{/each}
			{:else}
				<li>
					<a
						href={`/${cat.slug}`}
						class="block py-1 lg:py-4 text-sm ease-in-out duration-200 text-center {isActive(
							cat.slug
						)
							? 'text-white'
							: 'hover:text-white text-white/60'}">{cat.title}</a
					>
				</li>
			{/if}
		{/each}
	</ul>
</nav>
