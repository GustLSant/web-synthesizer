<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { stringParams } from '../instruments';
    import PanelWrapper from './PanelWrapper.vue';
    import Button from './Button.vue';
    import { EventBus } from '../eventBus';

    const volumeGain = ref<number>(0.0);
    const octave = ref<number>(3);

    onMounted(() => document.addEventListener('keydown', handleKeyDown));
    onBeforeUnmount(() => document.removeEventListener('keydown', handleKeyDown));

    function handleKeyDown(e: KeyboardEvent) {
        const key = (e.key || '');
        if (!key) return;

        e.preventDefault();

        switch (key) {
            case 'q': 
                EventBus.dispatchEvent(new CustomEvent("key-pressed", { detail: { key: 'Q' } })); 
                break;
            case 'w': 
                EventBus.dispatchEvent(new CustomEvent("key-pressed", { detail: { key: 'W' } }));
                break;
            case 'e': 
                EventBus.dispatchEvent(new CustomEvent("key-pressed", { detail: { key: 'E' } }));
                break;
            case 'r': 
                EventBus.dispatchEvent(new CustomEvent("key-pressed", { detail: { key: 'R' } }));
                break;
            case 't': 
                EventBus.dispatchEvent(new CustomEvent("key-pressed", { detail: { key: 'T' } }));
                break;
            case 'y': 
                EventBus.dispatchEvent(new CustomEvent("key-pressed", { detail: { key: 'Y' } }));
                break;
            case 'u': 
                EventBus.dispatchEvent(new CustomEvent("key-pressed", { detail: { key: 'U' } }));
                break;
        }
    }
</script>


<template>
    <PanelWrapper min-width="650px">
        <section class="flex flex-col gap-4 min-h-[190px]">
            <h1 class="text-2xl font-medium">Parte Extra - Piano</h1>
            <div class="flex gap-4">
                <Button :label="'Q: '+'C'+octave.toString()" :tone="'C'+octave.toString()" buttonKey="Q" :params="stringParams" :baseVolume="0" :volumeGain="volumeGain" />
                <Button :label="'W: '+'D'+octave.toString()" :tone="'D'+octave.toString()" buttonKey="W" :params="stringParams" :baseVolume="0" :volumeGain="volumeGain" />
                <Button :label="'E: '+'E'+octave.toString()" :tone="'E'+octave.toString()" buttonKey="E" :params="stringParams" :baseVolume="0" :volumeGain="volumeGain" />
                <Button :label="'R: '+'F'+octave.toString()" :tone="'F'+octave.toString()" buttonKey="R" :params="stringParams" :baseVolume="0" :volumeGain="volumeGain" />
                <Button :label="'T: '+'G'+octave.toString()" :tone="'G'+octave.toString()" buttonKey="T" :params="stringParams" :baseVolume="0" :volumeGain="volumeGain" />
                <Button :label="'Y: '+'A'+octave.toString()" :tone="'A'+octave.toString()" buttonKey="Y" :params="stringParams" :baseVolume="0" :volumeGain="volumeGain" />
                <Button :label="'U: '+'B'+octave.toString()" :tone="'B'+octave.toString()" buttonKey="U" :params="stringParams" :baseVolume="0" :volumeGain="volumeGain" />
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
            <div class="flex flex-col items-stretch">
                <p>Oitava:</p>
                <div class="flex gap-2 items-center">
                    <input
                        type="range"
                        step="1"
                        min="2"
                        max="5"
                        id="octave-input"
                        class="grow hover:cursor-pointer"
                        v-model.number="octave"
                    >
                    <p class="min-w-[36px]">
                        {{ octave }}
                    </p>
                </div>
            </div>
            
        </section>
    </PanelWrapper>
</template>


<style scoped>

</style>