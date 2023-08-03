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
    <div class="flex-grow bg-light p-5 md:p-10 grid grid-cols-4 gap-5 md:gap-7">
      Hello
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
</script>