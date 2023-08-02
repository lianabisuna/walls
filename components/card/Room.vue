<script setup lang="ts">
import { RouteLocationRaw } from '.nuxt/vue-router';

// Props
const props = defineProps({
  to: { type: [String,Object] as PropType<RouteLocationRaw>, default: '' },
	name: { type: String as PropType<string>, default: '' },
	length: { type: Number as PropType<number>, default: 0 },
	tags: { type: Array as PropType<string[]>, default: ()=>[] },
});
</script>

<template>
	<div
		class="rounded-sm border border-neutral-300"
	>
		<!-- Header -->
		<div class="bg-light p-3">
			<p class="font-semibold mb-1.5">{{ name }} ({{ length }})</p>
			<div class="flex gap-1.5">
				<span
					v-for="tag in tags"
					class="lowercase text-neutral-500"
				>
					#{{ tag }}
				</span>
			</div>
		</div>

		<!-- Body -->
		<div class="bg-neutral-300 aspect-[4/3]"></div>
	</div>
</template>