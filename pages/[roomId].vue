<script setup lang="ts">
import { ErrorResponse, SuccessResponse } from 'services/types';
import { RoomData, RoomMessagesData } from 'stores/roomStore';

// Page Meta
definePageMeta({
  middleware: ['authentication'],
  layout: false,
});


// Route
const route = useRoute();


/** ROOM DATA */

const roomStore = useRoomStore();
const { setRoom, setRoomMessages } = roomStore;

const roomLoading = ref(true);

async function fetchRoom() {
  try {
    roomLoading.value = true;
    
    await useBaseFetch(`chat/rooms/${route.params.roomId}`, {
      method: 'GET',
      onResponse({ response }) {
        const _response = response._data as SuccessResponse<RoomData>;
        setRoom(_response.success.data);

        // TO DO: Add message as toast
        console.log(_response.success.message);
      },
      onResponseError({ response }) {
        const _response = response._data as ErrorResponse<any, any>;

        // TO DO: Add message as toast
        console.error('error', _response.error.message);
      },
    })

    roomLoading.value = false;
  } catch(e) {
    console.error(e);
  }
};


/** LIST OF ROOM MESSAGES */

const roomMessagesLoading = ref(true);

async function fetchRoomMessages() {
  try {
    roomMessagesLoading.value = true;
    
    await useBaseFetch(`chat/rooms/${route.params.roomId}/messages`, {
      method: 'GET',
      onResponse({ response }) {
        const _response = response._data as SuccessResponse<RoomMessagesData[]>;
        setRoomMessages(_response.success.data);

        // TO DO: Add message as toast
        console.log(_response.success.message);
      },
      onResponseError({ response }) {
        const _response = response._data as ErrorResponse<any, any>;

        // TO DO: Add message as toast
        console.error('error', _response.error.message);
      },
    })

    roomMessagesLoading.value = false;
  } catch(e) {
    console.error(e);
  }
};

onMounted(async () => {
  await nextTick();
  fetchRoom();
  fetchRoomMessages();
})


/** FORMAT LIST OF MESSAGES */

// const roomMessagesFiltered = computed(() => {
//   let newArr = [];
//   let size = 4;
//   for (let x=0; x<roomStore.roomMessages.length; x+=size) {
//       let slicedArr = roomStore.roomMessages.slice(x, x+size);
//       newArr.push(slicedArr);
//   }
//   console.log(newArr);
//   return newArr;
// })
</script>

<template>
  <NuxtLayout name="room">
    <div class="relative flex-grow bg-neutral-50">
      <div class="flex-grow min-h-[calc(100vh-4rem)]">
        <div
          class="columns-1 md:columns-3 lg:columns-4 p-3 md:p-5"
        >
          <div
            v-for="message in roomStore.roomMessages"
            class="mb-3"
          >
            <div
              class="w-full rounded-sm bg-primary-500 text-white p-3"
            >
              {{ message.message }}
            </div>
          </div>
        </div>
      </div>

      <div class="sticky w-full bottom-0 left-0 bg-light">
        <div class="flex flex-col px-3 pb-3 pt-2 md:px-5 md:pb-5 md:pt-3">
          <!-- Drag -->
          <div class="flex items-center justify-center pb-3 md:pb-5">
            <div class="w-12 bg-neutral-500 rounded-full h-1"></div>
          </div>

          <!-- Input -->
          <div class="flex gap-x-3">
            <AppFormInput
              background-color="neutral-100"
              border-color="light"
              placeholder="Write a message..."
              block
            >
            </AppFormInput>
            <button>
              <Icon
                name="ph:paper-plane-right-fill"
                class="h-7 w-7 text-primary-500"
              >
              </Icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
</script>