<script setup lang="ts">
    import { ref } from 'vue';
    import type { SynthParams } from '../types';
    import { playSound } from '../utils';

    interface ButtonProps {
        label: string,
        params: SynthParams,
        baseVolume: number,
        volumeGain: number,
        tone: string,
        duration: number,
        isImmediate?: boolean,
    }
    const props = defineProps<ButtonProps>()

    const key = ref(1);
    const isActive = ref(false);

    const handleClick = async () => {
        if(!isActive.value){
            key.value += 1;

            playSound(
                props.params, 
                props.tone, 
                props.baseVolume+props.volumeGain, 
                props.duration
            )

            isActive.value = true;
            setTimeout(
                ()=>{ isActive.value = false; },
                ((props.isImmediate) ? 0.1 : props.duration) * 1000
            );
        }
    }
</script>


<template>
    <div class="flex flex-col" :key="key" @click="handleClick">
        <p>{{ props.label }}</p>
        <div
            class="bt relative z-10 w-20 h-20 bottom-[-14px] rounded-2xl bg-neutral-300 border border-b-0 border-l-0 border-t-2 border-r-2 border-white"
            :class="(isActive) ? 'active' : ''"
        >
            <div class="active-light absolute top-2 right-2 w-2 h-2 rounded-full" :class="(isActive) ? 'active' : ''">
            </div>
        </div>
        <div class="relative z-0 w-20 h-8 bg-neutral-600 rounded-b-2xl">

        </div>
    </div>
</template>


<style scoped>
    .bt{
        transition: bottom 0.075s;
        bottom: -14px;

        &.active{
            bottom: -20px;
        }
    }

    .active-light{
        background-color: #262626;

        &.active{
            background-color: oklch(70.7% 0.165 254.624);
            box-shadow: 0 0 20px #3b82f6, 0 0 40px #3b82f6, 0 0 60px #3b82f6; /* efeito glow */
        }
    }
</style>