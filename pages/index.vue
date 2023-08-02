<script setup lang="ts">
import { number } from 'yup';

definePageMeta({
  middleware: ['authentication'],
  layout: false,
});

const rooms: RoomData[] = [
  {
    id: 0,
    name: "General",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
    is_private: 0,
  },
  {
    id: 1,
    name: "Announcements",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
    is_private: 0,
  },
  {
    id: 2,
    name: "Marketplace",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
    is_private: 0,
  },
  {
    id: 3,
    name: "Gaming",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
    is_private: 0,
  },
  {
    id: 4,
    name: "Technology",
    created_at: "2023-07-28 13:06:39",
    updated_at: "2023-07-28 13:06:39",
    is_private: 0,
  },
];

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
        <div class="grid md:grid-cols-3 md: gap-3 md:gap-5">
          <CardRoom
            v-for="room in rooms"
            :name="room.name"
            :length="3"
            :tags="['Education', 'Politics']"
          >
            {{ room }}
          </CardRoom>
        </div>
      </div>

      <!-- Vandals -->
      <div class="h-fit col-span-full md:col-span-1 bg-neutral-100 rounded-sm p-3 md:p-5">
        <div class="flex flex-wrap gap-1.5">
          <div
            v-for="member in members"
            class="rounded-full border-2 border-neutral-300 h-11 w-11 aspect-square"
            :class="[
              `bg-${member.color}`,
              {
                'opacity-50': !member.is_active,
              },
            ]"
          >
          </div>
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
}

interface MemberData {
  id: number;
  chat_room_id: number;
  user_id: number;
  is_admin: number;
  is_active: number;
  color: string;
  created_at: string;
  updated_at: string;
}
</script>