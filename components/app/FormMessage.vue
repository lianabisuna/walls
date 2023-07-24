<script setup lang="ts">
// Props
const props = defineProps({
  error: { type: Boolean as PropType<boolean>, default: false },
  success: { type: Boolean as PropType<boolean>, default: false },
})


/** CLASSES */

const textClass = computed(() => {
  if (props.error) return 'text-error-500';
  else if (props.success) return 'text-success-500';
  else return 'text-neutral-500';
})
</script>

<template>
  <div
    class="text-xs mt-1.5"
    :class="[
      textClass
    ]"
  >
    <slot></slot>
  </div>
</template>

<style scoped></style>