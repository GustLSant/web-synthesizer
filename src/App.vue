<script setup lang="ts">
  import Button from './components/Button.vue';
  import type { SynthParams } from './types';


  const windParams: SynthParams = {
    harmonicity: 1,
    modulationIndex: 2,
    oscillator: { type: "sine" },
    modulation: { type: "sine" },
    envelope: {
      attack: 0.15,
      decay: 0.001,
      sustain: 0.8,
      release: 1.0
    },
    modulationEnvelope: {
      attack: 0.5,
      decay: 0.3,
      sustain: 1,
      release: 1.0
    }
  };

  const stringParams: SynthParams = {
    harmonicity: 1.5,
    modulationIndex: 8,
    oscillator: { type: "triangle" },
    modulation: { type: "square" },
    envelope: {
      attack: 0.01,
      decay: 1.2,
      sustain: 0.0,  // não sustenta, só decai
      release: 0.8
    },
    modulationEnvelope: {
      attack: 0.01,
      decay: 1.0,
      sustain: 0.0,
      release: 0.8
    }
  };

  const kickParams: SynthParams = {
    harmonicity: 0.5, // modulador abaixo da frequência base
    modulationIndex: 30, // harmônicos fortes no ataque
    oscillator: { type: "sine" },
    modulation: { type: "sine" },
    envelope: {
      attack: 0.001,
      decay: 0.8,   // boom mais longo
      sustain: 0.0,
      release: 0.2
    },
    modulationEnvelope: {
      attack: 0.001,
      decay: 0.05,  // só no início
      sustain: 0.0,
      release: 0.01
    },
  }
</script>


<template>
  <div class="flex gap-2">
    <Button label="Wind" :params="windParams" :baseVolume="2" :volumeGain="0" tone="C4" :duration="2.0" />
    <Button label="String" :params="stringParams" :baseVolume="0" :volumeGain="0" tone="G3" :duration="2.0" :isImmediate="true" />
    <Button label="Kick" :params="kickParams" :baseVolume="8" :volumeGain="0" tone="C3" :duration="0.5" :isImmediate="true" />
  </div>
</template>


<style scoped>
  
</style>
