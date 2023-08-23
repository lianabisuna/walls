<script setup lang="ts">
import { AvatarSize, HexColor } from './types';

// Props
const props = defineProps({
  src: { type: String as PropType<string>, default: '' },
  hexColor: { type: String as PropType<HexColor>, default: '' },
  size: { type: String as PropType<AvatarSize>, default: '' },
  active: { type: Boolean as PropType<boolean>, default: false },
})


/** CLASSES */

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs': return 'w-6 h-6';
    case 'sm': return 'w-8 h-8';
    case 'lg': return 'w-20 h-20';
    case 'xl': return 'w-32 h-32';
    case 'md': default: return 'w-11 h-11';
  }
})
</script>

<template>
	<component
		:is="props.src ? 'img' : 'div'"
    :src="props.src"
		class="flex items-center justify-center rounded-full border-2 border-neutral-300 h-11 w-11"
		:class="[
      sizeClass,
			{
				'opacity-50': !props.active,
				'object-cover': props.src,
			},
		]"
    v-bind="$attrs"
    :style="{ 'backgroundColor': props.hexColor }"
	>
		<slot></slot>
	</component>
</template>