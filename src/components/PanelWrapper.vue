<script setup lang="ts">
    type PanelWrapperProps = {
        minWidth: string
    }
    const props = defineProps<PanelWrapperProps>();
</script>


<template>
    <div class="p-6 bg-[#17181c] rounded-md shiny-border">
        <div class="overflow-x-auto">
            <div class="flex justify-between items-start flex-nowrap" :style="{minWidth: props.minWidth}">
                <slot />
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>