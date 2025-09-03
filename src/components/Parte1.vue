<script setup lang="ts">
    import { ref } from 'vue';
    import Button from './Button.vue';
    import type { SynthParams } from '../types';
    import PanelWrapper from './PanelWrapper.vue';

    const volumeGain = ref<number>(0.0);

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
            sustain: 0.0,
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
        harmonicity: 0.5,
        modulationIndex: 30,
        oscillator: { type: "sine" },
        modulation: { type: "sine" },
        envelope: {
            attack: 0.001,
            decay: 0.8,
            sustain: 0.0,
            release: 0.2
        },
        modulationEnvelope: {
            attack: 0.001,
            decay: 0.05,
            sustain: 0.0,
            release: 0.01
        },
    }
</script>


<template>
    <PanelWrapper minWidth="750px">
        <section class="flex flex-col gap-4 min-h-[190px]">
            <h1 class="text-2xl font-medium">Parte 1 - Instrumentos Básicos</h1>
            <div class="flex gap-4">
                <Button label="Wind"   :params="windParams"   :baseVolume="2" :volumeGain="volumeGain" tone="C4" :duration="2.0" />
                <Button label="String" :params="stringParams" :baseVolume="0" :volumeGain="volumeGain" tone="G3" :duration="2.0" :isImmediate="true" />
                <Button label="Kick"   :params="kickParams"   :baseVolume="4" :volumeGain="volumeGain" tone="C3" :duration="0.5" :isImmediate="true" />
            </div>
        </section>
        
        <section class="flex flex-col gap-2 grow max-w-[400px] p-2 bg-neutral-700 rounded-md shiny-border">
            <h2 class="text-lg font-medium">
                Parâmetros
            </h2>
            <div class="flex flex-col items-stretch">
                <p>Volume:</p>
                <div class="flex gap-2 items-center">
                    <input
                        type="range"
                        step=".5"
                        min="-5"
                        max="5"
                        id="volume-input"
                        class="grow hover:cursor-pointer"
                        v-model.number="volumeGain"
                    >
                    <p class="min-w-[36px]">
                        {{ ((volumeGain >= 0) ? '+' : '') + volumeGain.toFixed(1) }}
                    </p>
                </div>
            </div>
        </section>
    </PanelWrapper>
</template>


<style scoped>

</style>