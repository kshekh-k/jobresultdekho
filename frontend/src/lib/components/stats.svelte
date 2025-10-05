<script lang="ts">
    import * as Card from '$lib/components/ui/card/index.js';
	import { BriefcaseBusiness, History, School, UsersRound } from "lucide-svelte";
	import Icon from "./ui/Icon.svelte";

    const stats = [
        {
            label:'Job Posted',
            stat:'20000+',
            icon: BriefcaseBusiness
        },
        {
            label:'Real Time Update',
            stat:'100%',
            icon: History            
        },
        {
            label:'Students Enrolled',
            stat:'100k',
            icon: UsersRound            
        },
        {
            label:'Departments Covered',
            stat:'500+',
            icon: School    
        },
    ]
</script>
<div class="bg-white py-10">
    <div class="max-w-screen-xl mx-auto px-3">
        <div class="flex flex-col md:grid md:grid-cols-12 gap-6">
            <div class="col-span-6">
                <div class="space-y-5 max-w-lg"> 
                <h2 class="text-4xl text-left text-slate-900 font-bold">We are most trusted</h2>
                <p class="text-slate-500"><b>JobResultWale.com
                    </b> – also known as Job Result Wale – is not just a website, 
                    it’s a trusted platform for millions of students and job seekers across the country. 
                    Since its inception, JobResultWale has earned the confidence of countless aspirants by providing timely, 
                    accurate, and reliable updates on government exams, results, admit cards, and career opportunities. 
                    Today, it stands as a dependable source for crores of youth preparing for their 
                    future in the public sector.
                </p>
            </div>
            </div>
            <div class="col-span-6 grid grid-cols-2 gap-5">
                {#each stats as item}
                
               <Card.Root  class="overflow-hidden rounded-md bg-slate-50">
                <Card.Content class="flex flex-col md:flex-row gap-5 items-center">
                    <Icon name={item.icon} size={44} className="shrink-0 text-slate-800"/>
                    <div class="space-y-1">
                    <h4 class="text-2xl text-slate-800 text-center md:text-left font-bold leading-snug">{item.stat}</h4>
                    <p class="text-center md:text-left font-medium text-slate-600 leading-snug">{item.label}</p>
                    </div>
                    </Card.Content>
                </Card.Root>
                {/each}
            </div>
        </div>
    </div>
</div>