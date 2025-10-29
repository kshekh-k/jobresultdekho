<script lang="ts">
  import { onMount } from 'svelte';

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
</script>

<div class="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
  <h2 class="text-2xl font-semibold mb-4">Age Calculator</h2>

  <div class="grid gap-4 sm:grid-cols-2">
    <div>
      <label class="block text-sm font-medium mb-2" for="birth">Birth Date</label>
      <input
        id="birth"
        type="date"
        bind:value={birthDate}
        on:change={handleAutoCalculate}
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-2" for="till">Till Date</label>
      <input
        id="till"
        type="date"
        bind:value={tillDate}
        on:change={handleAutoCalculate}
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
    </div>
  </div>

  <div class="flex gap-3 items-center mt-4">
    <button
      on:click={handleReset}
      class="px-3 py-2 rounded-lg border text-sm"
    >
      Reset
    </button>
  </div>

  {#if showError}
    <p class="text-sm text-red-600 mt-3">Please enter valid dates (Birth date must be before Till date).</p>
  {/if}

  {#if result}
    <div class="mt-6 bg-sky-50 p-4 rounded-lg">
      <p class="text-lg font-medium">Age between dates:</p>
      <p class="text-2xl font-bold mt-1">{result.years} year{result.years === 1 ? '' : 's'}, {result.months} month{result.months === 1 ? '' : 's'} and {result.days} day{result.days === 1 ? '' : 's'}</p>
    </div>
  {/if}

  <div class="mt-4 text-xs text-gray-500">
    Tip: Select your birth date — the till date is automatically set to today.
  </div>
</div>