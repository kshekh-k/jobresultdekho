<script lang="ts">
  import type { StageConfig, Result } from './types';
  import { createEventDispatcher } from 'svelte';

  
  export let config: StageConfig = {
  label: "Easy",
  timeLimit: 30,
  wordMin: 2,
  wordMax: 4
};

  export let words: string[];

  const dispatch = createEventDispatcher();

  let input = "";
  let position = 0;
  let started = false;
  let finished = false;

  let correctChars = 0;
  let wrongChars = 0;

  let remaining = config.timeLimit;
  let timer: any;

  const target = words.join(" ");

  function start() {
    started = true;

    timer = setInterval(() => {
      remaining--;

      if (remaining <= 0) {
        finish();
      }
    }, 1000);
  }

  function finish() {
    if (finished) return;
    finished = true;
    clearInterval(timer);

    const minutes = config.timeLimit / 60;

    const wpm = Math.round((correctChars / 5) / minutes);
    const accuracy = Math.round((correctChars / Math.max(1, correctChars + wrongChars)) * 100);

    const data: Result = {
      wpm,
      accuracy,
      correctChars,
      wrongChars,
      timeSecs: config.timeLimit - remaining
    };

    dispatch("result", data);
  }

  function handleInput(e: any) {
    if (!started) start();

    const val = e.target.value;

    if (val.length < input.length) {
      input = val;
      position = val.length;
      return;
    }

    const newChars = val.slice(input.length);

    for (const ch of newChars) {
      const expected = target[position] ?? "";
      if (ch === expected) correctChars++;
      else wrongChars++;

      position++;
    }

    input = val;
  }
</script>

<div class="p-4 bg-white rounded shadow space-y-3">

  <!-- Timer -->
  <div class="text-xl font-bold text-red-600 text-center">
    {remaining}s
  </div>

  <!-- Render words -->
  <div class="border p-4 font-mono min-h-[140px] text-lg leading-relaxed">
    {@html (() => {
      let out = "";
      for (let i = 0; i < target.length; i++) {
        const t = target[i];
        const typed = input[i];
        if (!typed) out += `<span>${t}</span>`;
        else if (typed === t) out += `<span class='text-green-600'>${t}</span>`;
        else out += `<span class='text-red-500'>${t}</span>`;
      }
      return out;
    })()}
  </div>

  <input
    class="w-full p-3 border rounded"
    spellcheck="false"
    on:input={handleInput}
    disabled={finished}
  />

</div>
