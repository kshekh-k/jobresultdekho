<script lang="ts">
  import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import Icon from './ui/Icon.svelte';
	import { Calendar, RefreshCcw } from 'lucide-svelte';
  let birthDate: string = '';
  let tillDate: string = '';
  let showError = false;
  let result: { years: number; months: number; days: number } | null = null;

  function daysInMonth(year: number, monthIndex: number) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  function calculateAge(birth: Date, now: Date) {
    if (birth > now) return null;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      const prevMonthIndex = (now.getMonth() - 1 + 12) % 12;
      const prevMonthYear = prevMonthIndex === 11 ? now.getFullYear() - 1 : now.getFullYear();
      days += daysInMonth(prevMonthYear, prevMonthIndex);
      months -= 1;
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return { years, months, days };
  }

  function handleAutoCalculate() {
    showError = false;
    result = null;

    if (!birthDate) return;

    const b = new Date(birthDate + 'T00:00:00');
    const t = tillDate ? new Date(tillDate + 'T00:00:00') : new Date();

    if (isNaN(b.getTime()) || b > t) {
      showError = true;
      return;
    }

    const r = calculateAge(b, t);
    if (!r) {
      showError = true;
      return;
    }

    result = r;
  }

  function handleReset() {
    const today = new Date().toISOString().split('T')[0];
    birthDate = '';
    tillDate = today;
    result = null;
    showError = false;
  }

  onMount(() => {
    const today = new Date().toISOString().split('T')[0];
    tillDate = today;
  });


function openDobPicker() {
		const el = document.getElementById('birthDate') as HTMLInputElement;
		if (el) el.showPicker();
}
function openTdPicker() {
		const el = document.getElementById('tillDate') as HTMLInputElement;
		if (el) el.showPicker();
}


</script>

<Card.Root class="" variant={'default'}>
	<Card.Content class="flex-1 md:!px-6 !px-3">
		<div class="max-w-2xl mx-auto space-y-4">
  <h2 class="text-2xl font-semibold mb-4">Age Calculator</h2>

  <div class="grid gap-4 sm:grid-cols-2">
    <div class="space-y-2 relative">
      <label class="block text-sm font-medium" for="birthDate">Birth Date</label>
      <input
        id="birthDate"
        type="date"
        bind:value={birthDate}
        on:change={handleAutoCalculate}
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 absolute invisible"
      />
      <div
							 class="w-full flex items-center justify-between border border-slate-300 h-12 rounded-md px-4 py-2 bg-white cursor-pointer"
							on:click={openDobPicker}
						>
							<span class="text-slate-900">
								{#if birthDate}
									{new Date(birthDate).toLocaleDateString('en-GB').replaceAll('/', '-')}
								{:else}
									Select date of birth
								{/if}
							</span>
							<!-- Custom calendar icon -->
							<Icon name={Calendar} size={20} className="text-slate-600" />
						</div>
    </div>

    <div class="space-y-2 relative">
      <label class="block text-sm font-medium" for="tillDate">Till Date</label>
      <input
        id="tillDate"
        type="date"
        bind:value={tillDate}
        on:change={handleAutoCalculate}
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 absolute invisible"
      /> 
      <div
							 class="w-full flex items-center justify-between border border-slate-300 h-12 rounded-md px-4 py-2 bg-white cursor-pointer"
							on:click={openTdPicker}
						>
							<span class="text-slate-900">
								{#if tillDate}
									{new Date(tillDate).toLocaleDateString('en-GB').replaceAll('/', '-')}
								{:else}
									Select date of birth
								{/if}
							</span>
							<!-- Custom calendar icon -->
							<Icon name={Calendar} size={20} className="text-slate-600" />
						</div>
    </div>
  </div>

  <div class="flex gap-3 items-center mt-4">
    <button
      on:click={handleReset}
      class="px-3 py-2 rounded-lg border border-slate-300 items-center text-sm flex gap-1 "
    >
     <Icon name={RefreshCcw} size={16} /> Reset
    </button>
  </div>

  {#if showError}
    <p class="text-sm text-red-600 mt-3">Please enter valid dates (Birth date must be before Till date).</p>
  {/if}

  {#if result}
    <div class="mt-6 bg-sky-50 p-4 rounded-lg">
      <p class="text-lg font-medium">Age between dates:</p>
      <p class="text-xl font-bold mt-1 capitalize"><span class="text-indigo-600 text-2xl">{result.years}</span> year{result.years < 2 ? '' : 's'}, <span class="text-indigo-600 text-2xl">{result.months}</span> month{result.months < 2 ? '' : 's'} <span class="lowercase">and</span> <span class="text-indigo-600 text-2xl">{result.days}</span> day{result.days < 2 ? '' : 's'}</p>
    </div>
  {/if}

  <div class="mt-4 text-xs text-gray-500">
    Tip: Select your date of birth — the till date is automatically set to today.
  </div>
</div>
	</Card.Content>
</Card.Root>