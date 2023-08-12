<script setup lang="ts">
import { TailwindColor } from 'components/app/types';
import { RoomMessagesData } from 'stores/roomStore';

// Props
const props = defineProps({
	message: { type: Object as PropType<RoomMessagesData>, default: ()=>({}) },
});


const user = computed(() => props.message.user);
const _message = computed(() => {
	const { user, ...rest } = props.message;
	return rest;
})

const liked = ref(false);
</script>

<template>
	<div
		class="group relative rounded-sm text-white p-3"
		:class="[
			`bg-${user.color}`
		]"
	>
		<div class="break-inside-avoid-column">
			<div class="leading-relaxed">{{ _message.message }}</div>

			<div
				class="flex justify-end gap-x-1.5 mt-3"
			>
				<!-- Like -->
				<button
					class="aspect-square"
					@click="()=>liked=!liked"
				>
					<Icon
						v-if="liked"
						name="ph:heart-fill"
						class="h-5 w-5 font-semibold text-light"
					>
					</Icon>
					<Icon
						v-else
						name="ph:heart"
						class="h-5 w-5 font-semibold text-light"
					>
					</Icon>
				</button>
			</div>
		</div>

		<div
			class="hidden group-hover:flex absolute -top-5 left-2 rounded-sm bg-dark text-white min-h-[1.75rem] px-2.5 text-xs items-center select-none"
		>
			{{ user.username }}
		</div>
	</div>
</template>