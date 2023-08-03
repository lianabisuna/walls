<script setup lang="ts">
import { TailwindColor } from 'components/app/types';
import { SuccessResponse, ErrorResponse } from 'services/types';


// Page Meta
definePageMeta({
  middleware: ['authentication'],
  layout: false,
});


// Test Data
// const rooms: RoomData[] = [
//   {
//     id: 0,
//     name: "General",
//     created_at: "2023-07-28 13:06:39",
//     updated_at: "2023-07-28 13:06:39",
//     is_private: 0,
//     members_count: 1,
//   },
//   {
//     id: 1,
//     name: "Announcements",
//     created_at: "2023-07-28 13:06:39",
//     updated_at: "2023-07-28 13:06:39",
//     is_private: 0,
//     members_count: 1,
//   },
//   {
//     id: 2,
//     name: "Marketplace",
//     created_at: "2023-07-28 13:06:39",
//     updated_at: "2023-07-28 13:06:39",
//     is_private: 0,
//     members_count: 1,
//   },
//   {
//     id: 3,
//     name: "Gaming",
//     created_at: "2023-07-28 13:06:39",
//     updated_at: "2023-07-28 13:06:39",
//     is_private: 0,
//     members_count: 1,
//   },
//   {
//     id: 4,
//     name: "Technology",
//     created_at: "2023-07-28 13:06:39",
//     updated_at: "2023-07-28 13:06:39",
//     is_private: 0,
//     members_count: 1,
//   },
// ];

const members: MemberData[] = [
  {
    id: 0,
    chat_room_id: 0,
    user_id: 0,
    is_admin: 0,
    is_active: 1,
    color: "purple-500",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
  },
  {
    id: 0,
    chat_room_id: 0,
    user_id: 0,
    is_admin: 0,
    is_active: 1,
    color: "red-500",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
  },
  {
    id: 0,
    chat_room_id: 0,
    user_id: 0,
    is_admin: 0,
    is_active: 1,
    color: "blue-500",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
  },
  {
    id: 0,
    chat_room_id: 0,
    user_id: 0,
    is_admin: 0,
    is_active: 1,
    color: "green-500",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
  },
  {
    id: 0,
    chat_room_id: 0,
    user_id: 0,
    is_admin: 0,
    is_active: 1,
    color: "yellow-500",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
  },
  {
    id: 0,
    chat_room_id: 0,
    user_id: 0,
    is_admin: 0,
    is_active: 0,
    color: "sky-500",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
  },
  {
    id: 0,
    chat_room_id: 0,
    user_id: 0,
    is_admin: 0,
    is_active: 0,
    color: "green-500",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
  },
]


/** LIST OF ROOMS */

const roomsData = ref([]) as Ref<RoomData[]>;
const roomsLoading = ref(true);

async function fetchRooms() {
  try {
    roomsLoading.value = true;
    
    await useBaseFetch('chat/rooms', {
      method: 'GET',
      onResponse({ response }) {
        const _response = response._data as SuccessResponse<RoomData[]>;
        roomsData.value = _response.success.data;

        // TO DO: Add message as toast
        console.log(_response.success.message);
      },
      onResponseError({ response }) {
        const _response = response._data as ErrorResponse<any, any>;

        // TO DO: Add message as toast
        console.error('error', _response.error.message);
      },
    })

    roomsLoading.value = false;
  } catch(e) {
    console.error(e);
  }
};


/** LIST OF MEMBERS */

const membersData = ref([]) as Ref<MemberData[]>;
const membersLoading = ref(true);

async function fetchMembers() {
  try {
    membersLoading.value = true;
    
    await useBaseFetch('users', {
      method: 'GET',
      onResponse({ response }) {
        const _response = response._data as SuccessResponse<MemberData[]>;
        membersData.value = _response.success.data;

        // TO DO: Add message as toast
        console.log(_response.success.message);
      },
      onResponseError({ response }) {
        const _response = response._data as ErrorResponse<any, any>;

        // TO DO: Add message as toast
        console.error('error', _response.error.message);
      },
    })

    membersLoading.value = false;
  } catch(e) {
    console.error(e);
  }
};

onMounted(async () => {
  await nextTick();
  fetchRooms();
  fetchMembers();
})
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="flex-grow bg-light p-5 md:p-10 grid grid-cols-4 gap-5 md:gap-7">
      <!-- Walls -->
      <div class="col-span-full md:col-span-3 flex flex-col gap-5 md:gap-10">
        <!-- Filters -->
        <div class="flex">
          <AppFormInput
            placeholder="Search"
            block
            border-color="light"
            background-color="neutral-100"
          >
          </AppFormInput>
        </div>

        <!-- List -->
        <div
          v-if="roomsLoading"
          class="opacity-75 animate-pulse"
        >
          We ask for your patience, we are still fetching walls.
        </div>
        <div
          v-else-if="!roomsLoading && !roomsData"
          class="opacity-75 animate-pulse"
        >
          Unfortunately, we couldn't find walls but you can create your own.
        </div>
        <div
          v-else
          class="grid md:grid-cols-3 md: gap-3 md:gap-5"
        >
          <CardRoom
            v-for="room in roomsData"
            :name="room.name"
            :length="room.members_count"
          >
          </CardRoom>
        </div>
      </div>

      <!-- Vandals -->
      <div class="h-fit col-span-full md:col-span-1 bg-neutral-100 rounded-sm p-3 md:p-5">
        <div class="flex flex-wrap gap-1.5">
          <AppTooltip
            v-for="member in membersData"
            :color="member.color ? member.color : 'primary-500'"
          >
            <template #trigger>
              <div
                class="rounded-full border-2 border-neutral-300 h-11 w-11 hover:bg-red-500"
                :class="[
                  member.color ? `bg-${member.color}` : 'bg-primary-500',
                  {
                    'opacity-50': !member.is_active,
                  },
                ]"
              >
              </div>
            </template>
            <template #default>{{ member.created_at }}</template>
          </AppTooltip>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
// Types
interface RoomData {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_private: number;
  members_count: number;
}

interface MemberData {
  id: number;
  chat_room_id: number;
  user_id: number;
  is_admin: number;
  is_active: number;
  color: TailwindColor;
  created_at: string;
  updated_at: string;
}
</script>