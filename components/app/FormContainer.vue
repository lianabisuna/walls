<script lang="ts" setup>
// Imports
import type { TailwindColor } from './types'

// Props
const props = defineProps({
  color: { type: String as PropType<TailwindColor>, default: 'primary-500' },
  error: { type: Boolean as PropType<boolean>, default: false },
  success: { type: Boolean as PropType<boolean>, default: false },
  label: { type: String as PropType<string>, default: '' },
  required: { type: Boolean as PropType<boolean>, default: false },
  message: { type: String as PropType<string>, default: '' },
  disabled: { type: Boolean as PropType<boolean>, default: false },
  size: { type: String as PropType<FormContainerSize>, default: 'sm' },
  block: { type: Boolean as PropType<boolean>, default: false },
});


/** CLASSES */

const groupFocusClass = computed(() => {
  if (props.error) return 'group-focus-within:border-error-500';
  else if (props.success) return 'group-focus-within:border-success-500';
  else return `group-focus-within:border-dark`;
});

const sizeClass = computed(() => {
  switch (props.size) {
		case 'xs': return 'py-1 px-2';
		case 'sm': return 'py-1.5 px-2.5';
		case 'lg': return 'py-2.5 px-3.5';
		case 'xl': return 'py-3 px-4';
		case 'md': default: return 'py-2 px-3';
	}
})


/** FOCUS ON INPUT UPON CLICKING CONTAINER */

// Data
const containerRef = ref<any>();

// Function
function onClickContainer() {
  containerRef.value.querySelector('input').focus();
}
</script>

<template>
	<div
    ref="containerRef"
    class="group flex flex-col"
    :class="[
      { 'w-full': props.block }
    ]"
    @click="onClickContainer"
  >
    <!-- Label -->
    <AppFormLabel
      v-if="props.label"
      :required="props.required"
      :color="props.color"
      :error="props.error"
      :success="props.success"
      :size="props.size"
    >
      {{ props.label }}
    </AppFormLabel>
    <!-- Input Container -->
    <div
      :class="[
        groupFocusClass,
        sizeClass,
        { 'opacity-75 pointer-events-none': props.disabled },
        { 'w-full': props.block }
      ]"
      class="relative flex items-center cursor-text justify-between bg-neutral-50 text-dark rounded-sm border border-neutral-50"
    >
      <slot></slot>
    </div>
    <!-- Message -->
    <AppFormMessage
      v-if="props.message"
      :error="props.error"
      :success="props.success"
    >
      {{ props.message }}
    </AppFormMessage>
  </div>
</template>

<script lang="ts">
// Types
export type FormContainerSize = 'xs'|'sm'|'md'|'lg'|'xl';
</script>