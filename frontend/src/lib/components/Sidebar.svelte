<script lang="ts">
	export let filteredParents;

    import * as Card from '$lib/components/ui/card/index.js';
	import Widget from './Widget.svelte';

	let userMenus = [
    { title: "Image Resizer", slug: "#", icon: Image },
    { title: "JPG to PDF Converter", slug: "#", icon: FileText },
    { title: "Age Calculator", slug: "age-calculator", icon: Calculator },
    { title: "Photo Signature Joiner", slug: "#", icon: Signature },
    { title: "Name & Date on Photo Maker", slug: "/photo-editor", icon: CalendarRange },
    { title: "MPPEB Template", slug: "#", icon: NotepadTextDashed },
    { title: "Typing Test", slug: "#", icon: TypeOutline },
  ];  
  
</script>

<aside class="lg:col-span-4 space-y-4">
    <Widget title="Helping Tools" menus={userMenus} headerColor="bg-slate-900" />
    <Card.Root class="bg-slate-300" variant={'default'}>
        <Card.Content class="flex items-center justify-center text-center h-60 ">Ad Place here</Card.Content>
    </Card.Root>
    <Widget title="All Categories" menus={filteredParents} headerColor="bg-slate-900" />
</aside>