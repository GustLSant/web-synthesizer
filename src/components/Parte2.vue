<script setup lang="ts">
    import PanelWrapper from './PanelWrapper.vue';
    import { ref } from 'vue';
    import { ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
    import { PlayIcon } from '@heroicons/vue/24/solid'

    const volumeGain = ref<number>(0.0);
    const selectedFile = ref<File | null>(null)

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement
        if (input.files && input.files.length > 0) {
            selectedFile.value = input.files[0]
            console.log("Arquivo selecionado:", input.files[0].name)
        }
        else{
            window.alert("Erro ao carregar o arquivo!")
        }
    }

    function handleClickPlay() {
        if(!selectedFile.value){ window.alert("Erro ao tocar o arquivo de áudio!"); return; }
        console.log('PLAY no audio: ', selectedFile.value.name);
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