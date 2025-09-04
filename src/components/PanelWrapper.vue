<script setup lang="ts">
    type PanelWrapperProps = {
        minWidth: string
    }
    const props = defineProps<PanelWrapperProps>();
</script>


<template>
    <div class="p-6 pb-4 bg-[#17181c] rounded-md shiny-border">
        <div class="overflow-x-auto pb-2">
            <div class="flex justify-between items-start gap-4 flex-nowrap" :style="{minWidth: props.minWidth}">
                <slot />
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>