<script setup lang="ts">
import { ErrorResponse, SuccessResponse } from 'services/types';
import { RoomData, RoomMessagesData } from 'stores/roomStore';
import * as Yup from 'yup';
import Pusher from 'pusher-js';

// Page Meta
definePageMeta({
  middleware: ['authentication'],
  layout: false,
});


// Route
const route = useRoute();


/** ROOM DATA */

const roomStore = useRoomStore();
const { setRoom, setRoomMessages, addRoomMessage } = roomStore;

const roomLoading = ref(true);

async function fetchRoom() {
  try {
    roomLoading.value = true;
    
    await useBaseFetch(`chat/rooms/${route.params.roomId}`, {
      method: 'GET',
      onResponse({ response }) {
        const _response = response._data as SuccessResponse<RoomData>;
        setRoom(_response.data);

        // TO DO: Add message as toast
        console.log(_response.message);
      },
      onResponseError({ response }) {
        const _response = response._data as ErrorResponse<any, any>;

        // TO DO: Add message as toast
        console.error('error', _response.message);
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
        setRoomMessages(_response.data);

        // TO DO: Add message as toast
        console.log(_response.message);
      },
      onResponseError({ response }) {
        const _response = response._data as ErrorResponse<any, any>;

        // TO DO: Add message as toast
        console.error('error', _response.message);
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





/** FORM VALIDATION */

const schema = Yup.object({
  message: Yup
    .string()
    .required(),
});


const { isSubmitting, handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: message } = useField('message');

const onSubmit = handleSubmit(async (values: Record<any, any>) => {
  try {
    message.value = '';
    
    // Run register API
    const { error, data } = await useBaseFetch(`chat/rooms/${route.params.roomId}/messages`, {
      method: 'POST',
      body: {
        message: values.message,
      },
    });

    
    /** HANDLE API RESPONSE */

    const successResponse = data.value as SuccessResponse;
    const errorResponse = error.value?.data as ErrorResponse<any, CreateMessageForm>;

    // Handle success response
    if (successResponse?.message) {
      // TO DO: Add message as toast
      console.log(successResponse.message);

      // Navigate to login
      // alert('success');
      return;
    }

    // Handle error response
    if (errorResponse?.message) {
      // TO DO: Add message as toast
      console.log(errorResponse.message);
      
      // Get errors
      // const errorFields = errorResponse.error.errors;

      // Set errors
      // setErrors({
      //   username: errorFields?.first_name || errorFields?.last_name,
      //   email: errorFields?.email,
      //   password: errorFields?.password,
      //   password_confirmation: errorFields?.password_confirmation,
      // });

      // alert('failed');
    }
  } catch(e) {
    console.error(e);
  }
});


/** RESIZE MESSAGE PANEL */

const PANEL_BORDER_SIZE = 20;

const panelRef = ref<HTMLElement>();

const panelInitialPosition = ref(0);
const panelInitialHeight = ref(0);

const panelHeight = ref(120);

function resizeMousePanel(e: MouseEvent) {
  const positionY = panelInitialPosition.value - e.y;
  panelHeight.value = panelInitialHeight.value + positionY;
}

function onPanelMousedown(e: MouseEvent) {
  // Check if cursor is less than panel border
  if ( !(e.offsetY < PANEL_BORDER_SIZE) ) return;

  panelInitialPosition.value = e.y;
  panelInitialHeight.value = panelHeight.value;
  useEventListener(document, 'mousemove', resizeMousePanel);
}

onMounted(() => {
  useEventListener(document, 'mouseup', (e) => {
    document.removeEventListener('mousemove', resizeMousePanel, false);
  });
})

function resizeTouchPanel(e: TouchEvent) {
  e.preventDefault();
  e.stopPropagation();

  const target = e.target as HTMLInputElement;
  const rect = target.getBoundingClientRect();
  const y = e.touches[0].clientY - rect.bottom;
  const positionY = panelInitialPosition.value - y;
  panelHeight.value = panelInitialHeight.value + positionY;
}

function onPanelTouchstart(e: TouchEvent) {
  useEventListener(document, 'touchmove', resizeTouchPanel);

  const target = e.target as HTMLInputElement;
  if (!target.value) return;
  const rect = target.getBoundingClientRect();
  const y = e.touches[0].clientY - rect.bottom;
  const offsetY = (e.touches[0].clientY - window.scrollY - rect.bottom);

  // Check if cursor is less than panel border
  if ( !(offsetY < PANEL_BORDER_SIZE) ) return;

  panelInitialPosition.value = y;
  panelInitialHeight.value = panelHeight.value;
  useEventListener(document, 'touchmove', resizeTouchPanel);
}

onMounted(() => {
  useEventListener(document, 'touchend', (e) => {
    document.removeEventListener('touchmove', resizeTouchPanel);
  });
})


/** PUSHER */

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const config = useRuntimeConfig();

const pusher = new Pusher(config.public.pusher.key, {
  cluster: config.public.pusher.cluster,
  authorizer: (channel, options) => ({
      authorize: async (socketId, callback) => {
        await useBaseFetch('broadcasting/auth', {
          method: 'POST',
          body: {
            socket_id: socketId,
            channel_name: channel.name,
          },
          onResponse({ response }) {
            callback(null, response._data);
          },
          onResponseError({ response }) {
            callback(response._data, response._data);
          },
        })
      }
  }),
});

var channel = pusher.subscribe(`presence-room.${route.params.roomId}`);

// channel.bind('pusher:subscription_succeeded', function(data: any) {
//   console.log('pusher:subscription_succeeded', data);
// });


channel.bind('MessageCreated', function(data: MessageCreatedResponse) {
  addRoomMessage(data.message);
});

channel.bind('MemberAdded', function(data: any) {
  console.log('MemberAdded', data);
});

channel.bind('MemberRemoved', function(data: any) {
  console.log('MemberRemoved', data);
});
</script>

<template>
  <NuxtLayout name="room">
    <div class="flex flex-col flex-grow bg-neutral-50 max-h-[calc(100vh-4rem)] overflow-hidden">

      <div class="flex-grow columns-1 md:columns-3 lg:columns-4 p-3 md:p-5 overflow-y-auto">
        <div
          v-for="message in roomStore.roomMessages"
          class="mb-3"
        >
          <CardMessage
            :message="message"
          >
          </CardMessage>
        </div>
      </div>

      <div
        ref="panelRef"
        class="
          relative mt-auto bg-light flex flex-col px-5 pb-0 pt-8 border-t border-neutral-200 pointer-events-none flex-shrink-0
          after:w-full after:h-5 after:absolute after:top-0 after:left-0 after:cursor-n-resize after:pointer-events-auto
          before:w-12 before:h-1 before:absolute before:top-2 before:left-1/2 before:-translate-x-1/2 before:cursor-n-resize before:pointer-events-auto before:z-[1] before:rounded-full before:bg-neutral-500 hover:before:bg-neutral-600
        "
        :style="{ 'height': `${panelHeight}px` }"
        @mousedown="onPanelMousedown"
        @touchstart="onPanelTouchstart"
      >
        <form
          @submit="onSubmit"
          class="flex gap-x-3 pointer-events-auto"
          novalidate
        >
          <!-- Message -->
          <AppFormInput
            name="message"
            background-color="neutral-100"
            border-color="light"
            placeholder="Write a message..."
            input-container-class="group-focus-within:border-transparent"
            :disabled="isSubmitting"
            :loading="isSubmitting"
            hide-details
            block
          >
          </AppFormInput>

          <!-- Send -->
          <button
            type="submit"
            :disabled="isSubmitting || !message"
            :loading="isSubmitting"
          >
            <Icon
              name="fe:paper-plane"
              class="h-7 w-7 text-primary-500"
              :class="[
                { 'opacity-75 pointer-events-none': !message },
              ]"
            >
            </Icon>
          </button>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
// Types
interface CreateMessageForm {
  message: string;
}

interface MessageCreatedResponse {
  message: RoomMessagesData,
  roomId: number;
}
</script>