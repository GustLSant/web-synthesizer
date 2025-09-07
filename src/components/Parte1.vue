<script setup lang="ts">
    import { ref } from 'vue';
    import Button from './Button.vue';
    import PanelWrapper from './PanelWrapper.vue';
    import { windParams, stringParams, kickParams } from '../instruments';

    const volumeGain = ref<number>(0.0);
</script>


<template>
    <PanelWrapper minWidth="650px">
        <section class="flex flex-col gap-4 min-h-[190px]">
            <h1 class="text-2xl font-medium">Parte 1 - Instrumentos Básicos</h1>
            <div class="flex gap-4">
                <Button label="Wind"   :params="windParams"   :baseVolume="2" :volumeGain="volumeGain" tone="C4" :duration="2.0" />
                <Button label="String" :params="stringParams" :baseVolume="0" :volumeGain="volumeGain" tone="G3" />
                <Button label="Kick"   :params="kickParams"   :baseVolume="4" :volumeGain="volumeGain" tone="C3" />
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