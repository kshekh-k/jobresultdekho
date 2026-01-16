<script lang="ts">
	import { formatKeyValue } from '$lib/utils';
	export let fees: Record<string, string> | null | undefined = {};
	$: safeFees = fees && typeof fees === 'object' ? fees : {};
	$: feeEntries = Object.entries(safeFees).filter(([key]) => key !== 'id');

	function formatFee(value: string | null | undefined): string {
		if (!value || value == null) {
			return 'Awaiting Confirmation';
		}
		return `₹ ${value ?? ''}`;
	}
</script>

<div class="col-span-12 md:col-span-6 flex flex-col">
	<div class="bg-sky-800 py-2 px-3">
		<h3 class="text-xl font-semibold text-white !m-0 p-0">Application Fee</h3>
	</div>
	<div class="max-w-full overflow-auto m-0">
		<table class="w-full border border-slate-300 !m-0">
			<tbody>
				{#if feeEntries.length > 0}
					{#each feeEntries as [key, value]}
						<tr class="border-b">
							<td class="p-2 whitespace-nowrap">{formatKeyValue(key)}:</td>
							{#if key === 'general_obc_ews' || key === 'sc_st_pwd' || key === 'female_transgender'}
								<td class="p-2 font-medium">{formatFee(value)}</td>
							{:else}
								<td class="p-2 font-medium">{value}</td>
							{/if}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
