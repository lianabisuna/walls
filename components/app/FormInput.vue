<script lang="ts" setup>
// Imports
import type { TailwindColor, ClassBinding } from './types'

// Props
const props = defineProps({
  modelValue: { type: [String,Number] as PropType<string|number>, default: '' },
  autofocus: { type: Boolean as PropType<boolean>, default: false },
  readonly: { type: Boolean as PropType<boolean>, default: false },
  name: { type: String as PropType<string>, default: '' },
  placeholder: { type: String as PropType<string>, default: '' },
  type: { type: String as PropType<HTMLInputType>, default: 'text' },
  inputClass: { type: [Array,String] as PropType<ClassBinding>, default: '' },
  /** Form Container */
  color: { type: String as PropType<TailwindColor>, default: 'blue-500' },
  error: { type: Boolean as PropType<boolean>, default: false },
  success: { type: Boolean as PropType<boolean>, default: false },
  label: { type: String as PropType<string>, default: '' },
  required: { type: Boolean as PropType<boolean>, default: false },
  message: { type: String as PropType<string>, default: '' },
  disabled: { type: Boolean as PropType<boolean>, default: false },
  size: { type: String as PropType<InputSize>, default: 'sm' },
  block: { type: Boolean as PropType<boolean>, default: false },
})

// Slots
const slots = useSlots();

// Emits
const emits = defineEmits(['update:modelValue']);


/** UPDATE MODEL VALUE */

const updateModelValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.value !== undefined) {
    emits('update:modelValue', target.value);
  }
}

/** CLASSES */

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs': return 'text-xs';
    case 'sm': return 'text-sm';
    case 'lg': return 'text-lg';
    case 'xl': return 'text-xl';
    default: return 'text-base';
  }
});
</script>

<template>
	<AppFormContainer
    :color="props.color"
    :error="props.error"
    :success="props.success"
    :label="props.label"
    :required="props.required"
    :message="props.message"
    :disabled="props.disabled"
    :size="props.size"
    :block="props.block"
  >
    <!-- Prepend -->
    <slot name="prepend"></slot>
    <!-- Input -->
    <input
      :value="modelValue"
      @input="updateModelValue"
      :name="props.name"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :autofocus="props.autofocus"
      :readonly="props.readonly"
      :class="[
        sizeClass,
				inputClass,
        {
          'ml-2': slots.prepend,
          'mr-2': slots.append,
          'w-full': block
        },
      ]"
      class="peer flex flex-1 bg-transparent outline-none"
      v-bind="$attrs"
    />
    <!-- Append -->
    <slot name="append"></slot>
  </AppFormContainer>
</template>

<script lang="ts">
// Types
export type HTMLInputType = 'email'|'number'|'password'|'reset'|'search'|'submit'|'tel'|'text'|'url';
export type InputSize = 'xs'|'sm'|'md'|'lg'|'xl';
</script>