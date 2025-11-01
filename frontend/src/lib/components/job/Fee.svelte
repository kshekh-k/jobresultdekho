<script lang="ts">
    import { formatKeyValue } from '$lib/utils';
    export let fees: Record<string, string> | null | undefined = {};
    $: safeFees = fees && typeof fees === 'object' ? fees : {};
    $: feeEntries = Object.entries(safeFees).filter(([_, value]) => value);
</script>
<div class="col-span-12 md:col-span-6 flex flex-col space-y-3">
    <h3 class="text-xl font-semibold">Application Fee</h3>
    <div class="max-w-full overflow-auto">
        <table class="w-full border border-gray-300">
            <tbody>
                {#if feeEntries.length > 0}
                    {#each feeEntries as [key, value]}
                        <tr class="border-b">
                            <td class="p-2 font-medium">{formatKeyValue(key)}:</td>
                            <td class="p-2">{value}</td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>
</div>