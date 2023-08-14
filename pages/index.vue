<script setup lang="ts">
import { SuccessResponse, ErrorResponse } from 'services/types';
import { UserData } from 'stores/authenticationStore';
import { RoomData } from 'stores/roomStore';


// Page Meta
definePageMeta({
  middleware: ['authentication'],
  layout: false,
});


// Test Data
// const roomsData: RoomData[] = [
//   {
//     id: 0,
//     name: "General",
//     created_at: "2023-07-28 13:06:39",
//     updated_at: "2023-07-28 13:06:39",
//     is_private: 0,
//     members:_count: 0,
//   },
//   {
//     id: 1,
//     name: "Announcements",
//     created_at: "2023-07-28 13:06:39",
//     updated_at: "2023-07-28 13:06:39",
//     is_private: 0,
//     members:_count: 0,
//   },
//   {
//     id: 2,
//     name: "Marketplace",
//     created_at: "2023-07-28 13:06:39",
//     updated_at: "2023-07-28 13:06:39",
//     is_private: 0,
//     members:_count: 0,
//   },
//   {
//     id: 3,
//     name: "Gaming",
//     created_at: "2023-07-28 13:06:39",
//     updated_at: "2023-07-28 13:06:39",
//     is_private: 0,
//     members:_count: 0,
//   },
//   {
//     id: 4,
//     name: "Technology",
//     created_at: "2023-07-28 13:06:39",
//     updated_at: "2023-07-28 13:06:39",
//     is_private: 0,
//     members:_count: 0,
//   },
// ];

// const usersData: UserData[] = [
//   {
//     email: "janedoe@gmail.com",
//     email_verified_at: "2023-07-28 13:06:39",
//     first_name: "Jane",
//     id: 0,
//     last_name: "Doe",
//     is_active: 1,
//     is_admin: 0,
//     color: 'blue-500',
//     created_at: "2023-07-28 13:06:39",
//     updated_at: "2023-07-28 13:06:39",
//   },
// ];


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


/** LIST OF USERS */

const usersData = ref([]) as Ref<UserData[]>;
const usersLoading = ref(true);

async function fetchUsers() {
  try {
    usersLoading.value = true;
    
    await useBaseFetch('users', {
      method: 'GET',
      onResponse({ response }) {
        const _response = response._data as SuccessResponse<UserData[]>;
        usersData.value = _response.success.data;

        // TO DO: Add message as toast
        console.log(_response.success.message);
      },
      onResponseError({ response }) {
        const _response = response._data as ErrorResponse<any, any>;

        // TO DO: Add message as toast
        console.error('error', _response.error.message);
      },
    })

    usersLoading.value = false;
  } catch(e) {
    console.error(e);
  }
};

onMounted(async () => {
  await nextTick();
  fetchRooms();
  fetchUsers();
})
</script>

<template>
  <NuxtLayout name="home">
    <div class="flex-grow bg-light p-5 md:p-10 grid grid-cols-4 gap-5 md:gap-7">
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

        <!-- Rooms -->
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
          <NuxtLink
            v-for="room in roomsData"
            :to="{ path: `/${room.id}` }"
          >
            <CardRoom
              :name="room.name"
              :length="room.members_count"
              :private="!!room.is_private"
            >
            </CardRoom>
          </NuxtLink>
        </div>
      </div>
      
      <div class="h-fit col-span-full md:col-span-1 bg-neutral-100 rounded-sm p-3 md:p-5">
        <!-- Members -->
        <div class="flex flex-wrap gap-1.5">
          <AppTooltip
            v-for="user in usersData"
            :color="user.color"
          >
            <template #trigger>
              <AppAvatar
                :color="user.color"
                :active="!!user.is_active"
              >
              </AppAvatar>
            </template>
            <template #default>
              <span>{{ user.username }}</span>
            </template>
          </AppTooltip>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>