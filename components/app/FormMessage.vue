<script setup lang="ts">
// Props
const props = defineProps({
  error: { type: Boolean as PropType<boolean>, default: false },
  success: { type: Boolean as PropType<boolean>, default: false },
})


/** CLASSES */

const textClass = computed(() => {
  if (props.error) return 'text-light';
  else if (props.success) return 'text-light';
  else return 'text-neutral-500';
})

const backgroundClass = computed(() => {
  if (props.error) return 'bg-error-500';
  else if (props.success) return 'bg-success-500';
  else return 'bg-light';
})
</script>

<template>
  <div
    class="absolute left-0 top-full text-xs w-full -mt-0.5 px-1.5 py-0.5 font-normal"
    :class="[
      textClass,
      backgroundClass,
    ]"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>