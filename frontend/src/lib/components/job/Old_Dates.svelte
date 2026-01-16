<script lang="ts">
	import { formatDate, formatKeyValue, daysLeft } from '$lib/utils'; 
	export let dates: Record<string, string> | null | undefined = {};
	$: safeDates = dates && typeof dates === 'object' ? dates : {};
	$: dateEntries = Object.entries(safeDates).map(([key, value]) => [
		key,
		value?.trim() ? value : null
	]);
</script>

<!-- Important Dates -->
<div class="col-span-12 md:col-span-6 flex flex-col">
	<div class="bg-sky-800 py-2 px-3">
		<h3 class="text-xl font-semibold text-white !m-0 p-0">Important Dates</h3>
	</div>
	<div class="max-w-full overflow-auto m-0">
		<table class="w-full border border-slate-300 !m-0">
			<tbody>
				{#if dateEntries.length > 0}
					{#each dateEntries as [key, value]}
						<tr class="border-b">
							<td class="p-2">{formatKeyValue(key)}:</td>
							<td class="p-2 font-medium ">{formatDate(value)}</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>