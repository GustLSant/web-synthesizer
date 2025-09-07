<script setup lang="ts">
  import Parte1 from './components/Parte1.vue';
  import Grupo from './components/Grupo.vue';
  import Parte2 from './components/Parte2.vue';
  import Piano from './components/Piano.vue';
</script>


<template>
  <div class="flex flex-col gap-4 p-4 max-w-[1250px] m-auto overflow-x-hidden">
    <Parte1 />
    <Parte2 />
    <Piano />
    <Grupo />
  </div>
  <!-- <div class="w-full h-4" style="background-image: linear-gradient(to top, rgb(0,200,255), rgb(50,100,255));"></div> -->
</template>


<style scoped>
  
</style>
