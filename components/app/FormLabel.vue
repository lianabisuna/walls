<script setup lang="ts">
// Imports
import type { TailwindColor } from './types'

// Props
const props = defineProps({
  required: { type: Boolean as PropType<boolean>, default: false },
  color: { type: String as PropType<TailwindColor>, default: 'primary-500' },
  error: { type: Boolean as PropType<boolean>, default: false },
  success: { type: Boolean as PropType<boolean>, default: false },
  label: { type: String as PropType<string>, default: '' },
  size: { type: String as PropType<LabelSize>, default: 'sm' },
})


/** CLASSES */

const textClass = computed(() => {
  // if (props.error) return 'text-error-500 group-focus-within:text-error-500';
  // else if (props.success) return 'text-success-500 group-focus-within:text-success-500';
  // else return 'text-dark/90 group-focus-within:text-dark';

  return 'text-dark/90 group-focus-within:text-dark';
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs': return 'text-xs';
    case 'sm': return 'text-sm';
    case 'lg': return 'text-lg';
    case 'xl': return 'text-xl';
    case 'md': default: return 'text-base';
  }
});

const slots = useSlots();
</script>

<template>
	<label
		class="flex items-center mb-1.5 font-semibold"
    :class="[
      textClass,
      sizeClass,
    ]"
    v-bind="$attrs"
  >
    <slot>{{ props.label }}</slot>
    <span
      v-if="required"
      class="ml-1 text-error-500"
    >
      *
    </span>
    <div
      class="ml-auto"
      :aria-label="props.label"
    >
    </div>
  </label>
</template>

<script lang="ts">
// Types
export type LabelSize = boolean|'xs'|'sm'|'md'|'lg'|'xl';
</script>