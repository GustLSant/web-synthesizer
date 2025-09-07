<script setup lang="ts">
    import PanelWrapper from './PanelWrapper.vue';
    import { ref } from 'vue';
    import { ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
    import { PlayIcon } from '@heroicons/vue/24/solid'
import type { SynthParams } from '../types';
import { playSound } from '../utils';
import { Tone } from 'tone/build/esm/core/Tone';

    const volumeGain = ref<number>(0.0);
    const selectedFile = ref<File | null>(null)
    const instructions = ref<string[]>([])
    
    function getText(file: File){
        const reader = new FileReader()
        

        reader.onload = () => {
        if (typeof reader.result === 'string') {
      
            instructions.value = reader.result
                .split(',')
            }
            console.log('testando:', instructions.value)
        }

        reader.readAsText(file)
    }

    function getBaseDuration (string: string, params: SynthParams){
        let duration;
        if (params == kickParams){
            duration = 1;
        } else {
            duration = string.slice(1)
        }
        return Number(duration);
    }

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
        oscillator: { type: "sawtooth" },
        modulation: { type: "sine" },
        envelope: {
            attack: 0.001,
            decay: 0.02,
            sustain: 0.0,
            release: 0.05
        },
        modulationEnvelope: {
            attack: 0.001,
            decay: 0.05,
            sustain: 0.0,
            release: 0.01
        },
    }    

    let selectedParams: SynthParams = kickParams;
    function getParams(instruction: string) {
        switch (instruction) {
            case "Ic":
            selectedParams = stringParams;
            break
            case "Is":
            selectedParams =windParams;
            break
            case "Ip":
            selectedParams = kickParams;
            break
            default:
            console.log("Instruções inválidas. Tente novamente.")
            }
    }

    function playNote(instruction: string, params: SynthParams, baseVolume: number, baseDuration: number) {
    const nota = instruction[0];        // A-G
    const acidente = instruction[1];    // n, s, b
    const oitava = instruction[2];      // 0-8
    const divisor = instruction[3];     // k ou número
    const intensidade = instruction[4]; // F ou f

    let noteModifier = "";
    if (acidente === "s") noteModifier = "#";
    if (acidente === "b") noteModifier = "b";
    const noteTone = nota + noteModifier + oitava;

    let noteDuration = (divisor === "k") ? baseDuration / 1 : baseDuration / Number(divisor);
    if (params === kickParams) noteDuration = 0.05;

    const noteVolume = intensidade === "F" ? baseVolume : baseVolume / 2;

    playSound(params, noteTone, noteVolume, noteDuration);

    return noteDuration;
}

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement
        if (input.files && input.files.length > 0) {
            selectedFile.value = input.files[0]
            console.log("Arquivo selecionado:", input.files[0].name)
            getText(selectedFile.value);
        }
        else{
            window.alert("Erro ao carregar o arquivo!")
        }
    }

    const handleClickPlay = async() => {
        if(!selectedFile.value){ window.alert("Erro ao tocar o arquivo de áudio!"); return; }
        console.log(instructions.value[1]);
        getParams(instructions.value[1]);
        let baseVolume = 6;
        let baseDuration = getBaseDuration(instructions.value[0], selectedParams);
        let notas = instructions.value.slice(2);
        console.log(notas)

        for (const nota of notas) {
            let waitTime: number;
            
            const noteDuration = await playNote(nota.toString(), selectedParams, baseVolume, baseDuration);

            if(selectedParams == kickParams){
                waitTime = 1000;
            } else {
                waitTime = noteDuration * 1000
            }
            await new Promise(res => setTimeout(res, waitTime));
            
        }
        
    }
</script>


<template>
    <PanelWrapper min-width="650px">
        <section class="flex flex-col items-start gap-4">
            <h1 class="text-2xl font-medium">Parte 2 - Leitura de Arquivo</h1>
            <div class="flex gap-2 items-stretch">
                <label
                    for="file-upload"
                    class="upload-button text-white p-[2px] rounded-sm bg-gradient-to-t from-[rgb(0,200,255)] to-[rgb(50,100,255)] hover:cursor-pointer"
                >
                    <div class="flex gap-2 items-center p-2 px-4 bg-[#17181c] rounded-sm">
                        <p>Escolher Arquivo</p>
                        <ArrowUpTrayIcon class="w-5 h-5" />
                        <input
                            id="file-upload"
                            type="file"
                            class="hidden"
                            @change="handleFileChange"
                        />
                    </div>
                </label>

                <button v-if="selectedFile" @click="handleClickPlay" class="flex items-center gap-1 p-2 px-4 rounded-sm bg-gradient-to-t from-[rgb(0,200,255)] to-[rgb(50,100,255)] hover:cursor-pointer hover:underline">
                    <p>PLAY</p>
                    <PlayIcon class="w-5 h-5 mr-[-5px]"/>
                </button>
            </div>
            

            <div v-if="selectedFile" class="flex flex-col gap-1 p-2 bg-neutral-700 rounded-md shiny-border">
                <h2 class="text-lg font-medium">Arquivo Carregado:</h2>
                <p v-if="selectedFile">{{ selectedFile.name }}</p>
            </div>

            <div v-else class="-mt-[10px]">
                <p class="text-white/50 ">Nenhum Arquivo Carregado</p>
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
    .upload-button{
        &:hover div{
            background-color: rgba(23, 24, 28, 0.9);
        }
    }
</style>