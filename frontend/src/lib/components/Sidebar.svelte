<script lang="ts">
    import { getContext } from 'svelte';
	export let className: string = "lg:col-span-4 xl:col-span-3 space-y-4";    
	import { Image, FileText, Calculator, Signature } from 'lucide-svelte';
	import { CalendarRange, NotepadTextDashed, TypeOutline } from 'lucide-svelte';
    import * as Card from '$lib/components/ui/card/index.js';
	import Widget from './Widget.svelte';

	let userMenus = [
        { title: "Name & DOB on photo", slug: "/photo-editor", icon: CalendarRange },
        { title: "Image to PDF Converter", slug: "/image-to-pdf", icon: FileText },
        { title: "Age Calculator", slug: "/age-calculator", icon: Calculator },
        // { title: "Photo Signature", slug: "#", icon: Signature }, 
        { title: "MPPEB Template", slug: "#", icon: NotepadTextDashed },
        { title: "Typing Test", slug: "#", icon: TypeOutline },
    ];    
    
    // Parent & children category
    const categoryTree = getContext('categoryTree') || [];
	const parents: { title: any; slug: any; }[] = [];
	const children = [];
    if (categoryTree.length > 0) {
        for (const cat of categoryTree) {
            if (!cat.parent) parents.push({ title: cat.title, slug: cat.slug });
            if (cat.children?.length) {
                for (const child of cat.children) {
                    children.push({ title: child.title, slug: child.slug });
                }
            }
        }
    }	

    // Slugs to exclude
  	const excludedSlugs = ["more"];

	// Filter out unwanted slugs
	$: filteredParents = parents.filter(
		(p) => !excludedSlugs.includes(p.slug)
	);
  
</script>

<aside class="{className}">
    <Widget title="Helping Tools" menus={userMenus} headerColor="bg-slate-900" />
    <Card.Root class="bg-slate-300" variant={'default'}>
        <Card.Content class="flex items-center justify-center text-center h-60 ">Ad Place here</Card.Content>
    </Card.Root>
    <Widget title="All Categories" menus={filteredParents} headerColor="bg-slate-900" />
</aside>