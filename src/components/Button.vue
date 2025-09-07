<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import type { SynthParams } from '../types';
    import { playSound } from '../utils';
    import { EventBus } from '../eventBus';

    interface ButtonProps {
        label: string,
        params: SynthParams,
        baseVolume: number,
        volumeGain: number,
        tone: string,
        duration?: number,
        buttonKey?: string,
    }
    const props = defineProps<ButtonProps>()

    const key = ref(1);
    const isActive = ref(false);

    const handleClick = async () => {
        if(!isActive.value){
            key.value += 1;
            const duration = (props.duration) ? props.duration : 0.1;

            playSound(
                props.params, 
                props.tone, 
                props.baseVolume+props.volumeGain, 
                duration
            )

            isActive.value = true;
            setTimeout(
                ()=>{ isActive.value = false; },
                duration*1000
            );
        }
    }


    onMounted(()=>{
        console.log(props.buttonKey)
        if(!props.buttonKey) return;
        EventBus.addEventListener("key-pressed", handleKeyPressed)
    })
    onUnmounted(()=>{
        if(!props.buttonKey) return;
        EventBus.removeEventListener("key-pressed", handleKeyPressed)
    })

    function handleKeyPressed(e: Event) {
        const { key } = (e as CustomEvent<{ key: string }>).detail;
        if(key === props.buttonKey){ handleClick(); }
    }
</script>


<template>
    <div class="flex flex-col items-center gap-2" :key="key" @click="handleClick">
        <p>{{ props.label }}</p>

        <div class="bt-container relative rounded-2xl hover:cursor-pointer" style="box-shadow: 6px 10px 4px rgba(0,0,0, 0.25)" :class="(isActive) ? 'active' : ''">
            <div
                class="bt relative z-10 w-[80px] h-[80px] rounded-2xl bg-neutral-300 border border-b-0 border-r-0 border-t-2 border-l-2 border-white"
                :class="(isActive) ? 'active' : ''"
            >
                <div class="active-light absolute z-20 top-2 right-2 w-2 h-2 rounded-full" :class="(isActive) ? 'active' : ''"></div>
            </div>

            <div class="relative z-0 w-full h-8 bg-neutral-600 bg-gradient-to-t from-neutral-700 to-slate-500 rounded-b-2xl">
            </div>
        </div>
    </div>
</template>


<style scoped>
    .bt-container{
        transition: margin-top 0.075s;
        margin-top: 0px;

        &.active{
            margin-top: 6px;
        }
    }

    .bt{
        transition: margin-bottom 0.075s;
        margin-bottom: -20px;

        &.active{
            margin-bottom: -26px;
        }
    }

    .active-light{
        background-color: rgba(0,0,0, 0.5);

        &.active{
            background-color: rgb(0,200,255);
            box-shadow: 0px 0px 50px 10px rgba(0,200,255, 0.5);
        }
    }
</style>