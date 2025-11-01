<script lang="ts">
    import { formatDate, formatKeyValue } from '$lib/utils';

    export let dates: Record<string, string> | null | undefined = {};
    $: safeDates = dates && typeof dates === 'object' ? dates : {};
    $: dateEntries = Object.entries(safeDates).filter(([_, value]) => value); 

</script>
<div class="col-span-12 md:col-span-6 flex flex-col space-y-3">
    <h3 class="text-xl font-semibold">Important Dates</h3>
    <div class="max-w-full overflow-auto">
        <table class="w-full border border-gray-300">
            <tbody>
                {#if dateEntries.length > 0}
                    {#each dateEntries as [key, value]}
                        <tr class="border-b">
                            <td class="p-2 font-medium">{formatKeyValue(key)}:</td>
                            <td class="p-2">{formatDate(value)}</td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>
</div>