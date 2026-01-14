<script lang="ts">
	export let fees: any[] | null | undefined = [];
	$: safeFees = Array.isArray(fees) ? fees : [];

	function formatFee(value: number | string | null | undefined): string {
		if (value == null || value === '') {
			return '₹ 0';
		}
		return `₹ ${value}`;
	}
</script>

<div class="col-span-12 md:col-span-6 flex flex-col">
	<div class="bg-sky-800 py-2 px-3">
		<h3 class="text-xl font-semibold text-white !m-0 p-0">Application Fee</h3>
	</div>
	<div class="max-w-full overflow-auto m-0">
		<table class="w-full border border-slate-300 !m-0">
			<tbody>
				{#if safeFees.length > 0}
					{#each safeFees as fee}
						<tr class="border-b">
							<td class="p-2 whitespace-nowrap">{fee.Fees_Label}:</td>
							<td class="p-2 font-medium">
								{#if fee.Fees_message}
									<span
										>{formatFee(fee.Fees_Value)}<span class="text-sm text-gray-600 italic px-10"
											>{fee.Fees_message}</span
										></span
									>
								{:else}
									<span>{formatFee(fee.Fees_Value)}</span>
								{/if}
							</td>
						</tr>
					{/each}
				{:else}
					<tr class="border-b">
						<td class="p-2 text-center" colspan="2">No fee information available</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>
