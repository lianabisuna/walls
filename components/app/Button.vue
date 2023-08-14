<script setup lang="ts">
// Imports
import type { RouteLocationRaw } from '.nuxt/vue-router';
import type { ColorTone, TailwindColor } from './types';


// Props
const props = defineProps({
  disabled: { type: Boolean, default: false },
  size: { type: String as PropType<ButtonSize>, default: 'sm' },
  to: { type: [String,Object] as PropType<RouteLocationRaw>, default: '' },
  type: { type: String as PropType<ButtonType>, default: 'button' },
  color: { type: String as PropType<TailwindColor>, default: 'primary-500' },
  icon: { type: Boolean as PropType<boolean>, default: false },
  variant: { type: String as PropType<ButtonVariant>, default: 'solid' },
  /**  If background color is in lighter shade, add "light" tone */
  tone: { type: String as PropType<ColorTone>, default: '' },
  loading: { type: Boolean as PropType<boolean>, default: false },
});


/** CLASSES */

/**
 * @return Clases for padding, aspect ratio, and text size based on icon and size prop.
 */
const sizeClass = computed(() => {
  if (!props.icon) {
    switch (props.size) {
      case 'xs': return 'px-3 py-2 text-xs';
      case 'sm': return 'px-3 py-2.5 text-sm';
      case 'lg': return 'px-5 py-3.5 text-lg';
      case 'xl': return 'px-6 py-4 text-xl';
      case 'md': default: return 'px-5 py-3 text-base';
    }
  }
  else {
    switch (props.size) {
      case 'xs': return 'aspect-square p-2';
      case 'sm': return 'aspect-square p-2.5';
      case 'lg': return 'aspect-square p-3.5';
      case 'xl': return 'aspect-square p-4';
      case 'md': default: return 'aspect-square p-3';
    }
  }
});

/**
 * @return Classes for shadow, background color, hover, and active classes based on color and variant prop.
 */
const backgroundClass = computed(() => {
  switch (props.variant) {
    case 'outlined': return `bg-transparent hover:bg-${props.color} active:bg-${props.color}/75`;
    case 'text': return 'bg-transparent';
    case 'solid': default: return `bg-${props.color} hover:bg-${props.color}/90 active:bg-${props.color}/75`;
  }
});

/**
 * @return Classes for text color and hover classes based on color, tone, and variant prop.
 */
const textClass = computed(() => {
  switch (props.variant) {
    case 'outlined':
      switch(props.tone) {
        case 'light': return `text-${props.color} hover:text-dark`;
        case 'dark': default: return `text-${props.color} hover:text-light`;
      }
    case 'text': return `text-${props.color} hover:text-${props.color}/90 active:text-${props.color}/75`;
    case 'solid': default:
      switch (props.tone) {
        case 'light': return 'text-dark';
        case 'dark': default: return 'text-light';
      }
  }
});

/**
 * @return Classes for border, hover, and active classes based on variant and color prop.
 */
const borderClass = computed(() => {
  switch (props.variant) {
    case 'outlined': return `border border-${props.color} hover:border-${props.color}/90 active:border-${props.color}/75`;
    case 'text': return '';
    case 'solid': default: return `border border-${props.color} hover:border-${props.color}/90 active:border-${props.color}/75`;
  }
});
</script>

<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    class="inline-flex items-center justify-center text-center font-semibold rounded-sm outline-none"
    :class="[
      sizeClass,
      backgroundClass,
      textClass,
      borderClass,
      {
        'opacity-50 pointer-events-none': props.disabled || props.loading,
        'cursor-pointer': props.to,
      },
    ]"
    :type="props.type"
    :disabled="props.disabled"
    :to="props.to"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
// Types
export type ButtonSize = 'xs'|'sm'|'md'|'lg'|'xl';
export type ButtonType = 'button'|'submit'|'reset';
export type ButtonVariant = 'solid'|'outlined'|'text';
</script>