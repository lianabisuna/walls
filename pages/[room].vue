<script setup lang="ts">
// Page Meta
definePageMeta({
  middleware: ['authentication'],
  layout: false,
});


/** LIST OF USERS */

// const usersData = ref([]) as Ref<UserData[]>;
// const usersLoading = ref(true);

// async function fetchUsers() {
//   try {
//     usersLoading.value = true;
    
//     await useBaseFetch('users', {
//       method: 'GET',
//       onResponse({ response }) {
//         const _response = response._data as SuccessResponse<UserData[]>;
//         usersData.value = _response.success.data;

//         // TO DO: Add message as toast
//         console.log(_response.success.message);
//       },
//       onResponseError({ response }) {
//         const _response = response._data as ErrorResponse<any, any>;

//         // TO DO: Add message as toast
//         console.error('error', _response.error.message);
//       },
//     })

//     usersLoading.value = false;
//   } catch(e) {
//     console.error(e);
//   }
// };

onMounted(async () => {
  await nextTick();
})
</script>

<template>
  <NuxtLayout name="room">
    <div class="relative flex-grow bg-neutral-50">
      <div class="flex-grow grid sm:grid-cols-2 md:grid-cols-4 gap-3 p-3 md:p-5">
        <div class="grid gap-3">
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="">
          </div>
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="">
          </div>
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="">
          </div>
        </div>
        <div class="grid gap-3">
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="">
          </div>
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="">
          </div>
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="">
          </div>
        </div>
        <div class="grid gap-3">
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="">
          </div>
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="">
          </div>
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="">
          </div>
        </div>
        <div class="grid gap-3">
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt="">
          </div>
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt="">
          </div>
          <div>
            <img class="h-auto max-w-full rounded-sm" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt="">
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