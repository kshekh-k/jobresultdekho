<script lang="ts">
	import { formatDate, formatKeyValue, daysLeft } from '$lib/utils';
	export let dates: any | null | undefined = {};
	$: safeDates = dates && typeof dates === 'object' ? dates : {};

	// Define date fields and their corresponding flag and message fields
	const dateFields = [
		{
			key: 'vacancy_notification_date',
			label: 'Notification Date',
			flagKey: 'No_Notification_date',
			messageKey: 'No_notification_date_message',
			showMessage: true
		},
		{
			key: 'apply_online_start_date',
			label: 'Apply Online Start Date',
			flagKey: 'No_Apply_date',
			messageKey: 'No_Apply_date_message',
			showMessage: true
		},
		{
			key: 'apply_online_end_date',
			label: 'Apply Online End Date',
			flagKey: 'No_Apply_date',
			messageKey: 'No_Apply_date_message',
			showMessage: false
		},
		{
			key: 'fee_payment_last_date',
			label: 'Fee Payment Last Date',
			flagKey: 'No_Apply_date',
			messageKey: 'No_Apply_date_message',
			showMessage: false
		},
		{
			key: 'correction_date',
			label: 'Correction Date',
			flagKey: 'No_Apply_date',
			messageKey: 'No_Apply_date_message',
			showMessage: false
		},
		{
			key: 'admit_card',
			label: 'Admit Card',
			flagKey: 'No_Admitcard_date',
			messageKey: 'No_admitcard_date_message',
			showMessage: true
		},
		{
			key: 'exam_date',
			label: 'Exam Date',
			flagKey: 'No_Exam_date',
			messageKey: 'No_Exam_date_message',
			showMessage: true
		},
		{
			key: 'result_date',
			label: 'Result Date',
			flagKey: 'No_Result_date',
			messageKey: 'No_Result_date_message',
			showMessage: true
		}
	];
</script>

<!-- Important Dates -->
<div class="col-span-12 md:col-span-6 flex flex-col">
	<div class="bg-sky-800 py-2 px-3">
		<h3 class="text-xl font-semibold text-white !m-0 p-0">Important Dates</h3>
	</div>
	<div class="max-w-full overflow-auto m-0">
		<table class="w-full border border-slate-300 !m-0">
			<tbody>
				{#each dateFields as field}
					{#if !safeDates[field.flagKey] && safeDates[field.key]}
						<tr class="border-b">
							<td class="p-2">{field.label}:</td>
							<td class="p-2 font-medium">
								{formatDate(safeDates[field.key])}
							</td>
						</tr>
					{:else if safeDates[field.flagKey] && field.showMessage && safeDates[field.messageKey]}
						<tr class="border-b">
							<td class="p-2">{field.label}:</td>
							<td class="p-2 font-medium">
								<span class="text-sm text-gray-600 italic">{safeDates[field.messageKey]}</span>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</div>
