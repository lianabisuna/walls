<script lang="ts" setup>
// Imports
import type { TailwindColor } from './types'

// Props
const props = defineProps({
  name: { type: String as PropType<string>, default: '' },
  /** Form Container */
  backgroundColor: { type: String as PropType<TailwindColor>, default: 'light' },
  borderColor: { type: String as PropType<TailwindColor>, default: 'neutral-500' },
  color: { type: String as PropType<TailwindColor>, default: 'primary-500' },
  error: { type: Boolean as PropType<boolean>, default: false },
  success: { type: Boolean as PropType<boolean>, default: false },
  label: { type: String as PropType<string>, default: '' },
  required: { type: Boolean as PropType<boolean>, default: false },
  message: { type: String as PropType<string>, default: '' },
  disabled: { type: Boolean as PropType<boolean>, default: false },
  size: { type: String as PropType<FormContainerSize>, default: 'sm' },
  block: { type: Boolean as PropType<boolean>, default: false },
  hideFocus: { type: Boolean as PropType<boolean>, default: false },
});


/** CLASSES */

const sizeClass = computed(() => {
  switch (props.size) {
		case 'xs': return 'py-2 px-2';
		case 'sm': return 'py-2.5 px-2.5';
		case 'lg': return 'py-3.5 px-3.5';
		case 'xl': return 'py-4 px-4';
		case 'md': default: return 'py-3 px-3';
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
  <Field
    :name="props.name"
    v-slot="fieldData"
  >
    <div
      ref="containerRef"
      class="relative group flex flex-col"
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
        :error="props.error || !!fieldData.errorMessage"
        :success="props.success"
        :size="props.size"
        :label="props.label"
      >
        {{ props.label }}
      </AppFormLabel>
      <!-- Input Container -->
      <div
        :class="[
          sizeClass,
          `bg-${props.backgroundColor}`,
          props.error || !!fieldData.errorMessage
            ? 'border border-error-500 group-focus-within:border-error-500'
            : props.success
              ? 'border border-success-500 group-focus-within:border-success-500'
              : `border border-${props.borderColor} group-focus-within:border-dark`,
          {
            'opacity-75 pointer-events-none': props.disabled,
            'w-full': props.block,
          },
        ]"
        class="relative flex items-center cursor-text justify-between text-dark rounded-sm"
      >
        <slot v-bind="{ fieldData }"></slot>
      </div>
      <!-- Message -->
      <AppFormMessage
        v-if="props.message || fieldData.errorMessage"
        :error="props.error || !!fieldData.errorMessage"
        :success="props.success"
      >
        {{ props.message || fieldData.errorMessage }}
      </AppFormMessage>
    </div>
  </Field>
</template>

<script lang="ts">
// Types
export type FormContainerSize = 'xs'|'sm'|'md'|'lg'|'xl';
</script>