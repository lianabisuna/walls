<script setup lang="ts">
import type { TailwindColor, TooltipPosition } from './types'

// Types


// Props
const props = defineProps({
  position: { type: String as PropType<TooltipPosition>, default: 'top' },
  color: { type: String as PropType<TailwindColor>, default: 'gray-500' },
})


/** CLASSES */

const positionClass = computed(() => {
  switch (props.position) {
    case 'right': return 'ml-0.5 left-full top-1/2 -translate-y-1/2'
    case 'bottom': return 'mt-0.5 top-full left-1/2 -translate-x-1/2'
    case 'left': return 'mr-0.5 right-full top-1/2 -translate-y-1/2'
    case 'top': default: return 'mb-0.5 bottom-full left-1/2 -translate-x-1/2'
  }
})
</script>

<template>
	<div class="relative inline-block group">
    <slot name="trigger"></slot>
    <div
      :class="[
        `bg-${color}`,
        positionClass,
      ]"
      class="absolute whitespace-nowrap rounded-sm py-1 px-2 text-white hidden group-hover:block"
    >
      <slot></slot>
    </div>
  </div>
</template>